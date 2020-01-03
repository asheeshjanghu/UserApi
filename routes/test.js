var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("Asheesh Bitchu came here");
    res.send({test:"Love you"});
});

module.exports = router;
