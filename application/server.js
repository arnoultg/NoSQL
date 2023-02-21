const express = require('express')
const db = require('./db')
const app = express()
const port = 8080
const cors = require('cors');
const bodyParser = require("body-parser");
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/requete', function(req, res) {
    var sql = req.body.sql;
    db.pool.getConnection()
      .then(conn => {
        conn.query(sql)
          .then(rows => {
            conn.release();
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

app.use("/", express.static(".")); 
app.use("/", express.static("views"));
 
app.listen(port, () => console.log(`Listening on port ${port}`));