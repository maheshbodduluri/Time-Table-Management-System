const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const userAuth = require('../middleware/userauth');


router.get('/user/timetable',userAuth.getUserAuth,userController.getTimeTable);

router.post('/user/logout',userAuth.getUserAuth,userController.postUserLogout);

module.exports = router;