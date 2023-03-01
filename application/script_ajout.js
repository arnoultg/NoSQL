var selecteur = document.getElementById("selecteur");

$(document).ready(() => {
    $('#BtnRetour').click(() => {
        window.location.href = 'Index.html';
    });

    $('#add-users').click(() => {
        let nb = document.getElementById("nb-users").value;
        if (selecteur.value === "Neo4j") {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ajoutNeo4j",
                data: { cypherQuery: `UNWIND range(1, `+ nb +`) AS user_id
                CREATE (:User {user_id: user_id, username: 'User_' + user_id});` },
                success: function(response) {
                    console.log(response)   
                },
                error: function(xhr, status, error) {
                    // Traitez l'erreur ici
                    console.log("erreur ajout Neo4j :", error);
                }
            });
        }else if (selecteur.value === "MariaDB") {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ajoutSQL",
                data: { sql: `INSERT INTO Users (username)
                SELECT CONCAT('User ', n)
                FROM (SELECT ROW_NUMBER() OVER () AS n FROM information_schema.columns) AS nums
                WHERE n <= `+ nb +`;` },
                success: function(response) {
                console.log(response)
                },
                error: function(xhr, status, error) {
                    // Traitez l'erreur ici
                    console.log("erreur ajout SQL :", status,error);
                }
            });
        }
    });

    $('#add-products').click(() => {
        let nb = document.getElementById("nb-products").value;
        if (selecteur.value === "Neo4j") {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ajoutNeo4j",
                data: { cypherQuery: `UNWIND range(1, `+ nb +`) AS product_id
                CREATE (:Product {product_id: product_id, product_name: 'Product_' + product_id });` },
                success: function(response) {
                    console.log(response)   
                },
                error: function(xhr, status, error) {
                    // Traitez l'erreur ici
                    console.log("erreur ajout Neo4j :", error);
                }
            });
        }else if (selecteur.value === "MariaDB") {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ajoutSQL",
                data: { sql: `INSERT INTO Products (product_name)
                SELECT CONCAT('Product', n)
                FROM (SELECT ROW_NUMBER() OVER () AS n FROM information_schema.columns) AS nums
                WHERE n <= `+ nb +`;` },
                success: function(response) {
                console.log(response)
                },
                error: function(xhr, status, error) {
                    // Traitez l'erreur ici
                    console.log("erreur ajout SQL :", status,error);
                }
            });
        }
        
    });


    $('#add-link').click(() => {
        if (selecteur.value === "Neo4j") {

            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ajoutNeo4j",
                data: { cypherQuery: `MATCH (u:User)
                WHERE NOT (u)-[:FOLLOWS]->()
                WITH u, RAND() AS random_number
                ORDER BY random_number
                WITH u, toInteger(RAND() * 20) AS num_followers
                WHERE num_followers > 0
                WITH u, num_followers
                MATCH (other_user:User)
                WHERE other_user <> u
                WITH u, num_followers, collect(other_user) AS other_users
                WITH u, num_followers, other_users[0..num_followers-1] AS selected_users
                UNWIND selected_users AS follower
                CREATE (u)-[:FOLLOWS]->(follower)
                ;` },
                success: function(response) {
                    console.log(response)   
                },
                error: function(xhr, status, error) {
                    // Traitez l'erreur ici
                    console.log("erreur ajout Neo4j :", error);
                }
            });
        }else if (selecteur.value === "MariaDB") {

            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ajoutSQL",
                data: { sql: `CALL add_random_followers_to_user();` },
                success: function(response) {
                console.log(response)
                },
                error: function(xhr, status, error) {
                    // Traitez l'erreur ici
                    console.log("erreur ajout SQL :", status,error);
                }
            });
        }
 
    });

    $('#add-achat').click(() => {
        if (selecteur.value === "Neo4j") {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ajoutNeo4j",
                data: { cypherQuery: `MATCH (u:User)
                WITH u, toInteger(rand()*5)+1 AS purchases
                UNWIND range(1, purchases) AS purchase
                WITH u, purchase
                LIMIT 1000 // Limiter le nombre d'utilisateurs traités pour éviter de surcharger la mémoire
                
                
                MATCH (p:Product)
                WITH u, p, rand() AS r
                WHERE r < 0.1 // Modifier cette valeur pour contrôler la densité des relations
                WITH u, p
                
                
                MATCH (u)
                WITH u, collect(p) AS products
                UNWIND products AS p
                CREATE (u)-[:PURCHASED]->(p);` },
                success: function(response) {
                    console.log(response)   
                },
                error: function(xhr, status, error) {
                    // Traitez l'erreur ici
                    console.log("erreur ajout Neo4j :", error);
                }
            });
        }else if (selecteur.value === "MariaDB") {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ajoutSQL",
                data: { sql: `CALL add_random_product_to_user();`},
                success: function(response) {
                console.log(response)
                },
                error: function(xhr, status, error) {
                    // Traitez l'erreur ici
                    console.log("erreur ajout SQL :", status,error);
                }
            });
        }
   
    });


    
});