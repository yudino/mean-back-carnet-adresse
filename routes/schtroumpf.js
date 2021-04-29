const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config.js');

const schtroumpfCtrl= require('../controllers/schtroumpf');

router.get('/', auth, schtroumpfCtrl.getAllFriend);
router.post('/', auth, multer, schtroumpfCtrl.createFriend);
router.get('/:id', auth, schtroumpfCtrl.getOneFriend);
router.put('/:id', auth, multer, schtroumpfCtrl.modifyFriend);
router.delete('/:id', auth, schtroumpfCtrl.deleteFriend);

module.exports = router;
