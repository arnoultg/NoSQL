// Créer 1 million d'utilisateurs
UNWIND range(1, 10000000) AS user_id
CREATE (:User {user_id: user_id});

// Créer 100 000 produits
UNWIND range(1, 100000) AS product_id
CREATE (:Product {product_id: product_id});

// Ajouter des relations "suit" aléatoires
MATCH (u1:User), (u2:User)
WHERE u1 <> u2 AND rand() < 0.02
CREATE (u1)-[:FOLLOWS]->(u2)

//Créer des produits avec des relations d'achat aléatoires :

// Ajouter des relations d'achat aléatoires
MATCH (u:User), (p:Product)
WHERE rand() < 0.02
CREATE (u)-[:PURCHASED]->(p)

//Requêtes dans la base :

//----------------REQUETE 1 -----------------

//Obtenir la liste et le nombre des produits commandés par les cercles de followers d'un individu (niveau 1, …, niveau n)

//$USER : user id d'un individue
//$LEVEL : profondeur souhaité

MATCH (u:User {user_id:$USER_ID})-[:FOLLOWS*0..$LEVEL]->(f:User)-[:PURCHASED]->(p:Product)
RETURN p.product_name, COUNT(DISTINCT f) AS nombre_de_followers, COUNT(*) AS nombre_de_commandes
ORDER BY nombre_de_followers DESC

//----------------REQUETE 2 -----------------

//Même requête mais avec spécification d'un produit particulier

//$USER : user id d'un individue
//$LEVEL : profondeur souhaité
//$PRODUCT : produit ciblé

MATCH (u:User {user_id:$USER})-[:FOLLOWS*0..$LEVEL]->(f:User)-[:PURCHASED]->(p:Product {product_id: $PRODUCT})
RETURN COUNT(DISTINCT f) AS nombre_de_followers, COUNT() AS nombre_de_commandes


//----------------REQUETE 3 -----------------
//Pour une référence de produit donné, obtenir le nombre de personnes l'ayant commandé dans un cercle de followers "orienté" de niveau n (à effectuer sur plusieurs niveaux : 0, 1, 2 …)

//$PRODUCT : produit ciblé
//$LEVEL : profondeur souhaité

MATCH (p:Product {product_name:$PRODUCT})<-[:PURCHASED]-(u:User)-[:FOLLOWS*0..$LEVEL]->(f:User)
RETURN COUNT(DISTINCT u) AS nombre_de_personnes, COUNT(DISTINCT f) AS nombre_de_followers, $LEVEL AS niveau


