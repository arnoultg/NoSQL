var selecteur = document.getElementById("selecteur");

function requete1(id){
    let level = document.getElementById("nb-prof" + id).value;
    console.log(level)
    if (selecteur.value === "MariaDB") {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/requeteSQL",
            data: { sql: `WITH RECURSIVE followers(follower_id, followee_id, level) AS (
                SELECT follower_id, followee_id, 1 FROM Follows WHERE follower_id = ` + id +
                ` UNION
                SELECT f.follower_id, f.followee_id, level + 1
                FROM Follows f
                JOIN followers ON f.follower_id = followers.followee_id
                WHERE level < `+ level +`
                )
                SELECT f.follower_id , p.product_id, p.product_name, COUNT(*) as num_purchases
                FROM followers f 
                JOIN Purchases pur ON f.followee_id = pur.user_id
                JOIN Products p ON pur.product_id = p.product_id
                GROUP BY p.product_id, p.product_name
                ORDER BY num_purchases DESC;` },
            success: function(response) {
                // Traitez la réponse du serveur ici
                var results = JSON.parse(response);
                console.log(results)
                var table_result = "<table id=\"table_result\"><thead><tr><th>Follower ID</th><th>ID</th><th>Produits</th><th>Nombre d'achat</th></tr></thead><tbody>";
                for (var i = 0; i < results.length; i++) {
                    var row = "<tr><td>" + results[i].follower_id + "</td><td>" + results[i].product_id + "</td><td >" + results[i].product_name + "</td><td>" + results[i].num_purchases  + "</td></tr>";
                    table_result += row;
                }

                table_result += "</tbody></table>";
                $('#tableau_result').html(table_result);
            },
            error: function(xhr, status, error) {
                // Traitez l'erreur ici
                console.log("erreur ici :", error);
            }
        });
    }else if (selecteur.value === "Neo4j") {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/requeteSQL",
            data: { sql: `` },
            success: function(response) {
                // Traitez la réponse du serveur ici
                console.log(results)
                var table_result = "<table id=\"table_result\"><thead><tr><th>Follower ID</th><th>ID</th><th>Produits</th><th>Nombre d'achat</th></tr></thead><tbody>";
                for (var i = 0; i < results.length; i++) {
                    var row = "<tr><td>" + results[i].follower_id + "</td><td>" + results[i].product_id + "</td><td >" + results[i].product_name + "</td><td>" + results[i].num_purchases  + "</td></tr>";
                    table_result += row;
                }

                table_result += "</tbody></table>";
                $('#tableau_result').html(table_result);
            },
            error: function(xhr, status, error) {
                // Traitez l'erreur ici
                console.log("erreur ici :", error);
            }
        });

        
    }
}

function requete2(id){
    
    let level = document.getElementById("nb-prof" + id).value;
    let id_product = document.getElementById("nb-product" + id).value;
    

    if (selecteur.value === "MariaDB") {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/requeteSQL",
            data: { sql: `WITH RECURSIVE followers(follower_id, followee_id, level) AS (
                SELECT follower_id, followee_id, 1 FROM Follows WHERE follower_id = ` + id +`
                UNION
                SELECT f.follower_id, f.followee_id, level + 1
                FROM Follows f
                JOIN followers ON f.follower_id = followers.followee_id
                WHERE level < `+ level +`
                )
                SELECT f.follower_id , p.product_id, p.product_name, COUNT(*) as num_purchases
                FROM followers f
                JOIN Purchases pur ON f.followee_id = pur.user_id
                JOIN Products p ON pur.product_id = p.product_id
                WHERE p.product_id= `+ id_product +`
                ORDER BY f.follower_id;` },
            success: function(response) {
                // Traitez la réponse du serveur ici
                var results = JSON.parse(response);
                console.log(results)
                var table_result = "<table id=\"table_result\"><thead><tr><th>Follower ID</th><th>Product ID</th><th>Product name</th><th>Nombre d'achat</th></tr></thead><tbody>";
                for (var i = 0; i < results.length; i++) {
                    var row = "<tr><td>" + results[i].follower_id + "</td><td>" + results[i].product_id + "</td><td >" + results[i].product_name + "</td><td>" + results[i].num_purchases  + "</td></tr>";
                    table_result += row;
                }

                table_result += "</tbody></table>";
                $('#tableau_result').html(table_result);
            },
            error: function(xhr, status, error) {
                // Traitez l'erreur ici
                console.log("erreur ici :", error);
            }
        });
    }else if (selecteur.value === "Neo4J") {

    }
}



