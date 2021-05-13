const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userFriendCtrl = require('../controllers/userFriend')

router.get('/:id', auth, userFriendCtrl.getAllMyFriends);
router.put('/', auth, userFriendCtrl.addOneFriend);
router.delete('/', auth, userFriendCtrl.deleteOneFriend);

module.exports = router;
