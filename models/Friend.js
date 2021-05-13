const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
      userId: { type: String, required: true },
      myFriendId: { type: String, required: true },
})

module.exports = mongoose.model('Friend', friendSchema );
