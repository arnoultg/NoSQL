// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');
 
// Create a connection pool
var pool = 
  mariadb.createPool({
    host: "127.0.0.1", 
    port: 3306,
    user: "root", 
    password: "root",
    database: "Relational"
  });
 
  // Use the Neo4j JavaScript Driver
var neo4j = require('neo4j-driver');

// Create a driver instance
var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "neo4j1234"));

// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
  pool: pool,
  driver: driver
});


