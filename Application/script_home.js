var bdd;
var selecteur = document.getElementById("selecteur");

// selecteur.addEventListener("change", function() {
//   if (selecteur.value === "Neo4j") {
//     bdd = new neo4j("monURLNeo4j");
//   } else if (selecteur.value === "MariaDB") {
//     bdd = new mariadb("monURLMariaDB");
//   }
// });

const driver = neo4j.driver(
    'bolt://localhost:7474',
    neo4j.auth.basic('neo4j', 'MBM9teUnFS')
    );

$(document).ready(() => {
$('#btnUtilisateurs').click(() => {

    if (selecteur.value === "Neo4j") {
        query_user = "MATCH (u:Utilisateur) RETURN u.nom, u.prenom, u.age";
      } else if (selecteur.value === "MariaDB") {
        query_user = "SELECT nom, prenom, age FROM Utilisateur";
      }

    const session = driver.session();
    const params = {};

    session.run(query_user, params)
    .then(result => {
        let records = result.records;
        let table = $('<table>').addClass('tableau');
        let tr = $('<tr>');
        tr.append($('<th>').text('Nom'));
        tr.append($('<th>').text('Prénom'));
        tr.append($('<th>').text('Âge'));
        table.append(tr);

        records.forEach(record => {
        let tr = $('<tr>');
        tr.append($('<td>').text(record.get('u.nom')));
        tr.append($('<td>').text(record.get('u.prenom')));
        tr.append($('<td>').text(record.get('u.age')));
        table.append(tr);
        });

        $('#tableau').html(table);
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        session.close();
    });
});

$('#btnProduits').click(() => {
    if (selecteur.value === "Neo4j") {
        query_match = 'MATCH (p:Produit) RETURN p.nom, p.prix, p.stock';

      } else if (selecteur.value === "MariaDB") {

        query_match = '';
      }

    const session = driver.session();
    const params = {};

    session.run(query_match, params)
    .then(result => {
        let records = result.records;
        let table = $('<table>').addClass('tableau');
        let tr = $('<tr>');
        tr.append($('<th>').text('Nom'));
        tr.append($('<th>').text('Prix'));
        tr.append($('<th>').text('Stock'));
        table.append(tr);

        records.forEach(record => {
        let tr = $('<tr>');
        tr.append($('<td>').text(record.get('p.nom')));
        tr.append($('<td>').text(record.get('p.prix')));
        tr.append($('<td>').text(record.get('p.stock')));
        table.append(tr);
        });

        $('#tableau').html(table);
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        session.close();
    });
});

$('#btnAjouter').click(() => {
        window.location.href = 'Ajout.html';
    });

});