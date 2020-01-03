var express = require('express');
const router = express.Router();
const dbSetup = require('../controller/databaseController');


router.post("/", (req, res, next)=> {
    dbSetup.start((collection, client) => {
        collection.find().toArray().then((data) => {
            if (data.length > 0) {
                for (d of data) {
                    d.password = "abcd1234";
                    collection.updateOne({firstName: d.firstName}, {$set: {password: d.password}}, (err, res) => {
                        if (err) {
                            client.close();
                            return res.status(400).send({code:400, message: "Failed to Add users password"});
                        } else {
                            console.log("Updated user = ", JSON.stringify(d)); // this d is the last d which was set as the callback takes some time
                        }
                    });
                }
                client.close();
                return res.status(200).send(data);
            } else {
                client.close();
                return res.status(400).send({code:400, message: "Failed to Add users password"});
            }
        }).catch((err) => {
            client.close();
            console.log("Failed");
            return res.status(400).send({code:400, message: "Failed to find user"});
        });
    });
});

module.exports = router;
