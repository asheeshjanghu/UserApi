const express = require('express');
const router = express.Router();
const cors = require('cors');
const userHelper = require('../util/UserModelHelper');
const dbSetup = require('../controller/databaseController');
const bcrypt = require('bcrypt');


//user trying to login with email and password
// 1. get user based on email and then match password
router.post("/",cors(), (req, res, next) => {
    dbSetup.start((collection, client) => {
        let userValid = userHelper.validateUser(req);
        if (!userValid) {
            client.close();
            return res.status(400).send({code: 400, message: "Failed to Login"});
        }
        let userInfo = userHelper.getUserInfo(req.body);
        collection.findOne({email: userInfo.email})
            .then((user) => {
                client.close();
                if (!user) {
                    return res.status(400).send({code: 400, message: "Failed to Login. No such user exists."});
                }
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        // Passwords match
                        return res.status(200).send({code: 200, message: "Login success"});
                    } else {
                        // Passwords don't match
                        return res.status(400).send({code: 400, message: "Login Failed. Wrong Password"});
                    }
                });
            })
            .catch((error) => {
                return res.status(500).send({code: 500, message: "Login Failed. Server Error."});
            })
    });
});

module.exports = router;