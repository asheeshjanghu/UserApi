const jwt = require('jsonwebtoken');

const jwtKey = 'my_secret_key';
const jwtExpirySeconds = 300;

exports.createJWTToken = function (email) {
    // Create a new token with the username in the payload
    // and which expires 300 seconds after issue
    return jwt.sign({email}, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    });
};