$(document).ready(() => {
$('#btnUtilisateurs').click(() => {
    $('#tableau_result').empty();
    $('#tableau_user').empty();
    console.log(selecteur.value)
    if (selecteur.value === "Neo4j") {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/requeteNeo4j",
            data: { cypherQuery: "MATCH (n) RETURN n LIMIT 10" },
            success: function(results) {
                // Traitez la réponse du serveur ici
                console.log(results[1].n);
                // var results = JSON.parse(response);
                var table = "<table id=\"my-table_user\"><thead><tr><th>ID</th><th>Nom</th><th>Profondeur</th><th>Id Produit</th></th><th>Requete</th></tr></thead><tbody>";
                for (var i = 0; i < results.length; i++) {
                    var row = "<tr>"+
                    "<td id="+ results[i].n.properties.user_id.low  +">" + results[i].n.properties.user_id.low + "</td>" +
                    "<td id="+ results[i].n.properties.user_id.low  +">" + results[1].n.properties.username + "</td>"+
                    "<td id="+ results[i].n.properties.user_id.low  +">" + "<input type=\"number\" id=\"nb-prof"+ results[i].n.properties.user_id.low  + "\" name=\"nb-prof\" min=\"1\" max=\"5\" value=\"1\"></td>"+
                    "<td id="+ results[i].n.properties.user_id.low  +">" + "<input type=\"number\" id=\"nb-product"+ results[i].n.properties.user_id.low  + "\" name=\"nb-product\" value=\"1\"></td>"+
                    "<td><button id="+results[i].n.properties.user_id.low +" onclick=\"requete1("+ results[i].n.properties.user_id.low +")\">Requête 1</button><button id="+results[i].n.properties.user_id.low +" onclick=\"requete2("+ results[i].n.properties.user_id.low +")\">Requête 2</button>" + "</td></tr>";
                    table += row;
                }

                table += "</tbody></table>";
                $('#tableau_user').html(table);
            },
            error: function(xhr, status, error) {
                // Traitez l'erreur ici
                console.log("erreur ici :", error);
            }
        });
        

    } else if (selecteur.value === "MariaDB") {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/requeteSQL",
            data: { sql: "SELECT * FROM Users ORDER BY RAND()" },
            success: function(response) {
                // Traitez la réponse du serveur ici
                var results = JSON.parse(response);
                var table = "<table id=\"my-table_user\"><thead><tr><th>ID</th><th>Nom</th><th>Profondeur</th><th>Id Produit</th></th><th>Requete</th></tr></thead><tbody>";
                for (var i = 0; i < results.length; i++) {
                    var row = "<tr>"+
                    "<td id="+ results[i].user_id  +">" + results[i].user_id + "</td>" +
                    "<td id="+ results[i].user_id  +">" + results[i].username + "</td>"+
                    "<td id="+ results[i].user_id  +">" + "<input type=\"number\" id=\"nb-prof"+ results[i].user_id  + "\" name=\"nb-prof\" min=\"1\" max=\"5\" value=\"1\"></td>"+
                    "<td id="+ results[i].user_id  +">" + "<input type=\"number\" id=\"nb-product"+ results[i].user_id  + "\" name=\"nb-product\" value=\"1\"></td>"+
                    "<td><button id="+results[i].user_id +" onclick=\"requete1("+ results[i].user_id +")\">Requête 1</button><button id="+results[i].user_id +" onclick=\"requete2("+ results[i].user_id +")\">Requête 2</button>" + "</td></tr>";
                    table += row;
                }

                table += "</tbody></table>";
                $('#tableau_user').html(table);
            },
            error: function(xhr, status, error) {
                // Traitez l'erreur ici
                console.log("erreur ici :", error);
            }
        });
    }

});

