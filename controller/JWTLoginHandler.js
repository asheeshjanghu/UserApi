const userHelper = require('../util/UserModelHelper');
const dbSetup = require('../controller/databaseController');
const bcrypt = require('bcrypt');
const jwtTokenHelper = require('../util/jwtTokenHelper');

//Login using password and then passback JWT for further authenticated requests
exports.login = function (req, res, next) {
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
                bcrypt.compare(userInfo.password, user.password, function (err, result) {
                    if (result) {
                        // Passwords match
                        // create jwt token and send back in response
                        const token = jwtTokenHelper.createJWTToken(user.email);
                        return res.status(200).send({code: 200, message: "Login success", token: token});
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
};
