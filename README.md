# NoSQL


Le projet vise à simuler une application de réseau social permettant aux utilisateurs de suivre d'autres utilisateurs et d'acheter des produits en ligne. La base de données est conçue pour gérer un million d'utilisateurs, 10 000 références de produits et les relations entre eux. Le projet utilise deux technologies dans un but de comparaison de base de données différentes: une base de données NoSQL (Neo4J) et une base de données relationnelle (MariaDB). 

Les utilisateurs peuvent suivre d'autres utilisateurs de manière orientée, et chaque utilisateur peut avoir jusqu'à 20 followers. Les achats des utilisateurs sont enregistrés dans la base de données, avec chaque utilisateur pouvant acheter jusqu'à 5 produits parmi les 10 000 références de produits disponibles. Des requêtes sont fournies pour obtenir des informations sur les commandes et les followers, permettant de découvrir les produits les plus populaires dans les cercles de followers d'un utilisateur donné.

Tous ces test ont pour but de savoir quel est le modèle de base de données le plus efficace et dans quelle disposition ?

### WEB

Cette web application permet de tester des requêtes sur différentes bases de données à travers une interface utilisateur simple et intuitive, elle donne le temps d'exécution de chaque requête. Elle est codée en HTML, CSS et JavaScript, ce qui la rend facilement accessible et modifiable. L'application est conçue pour fournir des résultats précis et clairs pour chaque requête exécutée, en offrant également une option pour remplir facilement les bases avec une interface intuitive. Grâce à cette application, les utilisateurs peuvent tester rapidement et efficacement leurs requêtes sur différentes bases de données, ce qui permet de faire un comparatif rapide entre les 2 technologies de bases de données.



### Configuration de la base

Modifier le fichier mycnf.conf
'innodb_buffer_pool_size = 1G'

Cela permet d'augmenter la charge maximale et permettra d'injecter plus de données sans être limité par les tampons de sécurité de MariaDB

### Schéma de la base

![image](https://user-images.githubusercontent.com/63504817/221928222-cb8c9d3e-01ec-4441-97ce-41128769e809.png)

### Résultats des tests

Ces petits tableaux résument le temps d'éxecution de chacune des requêtes pour chacune des technologies mises sous haute volumétrie.

### Création des bases :
| Base de données | Users | Products | Purchases  | Follows 
|----------------|-----------|-----------|-----------|-----------|
| MariaDB    | 0.014 sc     | 0.010 sc     | 0.016 sc     | 0.013 sc     |
| NoSQL      | NA sc     | NA sc     | NA sc     | NA sc     |


### Remplissage des tables/noeuds :
| Base de données | Users     | Products  | Purchases | Follows 
|-----------------|-----------|-----------|-----------|-------------|
| MariaDB         | 20 min    | 4sc       | 4.195 sc  | NA (trop long ) |
| NoSQL           | 14.23 sc  | 13.51 sc  | NA sc   | NA sc     |


### Temps des requêtes :
| Base de données | Requête 1 | Requête 2 | Requête 3 |
|----------------|-----------|-----------|-----------|
| NoSQL          | 13.02 sc     | 12.74 sc     | 16.2 sc     |
| MariaDB        | 14.23 sc     | 13.51 sc     | 11.3 sc     |

#### Configuration

MariaDB :
` port: 3306,
  user: "root", 
  password: "root" `
  
NoSQL :
` port :7687,
  user : neo4j,
  password : neo4j1234`
  
API Node JS, URL de requête:
  `/requeteNeo4j,
  /ajoutNeo4j,
  /ajoutSQL,
  /requeteSQL`

### Installation du projet

Faire un GitClone dans un répertoire et ensuite utiliser un

`npm install`

Pour vous connecter à votre base, je vous conseille de modifier le db.js pour correspondre a vos logins

Pour lancer l'application :

`npm start`


## IMPORTANT
Nous nous sommes contentés du miminum en expérience utilisateur et nous vous recommandons d'ouvrir la console JS de votre navigateur afin d'avoir les messages de validation de vos actions ( ajout d'éléments dans les bases, requête de données, etc...)

### Conclusion :

Les deux bases de données que nous avons créé sont différentes et ont chacune leurs avantages et leurs inconvénients en fonction des cas d'utilisation:

La base de données NoSQL que nous avons créé est orientée graphe et est donc très utile pour les cas d'utilisation basés sur des graphes, tels que les réseaux sociaux. Elle est très performante pour les requêtes basées sur les relations, avec comme exemples la première et la seconde requête que nous avons écrites. Cependant, elle peut être moins performante pour les requêtes qui nécessitent des jointures complexes sur plusieurs tables.

L' autre base de données utilise un modèle relationnel , elle est optimisée pour les requêtes basées sur des tables. Elle est plus efficace pour les jointures sur plusieurs tables, comme la troisième requête que nous avons écrit, elle implique trois tables différentes. Cependant, elle peut être moins efficace pour les requêtes qui nécessitent de suivre des relations entre les données, comme les requêtes de niveau 1 et 2 que nous avons fait.

En fonction de notre cas d'utilisation, nous pouvons choisir la base de données qui nous convient le mieux. Si vous travaillez principalement avec des données relationnelles et que vous avez besoin d'effectuer des jointures complexes sur plusieurs tables, la base de données relationnelle est la meilleure option. Si vous travaillez principalement avec des données orientées graphe et que vous avez besoin d'effectuer des requêtes basées sur les relations, la base de données NoSQL semble être la meilleure option.



Projet mené par Grégoire Arnoult et Jules Fabre.
