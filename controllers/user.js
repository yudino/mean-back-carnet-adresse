const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const fs = require('fs');

exports.signup = (req, res, next) => {
    const userObject = JSON.parse(req.body.user)
    let user = new User({
        ...userObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
    bcrypt.hash(userObject.password, 10)
        .then(hash => {
            user.password = hash;
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Identifiant incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.getAllFriend = (req, res, next) => {
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
