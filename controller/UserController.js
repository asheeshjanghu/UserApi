const dbSetup = require('../controller/databaseController');
const userhelper = require('../util/UserModelHelper');
const bcrypt = require('bcrypt');

function sendError(err, res) {
    return res.status(400).send({code: 400, message: "Failed to update user"});
}

exports.addPerson = function addPerson(req, res, next) {
    dbSetup.start((collection, client) => {
        let user = userhelper.getUser(req.body);
        let userInfo = userhelper.getUserInfo(req.body);
        if (!userInfo.email || !userInfo.password) {
            return res.status(400).send({ code: 400, message: "Email/password field cannot be empty"});
        }
        collection.find({email: userInfo.email}).toArray().then((result)=> {
            if (result.length > 0) {
                return res.status(400).send({ code: 400, message:"This user already exists"});
            } else {
                bcrypt.hash(userInfo.password, 10, (err, hashedPassword)=> {
                    if (err) {
                        return sendError(err, res);
                    } else {
                        userInfo.password = hashedPassword;
                        collection.update(user, {$set: userInfo}, {upsert: true}, function (err, result) { // upsert option updates if item exists otherwise creates a new item
                            client.close();
                            if (err) {
                                return sendError(err, res);
                            } else {
                                return res.status(200).send({code:200, message: `Thanks for registering with us ${user.firstName}`});
                            }
                        });
                    }
                });
            }
        }).catch((error)=>{
            return res.status(400).send({ "code": 400, "message":"Failed to update user"});
        });

    });
};

exports.getParticularUser = function (req, res, next) {
    dbSetup.start((collection, client) => {
        let user = userhelper.getUser(req.query);
        collection.find(user).toArray().then((data) => {
            client.close();
            console.log(data);
            if (data.length > 0) {
                return res.status(200).send(data);
            } else {
                return res.status(400).send({code:400, message: "Failed to find user"});
            }
        }).catch(() => {
            client.close();
            console.log("Failed");
            return res.status(400).send({code:400, message: "Failed to find user"});
        });
    });
};

exports.deleteUser = function (req, res, next) {
    dbSetup.start((collection, client) => {
        let user = userhelper.getUser(req.body);
        collection.deleteOne(user, (err, result) => {
            client.close();
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully deleted user");
            }
        });
    });
};