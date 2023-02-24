# NoSQL


Le projet vise à simuler une application de réseau social permettant aux utilisateurs de suivre d'autres utilisateurs et d'acheter des produits en ligne. La base de données est conçue pour gérer un million d'utilisateurs, 10 000 références de produits et les relations entre eux. Le projet utilise deux technologies dans un but de comparaison de base de données différentes: une base de données NoSQL (Neo4J) et une base de données relationnelle (MariaDB). 

Les utilisateurs peuvent suivre d'autres utilisateurs de manière orientée, et chaque utilisateur peut avoir jusqu'à 20 followers. Les achats des utilisateurs sont enregistrés dans la base de données, avec chaque utilisateur pouvant acheter jusqu'à 5 produits parmi les 10 000 références de produits disponibles. Des requêtes sont fournies pour obtenir des informations sur les commandes et les followers, permettant de découvrir les produits les plus populaires dans les cercles de followers d'un utilisateur donné.

Tout ces test sont dans le but de savoir quel est le modèle de base de données le plus efficace et dans quel but ?

### WEB

Cette web application permet de tester des requêtes sur différentes bases de données à travers une interface utilisateur simple et intuitive, elle donne le temps d'exécution de chaque requete. Elle est codée en HTML, CSS et JavaScript, ce qui la rend facilement accessible et modifiable. L'application est conçue pour fournir des résultats précis et clairs pour chaque requête exécutée, en offrant également une option pour remplir facilement les bases avec un interface intuitive. Grâce à cette application, les utilisateurs peuvent tester rapidement et efficacement leurs requêtes sur différentes bases de données, ce qui permet de faire un comparatif rapide entre les 2 technologies de bases de données.

### Resultat des tests

Ce petit tableau résume le temps d'éxecution de chacune des requetes pour chacune des technos mis sous haute volumétrie.

| Base de données | Requete 1 | Requete 2 | Requete 3 |
|----------------|-----------|-----------|-----------|
| NoSQL          | 13.02 sc     | 12.74 sc     | 16.2 sc     |
| MariaDB        | 14.23 sc     | 13.51 sc     | 11.3 sc     |

### Installation du projet

Faire un GitClone dans un répertoire et ensuite utilisé un

`npm install`

Pour vous connecter a votre base, je vous conseille de modifier le db.js pour correspondre a vos login

Pour lancer l'application :

`npm start`


##IMPORTANT
Nous nous sommes contenté du miminum en expérience utilisateur et nous vous recommandons d'ouvrir la console JS de votre navigateur afin d'avoir les messages de validations de vos actions ( ajout d'éléments dans les bases, requete de données, etc...)

### Conclusion :

Les deux bases de données que nous avons créées sont différentes ont chacune leurs avantages et leurs inconvénients en fonction des cas d'utilisation:

La base de données NoSQL que nous avons créée est orientée graphe et est donc très utile pour les cas d'utilisation basés sur des graphes, tels que les réseaux sociaux. Elle est très performante pour les requêtes basées sur les relations, avec comme exemples la première requêtes et de la deuxième requête que nous avons écrites. Cependant, elle peut être moins performante pour les requêtes qui nécessitent des jointures complexes sur plusieurs tables.

L' autre solution se base de données relationnelle que nous avons créée, elle est optimisée pour les requêtes basées sur des tables. Elle est plus efficace pour les jointures sur plusieurs tables, comme la requête de niveau 3 que nous avons écrite, elle implique trois tables différentes. Cependant, elle peut être moins efficace pour les requêtes qui nécessitent de suivre des relations entre les données, comme les requêtes de niveau 1 et 2 que nous avons faites.

En fonction de notre cas d'utilisation, nous pouvons choisir la base de données qui  nous convient le mieux. Si on travaille principalement avec des données relationnelles et que nous avons besoin d'effectuer des jointures complexes sur plusieurs tables, la base de données relationnelle est la meilleure option. Si vous travaillez principalement avec des données orientées graphe et que nous avons besoin d'effectuer des requêtes basées sur les relations, la base de données NoSQL semble être la meilleure option.
