// Créer 1 million d'utilisateurs
UNWIND range(1, 10) AS user_id
CREATE (:User {user_id: user_id});

// Créer 10 000 produits
UNWIND range(1, 10) AS product_id
CREATE (:Product {product_id: product_id});



//Ajouter des liens 
MATCH (u:User)
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


//Ajouter des achats
MATCH (u:User)
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
CREATE (u)-[:PURCHASED]->(p);

//Requêtes dans la base :

//----------------REQUETE 1 -----------------

//Obtenir la liste et le nombre des produits commandés par les cercles de followers d'un individu (niveau 1, …, niveau n)

//$USER : user id d'un individue
//$LEVEL : profondeur souhaité

MATCH (u:User {user_id:1})-[:FOLLOWS*0..1]->(f:User)-[:PURCHASED]->(p:Product)
RETURN p.product_name, COUNT(DISTINCT f) AS nombre_de_followers, COUNT(*) AS nombre_de_commandes
ORDER BY nombre_de_followers DESC

//----------------REQUETE 2 -----------------

//Même requête mais avec spécification d'un produit particulier

//$USER : user id d'un individue
//$LEVEL : profondeur souhaité
//$PRODUCT : produit ciblé

MATCH (u:User {user_id:$USER})-[:FOLLOWS*0..$LEVEL]->(f:User)-[:PURCHASED]->(p:Product {product_id: $PRODUCT})
RETURN COUNT(DISTINCT f) AS nombre_de_followers, COUNT(*) AS nombre_de_commandes


//----------------REQUETE 3 -----------------
//Pour une référence de produit donné, obtenir le nombre de personnes l'ayant commandé dans un cercle de followers "orienté" de niveau n (à effectuer sur plusieurs niveaux : 0, 1, 2 …)

//$PRODUCT : produit ciblé
//$LEVEL : profondeur souhaité

// Récupérer les utilisateurs qui ont acheté le produit donné
MATCH (p:Product {product_id: $PRODUCT})<-[:PURCHASED]-(u:User)

// Pour chaque niveau de 0 à n, récupérer les followers de chaque utilisateur
MATCH (u)-[:FOLLOWS*$LEVEL]->(f:User)

// Récupérer les achats des followers de chaque utilisateur
MATCH (f)-[:PURCHASED]->(p)

// Retourner le niveau, le nombre de followers et le nombre de commandes pour le produit donné
RETURN  COUNT(DISTINCT f) AS nombre_de_followers, COUNT(*) AS nombre_de_commandes


