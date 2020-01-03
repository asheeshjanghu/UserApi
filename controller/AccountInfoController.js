const jwt = require('jsonwebtoken');
const jwtTokenHelper = require('../util/jwtTokenHelper');

const jwtKey = 'my_secret_key';
const jwtExpirySeconds = 300;

exports.getUserAccountInfo = function getUserAccountInfo(req, res, next) {
    const bearerToken = req.headers['authorization'];
    if (bearerToken && bearerToken.startsWith('Bearer')) {
        //1. verify users credentials, we are expecting valid jwt token for this request
        try {
            let payload = jwt.verify(bearerToken.slice(7,bearerToken.length), jwtKey);
            if (payload) {
                const token = jwtTokenHelper.createJWTToken(payload.email);
                return res.send({code: 200, message: "Your token is fine", email: payload.email, token: token});
            } else {
                return res.status(400).send({code: 400, message: "Something went wrong"});
            }
        } catch (e) {
            // this happens when token is not valid
            return res.status(400).send({code: 400, message: "Invalid Token"});
        }
    } else {
        //send error
        return res.status(401).send({code: 401, message: "Please send Bearer token"});
    }
};



