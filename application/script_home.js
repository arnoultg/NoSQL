var selecteur = document.getElementById("selecteur");
const driver_neo4j = neo4j.driver(
    'bolt://localhost:7474',
    neo4j.auth.basic('neo4j', 'neo4j')
    );

function envoyerRequeteSQL() {
    
    }


$(document).ready(() => {
$('#btnUtilisateurs').click(() => {
    console.log(selecteur.value)
    if (selecteur.value === "Neo4j") {
        console.log("titi")
        query_user = "MATCH (u:Utilisateur) RETURN u.user_id, u.username";
        session = driver_neo4j.session();
        const params = {};

        session.run(query_user, params)
        .then(result => {
                let records = result.records;
                let table = $('<table>').addClass('tableau');
                let tr = $('<tr>');
                tr.append($('<th>').text('Id'));
                tr.append($('<th>').text('Username'));
                table.append(tr);

                records.forEach(record => {
                    let tr = $('<tr>');
                    tr.append($('<td>').text(record.get('u.user_id')));
                    tr.append($('<td>').text(record.get('u.username')));
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

    } else if (selecteur.value === "MariaDB") {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/requete",
            data: { sql: "SELECT * FROM Users ORDER BY RAND() LIMIT 10" },
            success: function(results) {
                // Traitez la réponse du serveur ici
                console.log(results)
                var table = "<table><thead><tr><th>ID</th><th>Nom</th><th>Email</th></tr></thead><tbody>";
                for (var i = 0; i < results.length; i++) {
                    var row = "<tr><td>" + results[i].user_id + "</td><td>" + results[i].username + "</td><td>" + results[i].email + "</td></tr>";
                    table += row;
                }

                table += "</tbody></table>";
                $('#tableau').html(table);
            },
            error: function(xhr, status, error) {
                // Traitez l'erreur ici
                console.log("erreur ici :", error);
            }
        });
    }
});

$('#btnProduits').click(() => {
    console.log(selecteur.value)
    if (selecteur.value === "Neo4j") {
        console.log("titi")
        query_user = "MATCH (u:Utilisateur) RETURN u.user_id, u.username";
        session = driver_neo4j.session();
        const params = {};

        session.run(query_user, params)
        .then(result => {
                let records = result.records;
                let table = $('<table>').addClass('tableau');
                let tr = $('<tr>');
                tr.append($('<th>').text('Id'));
                tr.append($('<th>').text('Username'));
                table.append(tr);

                records.forEach(record => {
                    let tr = $('<tr>');
                    tr.append($('<td>').text(record.get('u.user_id')));
                    tr.append($('<td>').text(record.get('u.username')));
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

    } else if (selecteur.value === "MariaDB") {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/requete",
            data: { sql: "SELECT * FROM Products ORDER BY RAND() LIMIT 10" },
            success: function(results) {
                // Traitez la réponse du serveur ici
                console.log(results)
                var table = "<table><thead><tr><th>ID</th><th>Produits</th><th>Email</th></tr></thead><tbody>";
                for (var i = 0; i < results.length; i++) {
                    var row = "<tr><td>" + results[i].product_id + "</td><td>" + results[i].product_name + "</td><td>" + results[i].email + "</td></tr>";
                    table += row;
                }

                table += "</tbody></table>";
                $('#tableau').html(table);
            },
            error: function(xhr, status, error) {
                // Traitez l'erreur ici
                console.log("erreur ici :", error);
            }
        });
    }
});

$('#btnAjouter').click(() => {
        window.location.href = 'Ajout.html';
    });

});