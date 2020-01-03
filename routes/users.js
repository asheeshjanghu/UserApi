var express = require('express');
var router = express.Router();
const userController = require('../controller/UserController');
const cors = require('cors');


/* Post users / add. */
// cors to allow cross origin
router.post('/', cors(),function (req, res, next) {
    return userController.addPerson(req, res, next);
});


/* Get a particular user */
router.get('/', function (req, res, next) {
    return userController.getParticularUser(req, res, next);
});

//delete a particular user
router.delete('/', function (req, res, next) {
    return userController.deleteUser(req, res, next);
});




module.exports = router;
