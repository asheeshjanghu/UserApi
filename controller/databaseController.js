const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "Users";
const usersCollectionName = "users";

exports.start = function (callback) {
    let client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        const usersCollection = db.collection(usersCollectionName);
        console.log("Asheesh  connection successful");
        callback(usersCollection, client);
    });
};