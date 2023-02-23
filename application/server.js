const express = require('express')
const db = require('./db')
const app = express()
const port = 8080
const cors = require('cors');
const bodyParser = require("body-parser");
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

function toJson(data) {
    if (data !== undefined) {
        let intCount = 0, repCount = 0;
        const json = JSON.stringify(data, (_, v) => {
            if (typeof v === 'bigint') {
                intCount++;
                return `${v}#bigint`;
            }
            return v;
        });
        const res = json.replace(/"(-?\d+)#bigint"/g, (_, a) => {
            repCount++;
            return a;
        });
        if (repCount > intCount) {
            // You have a string somewhere that looks like "123#bigint";
            throw new Error(`BigInt serialization conflict with a string value.`);
        }
        return res;
    }
}

app.post('/requeteSQL', function(req, res) {
    var sql = req.body.sql;
    db.pool.getConnection()
      .then(conn => {
        conn.query(sql)
          .then(rows => {
            conn.release();
            rows = toJson(rows)
            res.send(rows);
          })
          .catch(err => {
            conn.release();
            console.log(err);
            res.status(500).send('Erreur lors de l\'exécution de la requête SQL');
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Erreur lors de la connexion à la base de données');
      });
  });

  app.post('/ajoutSQL', function(req, res) {
    var sql = req.body.sql;
    db.pool.getConnection()
      .then(conn => {
        conn.query(sql)
          .then(() => {
            conn.release();
            res.send('Données ajoutées avec succès SQL');
          })
          .catch(err => {
            conn.release();
            console.log(err);
            res.status(500).send('Erreur lors de l\'ajout des données');
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Erreur lors de la connexion à la base de données');
      });
});



app.post('/requeteNeo4j', function(req, res) {
    var cypherQuery = req.body.cypherQuery;
    const session = db.driver.session();
    session.run(cypherQuery)
      .then(result => {
        session.close();
        const records = result.records.map(record => record.toObject());
        res.send(records);
      })
      .catch(error => {
        session.close();
        console.log(error);
        res.status(500).send('Erreur lors de l\'exécution de la requête Cypher');
      });
  });

app.post('/ajoutNeo4j', function(req, res) {
    var cypherQuery = req.body.cypherQuery;
    const session = db.driver.session();
  
    session.run(cypherQuery)
      .then(() => {
        session.close();
        res.send('Données ajoutées avec succès Neo4j');
      })
      .catch(err => {
        session.close();
        console.log(err);
        res.status(500).send('Erreur lors de l\'ajout des données');
      });
  })

app.use("/", express.static(".")); 
app.use("/", express.static("views"));
 
app.listen(port, () => console.log(`Listening on port ${port}`));