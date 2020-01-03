const express = require('express');
const router = express.Router();
const cors = require('cors');
const accountInfoController = require('../controller/AccountInfoController');

router.get("/", cors(), (req, res, next) => {
    return accountInfoController.getUserAccountInfo(req, res, next);
});

module.exports = router;
