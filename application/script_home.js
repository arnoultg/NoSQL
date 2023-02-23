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
            url: "http://localhost:8080/requeteNeo4j",
            data: { cypherQuery: `
                MATCH (u:User {user_id:`+ id +`})-[:FOLLOWS*0..`+ level +`]->(f:User)-[:PURCHASED]->(p:Product)
                RETURN p.product_id AS product_id ,p.product_name AS product_name, COUNT(DISTINCT f) AS nombre_de_followers, COUNT(*) AS nombre_de_commandes
                ORDER BY nombre_de_commandes DESC
            ` },
            success: function(results) {
                // Traitez la réponse du serveur ici
                console.log(results[1])
                var table_result = "<table id=\"table_result\"><thead><tr><th>Follower ID</th><th>ID</th><th>Produits</th><th>Nombre d'achat</th></tr></thead><tbody>";
                for (var i = 0; i < results.length; i++) {
                    var row = "<tr><td>" + id + "</td><td>" + results[i].product_id.low + "</td><td >" + results[i].product_name + "</td><td>" + results[i].nombre_de_commandes.low  + "</td></tr>";
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
                    var row = "<tr><td>" + id + "</td><td>" + results[i].product_id + "</td><td >" + results[i].product_name + "</td><td>" + results[i].num_purchases  + "</td></tr>";
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
            url: "http://localhost:8080/requeteNeo4j",
            data: { cypherQuery: `MATCH (u:User {user_id:`+ id +`})-[:FOLLOWS*0..`+ level +`]->(f:User)-[:PURCHASED]->(p:Product {product_id: `+id_product +`})
            RETURN p.product_name AS product_name, COUNT(DISTINCT f) AS nombre_de_followers, COUNT(*) AS nombre_de_commandes` },
            success: function(results) {
                // Traitez la réponse du serveur ici
                console.log(results)
                var table_result = "<table id=\"table_result\"><thead><tr><th>Follower ID</th><th>Product ID</th><th>Product name</th><th>Nombre d'achat</th></tr></thead><tbody>";
                for (var i = 0; i < results.length; i++) {
                    var row = "<tr><td>" + id + "</td><td>" + id_product + "</td><td >" + results[i].product_name + "</td><td>" + results[i].nombre_de_commandes.low  + "</td></tr>";
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



$(document).ready(() => {
$('#btnUtilisateurs').click(() => {
    $('#tableau_result').empty();
    $('#tableau_user').empty();
    console.log(selecteur.value)
    if (selecteur.value === "Neo4j") {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/requeteNeo4j",
            data: { cypherQuery: "MATCH (u:User) RETURN u LIMIT 10" },
            success: function(results) {
                // Traitez la réponse du serveur ici
                console.log(results);
                // var results = JSON.parse(response);
                var table = "<table id=\"my-table_user\"><thead><tr><th>ID</th><th>Nom</th><th>Profondeur</th><th>Id Produit</th></th><th>Requete</th></tr></thead><tbody>";
                for (var i = 0; i < results.length; i++) {
                    var row = "<tr>"+
                    "<td id="+ results[i].u.properties.user_id.low  +">" + results[i].u.properties.user_id.low + "</td>" +
                    "<td id="+ results[i].u.properties.user_id.low  +">" + results[1].u.properties.username + "</td>"+
                    "<td id="+ results[i].u.properties.user_id.low  +">" + "<input type=\"number\" id=\"nb-prof"+ results[i].u.properties.user_id.low  + "\" name=\"nb-prof\" min=\"1\" max=\"5\" value=\"1\"></td>"+
                    "<td id="+ results[i].u.properties.user_id.low  +">" + "<input type=\"number\" id=\"nb-product"+ results[i].u.properties.user_id.low  + "\" name=\"nb-product\" value=\"1\"></td>"+
                    "<td><button id="+results[i].u.properties.user_id.low +" onclick=\"requete1("+ results[i].u.properties.user_id.low +")\">Requête 1</button><button id="+results[i].u.properties.user_id.low +" onclick=\"requete2("+ results[i].u.properties.user_id.low +")\">Requête 2</button>" + "</td></tr>";
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
            data: { sql: "SELECT * FROM Users ORDER BY RAND() LIMIT 10" },
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
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/requeteNeo4j",
            data: { cypherQuery: "MATCH (p:Product) RETURN p LIMIT 10" },
            success: function(results) {
                // Traitez la réponse du serveur ici
                // var results = JSON.parse(response);
                console.log(results)
                var table = "<table id=\"my-table_products\"><thead><tr><th>ID</th><th>Nom</th><th>Profondeur</th><th>Id Produit</th></th><th>Requete</th></tr></thead><tbody>";
                for (var i = 0; i < results.length; i++) {
                    var row = "<tr>"+
                    "<td id="+ results[i].p.properties.product_id.low  +">" + results[i].p.properties.product_id.low + "</td>" +
                    "<td id="+ results[i].p.properties.product_id.low  +">" + results[1].p.properties.product_name + "</td>"+
                    "<td id="+ results[i].p.properties.product_id.low  +">" + "<input type=\"number\" id=\"nb-prof"+ results[i].p.properties.product_id.low  + "\" name=\"nb-prof\" min=\"1\" max=\"5\" value=\"1\"></td>"+
                    "<td id="+ results[i].p.properties.product_id.low  +">" + "<input type=\"number\" id=\"nb-product"+ results[i].p.properties.product_id.low  + "\" name=\"nb-product\" value=\"1\"></td>"+
                    "<td id="+ results[i].p.properties.product_id.low  +"><button id="+ results[i].p.properties.product_id.low + ">Requête 3</button></td></tr>";
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
            data: { sql: "SELECT * FROM Products ORDER BY RAND() LIMIT 10" },
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

        if (selecteur.value === "Neo4j") {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/requeteNeo4j",
                data: { cypherQuery: `MATCH (p:Product {product_id: `+ id +`})<-[:PURCHASED]-(u:User)
                MATCH (u)-[:FOLLOWS*`+ level +`]->(f:User)
                MATCH (f)-[:PURCHASED]->(p)
                RETURN  COUNT(DISTINCT f) AS nombre_de_followers, COUNT(*) AS nombre_de_commandes
                `
                },
                success: function(results) {
                    // Traitez la réponse du serveur ici
                    console.log(results)
                    var table_result = "<table id=\"table_result\"><thead><tr><th>Product ID</th><th>Nombre de folower ayant acheté</th></tr></thead><tbody>";
                    for (var i = 0; i < results.length; i++) {
                        var row = "<tr><td>" + id + "</td>"+
                        "<td>" + results[i].nombre_de_followers.low + "</td>";
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
        } else if (selecteur.value === "MariaDB") {

            $.ajax({
                type: "POST",
                url: "http://localhost:8080/requeteSQL",
                data: { sql: `SELECT COUNT(DISTINCT f.followee_id) AS num_followees
                FROM Users u
                INNER JOIN (
                    WITH RECURSIVE followers(follower_id, followee_id, level) AS (
                        SELECT follower_id, followee_id, 1 FROM Follows WHERE followee_id IN (
                            SELECT user_id FROM Purchases WHERE product_id = ` + id + `
                        )
                        UNION
                        SELECT f.follower_id, f.followee_id, level + 1
                        FROM Follows f
                        JOIN followers ON f.follower_id = followers.followee_id
                        WHERE level < `+ level +`
                    )
                    SELECT followee_id FROM followers
                ) AS f ON u.user_id = f.followee_id;`
                },
                success: function(response) {
                    // Traitez la réponse du serveur ici
                    var results = JSON.parse(response);
                    console.log(results)
                    var table_result = "<table id=\"table_result\"><thead><tr><th>Product ID</th><th>Nombre de folower ayant acheté</th></tr></thead><tbody>";
                    for (var i = 0; i < results.length; i++) {
                        var row = "<tr><td>" + id + "</td>"+
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

    }
  });




$('#btnAjouter').click(() => {
        window.location.href = 'Ajout.html';
    });

});