const User = require('../models/User');
const fs = require('fs');



exports.getAllUsers = (req, res, next) => {
    User.find().then(
        (user) => {
            console.log('getAllFriend OK')
            res.status(200).json(user);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getProfile = (req, res, next) => {
    User.findOne({
        _id: req.params.id
    }).then(
        (user)=> {
            res.status(200).json(user);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyProfile = (req, res, next) => {
    const userObject = req.file ?
        {
            ...JSON.parse(req.body.user),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Données modifiées !'}))
        .catch(error => res.status(400).json({ error }));
};
