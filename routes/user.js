const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config.js');


const userCtrl = require('../controllers/user')

router.post('/signup', multer, userCtrl.signup);
router.post('/create-user-and-friend', multer, userCtrl.signupAndAddFriend);
router.post('/login', userCtrl.login);

module.exports = router;
