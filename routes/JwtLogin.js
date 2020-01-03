const express = require('express');
const router = express.Router();
const cors = require('cors');
const JwtLoginHandler = require('../controller/JWTLoginHandler');

router.post("/", cors(), (req, res, next)=> {
    return JwtLoginHandler.login(req, res, next);
});

module.exports = router;