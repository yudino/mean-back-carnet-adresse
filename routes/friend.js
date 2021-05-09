const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config.js');
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/friend')

router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getProfile);
router.put('/:id', auth, multer, userCtrl.modifyProfile);

module.exports = router;
