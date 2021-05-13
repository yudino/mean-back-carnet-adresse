const User = require('../models/User');
const fs = require('fs');


exports.addOneFriend = (req, res, next) => {
    User.findByIdAndUpdate(
        {_id: req.query.userId},
        {
            $push: {
                friends: {_id: req.query.myFriendId}
            }
        },
        {new: true, useFindAndModify: false},
        function (err, result) {
            if (err) {
                res.status(400).json({err});
            } else {
                User.findByIdAndUpdate(
                    {_id: req.query.myFriendId},
                    {
                        $push: {
                            friends: {_id: req.query.userId}
                        }
                    },
                    {new: true, useFindAndModify: false},
                    function (err, result) {
                        if (err) {
                            res.status(400).json({err});
                        } else {
                            res.status(201).json({message: 'un nouveau contact enregistré !'});
                        }
                    }
                )
            }
        }
    )
};

exports.getAllMyFriends = (req, res, next) => {
    User.find({_id: req.params.id}).populate("friends").then(
        (myFriends) => {
            res.status(200).json(myFriends);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    )
};


exports.deleteOneFriend = (req, res, next) => {
    console.log(req)
    User.findByIdAndUpdate(
        {_id: req.query.userId},
        {
            $pull: {
                friends: req.query.myFriendId
            }
        },
        {new: true, useFindAndModify: false},
        function (err, result) {
            if (err) {
                res.status(400).json({err});
            } else {
                User.findByIdAndUpdate(
                    {_id: req.query.myFriendId},
                    {
                        $pull: {
                            friends: req.query.userId
                        }
                    },
                    {new: true, useFindAndModify: false},
                    function (err, result) {
                        if (err) {
                            res.status(400).json({err});
                        } else {
                            res.status(200).json({message: ' contact enlevé !'});
                        }
                    }
                )
            }
        }
    )
};