$('#btnProduits').click(() => {
    $('#tableau_result').empty();
    $('#tableau_user').empty();
    console.log(selecteur.value)
    if (selecteur.value === "Neo4j") {
        console.log("titi")
        // query_user = "MATCH (u:Utilisateur) RETURN u.user_id, u.username";
        // session = driver_neo4j.session();
        // const params = {};

        // session.run(query_user, params)
        // .then(result => {
        //         let records = result.records;
        //         let table = $('<table>').addClass('tableau');
        //         let tr = $('<tr>');
        //         tr.append($('<th>').text('Id'));
        //         tr.append($('<th>').text('Username'));
        //         table.append(tr);

        //         records.forEach(record => {
        //             let tr = $('<tr>');
        //             tr.append($('<td>').text(record.get('u.user_id')));
        //             tr.append($('<td>').text(record.get('u.username')));
        //             table.append(tr);
        //     });

        //     $('#tableau').html(table);
        // })
        // .catch(error => {
        //     console.error(error);
        // })
        // .finally(() => {
        //     session.close();
        // });

    } else if (selecteur.value === "MariaDB") {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/requeteSQL",
            data: { sql: "SELECT * FROM Products ORDER BY RAND()" },
            success: function(response) {
                // Traitez la réponse du serveur ici
                var results = JSON.parse(response);
                var table = "<table id=\"my-table_products\"><thead><tr><th>ID</th><th>Produits</th><th>Profondeur</th><th>Requete</th></tr></thead><tbody>";
                for (var i = 0; i < results.length; i++) {
                    var row = "<tr>"+
                    "<td id="+ results[i].product_id  +">" + results[i].product_id + "</td>"+
                    "<td id="+ results[i].product_id  +">" + results[i].product_name + "</td>"+
                    "<td id="+ results[i].product_id  +">" +  "<input type=\"number\" id=\"nb-prof" + results[i].product_id  + "\" name=\"nb-prof\" min=\"1\" max=\"5\"  value=\"1\"></td>"+
                    "<td id="+ results[i].product_id  +"><button id="+ results[i].product_id + ">Requête 3</button></td></tr>";
                    table += row;
                }

                table += "</tbody></table>";
                $('#tableau_user').html(table);
            },
            error: function(xhr, status, error) {
                // Traitez l'erreur ici
                console.log("erreur ici :", error);
            }
        });

        
    }
});

document.addEventListener('click', function(event) {
    if (event.target.matches('#my-table_products td') || event.target.matches('#my-table_products button')) {

        let id = event.target.getAttribute("id");
        let level = document.getElementById("nb-prof" + id).value;
        console.log(id)
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/requeteSQL",
            data: { sql: `WITH RECURSIVE followers(follower_id, followee_id, level) AS (
                SELECT follower_id, followee_id, 1 FROM Follows WHERE followee_id IN (
                  SELECT user_id FROM Purchases WHERE product_id = `+ id +`
                )
                UNION
                SELECT f.follower_id, f.followee_id, level + 1
                FROM Follows f
                JOIN followers ON f.follower_id = followers.followee_id
                WHERE level < `+ level +`
              )
              SELECT pur.product_id, COUNT(DISTINCT f.followee_id) as num_followees
              FROM followers f
              JOIN Purchases pur ON f.followee_id = pur.user_id
              WHERE pur.product_id = `+ id`;
              ` },
            success: function(response) {
                // Traitez la réponse du serveur ici
                var results = JSON.parse(response);
                console.log(results)
                var table_result = "<table id=\"table_result\"><thead><tr><th>Product ID</th><th>Nombre de folower ayant acheté</th></tr></thead><tbody>";
                for (var i = 0; i < results.length; i++) {
                    var row = "<tr><td>" + results[i].product_id + "</td>"+
                    "<td>" + results[i].num_followees + "</td>";
                    table_result += row;
                }

                table_result += "</tbody></table>";
                $('#tableau_result').html(table_result);
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