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
        let nb = document.getElementById("nb-link").value;
        if (selecteur.value === "Neo4j") {

            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ajoutNeo4j",
                data: { cypherQuery: `MATCH (u1:User), (u2:User)
                    WHERE u1 <> u2 AND rand() < `+ nb +`
                    CREATE (u1)-[:FOLLOWS]->(u2);` },
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
                data: { sql: `INSERT INTO Follows (follower_id, followee_id, follow_date)
                SELECT u1.user_id AS follower_id,
                       u2.user_id AS followee_id,
                       DATE_ADD('2000-01-01', INTERVAL FLOOR(RAND() * 7305) DAY) AS follow_date
                FROM Users u1, Users u2
                WHERE u1.user_id <> u2.user_id AND RAND() < `+ nb +`;` },
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
        let nb = document.getElementById("nb-achat").value;
        if (selecteur.value === "Neo4j") {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ajoutNeo4j",
                data: { cypherQuery: `MATCH (u:User), (p:Product)
                WHERE rand() < `+ nb +`
                CREATE (u)-[:PURCHASED]->(p)
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
                data: { sql: `INSERT INTO Purchases (user_id, product_id, purchase_date)
                SELECT u.user_id, p.product_id, DATE_ADD(CURDATE(), INTERVAL -FLOOR(RAND() * 3650) DAY)
                FROM Users u, Products p
                WHERE RAND() < `+ nb +`;
                ` },
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