// Créer les noeuds User
UNWIND range(1, 1000000) AS i
CREATE (:User { user_id: i, username: "User " + i });

// Créer les noeuds Product
UNWIND range(1, 10000) AS i
CREATE (:Product { product_id: i, product_name: "Product " + i });

// Créer les relations Follows
MATCH (u1:User), (u2:User)
WHERE u1 <> u2 AND rand() < 0.02
WITH u1, u2 LIMIT 10000
MERGE (u1)-[:FOLLOWS { follow_date: date() - duration({days: rand() * 7305}) }]->(u2);

// Créer les relations Purchases
MATCH (u:User), (p:Product)
WHERE rand() < 0.2
WITH u, p LIMIT 10000
MERGE (u)-[:PURCHASED { purchase_date: date() - duration({days: rand() * 3650}) }]->(p);
