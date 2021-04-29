const Schtroumpf = require('../models/Schtroumpf.js');
const fs = require('fs');

exports.createFriend = (req, res, next) => {
    const schtroumpfObject = JSON.parse(req.body.schtroumpf);
    delete schtroumpfObject._id;
    const schtroumpf = new Schtroumpf({
        ...schtroumpfObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    schtroumpf.save()
        .then(() => res.status(201).json({ message: 'un nouveau contact enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneFriend = (req, res, next) => {
    Schtroumpf.findOne({
        _id: req.params.id
        }).then(
        (schtroumpf)=> {
            res.status(200).json(schtroumpf);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyFriend = (req, res, next) => {
    const schtroumpfObject = req.file ?
        {
            ...JSON.parse(req.body.schtroumpf),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Schtroumpf.updateOne({ _id: req.params.id }, { ...schtroumpfObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Données modifiées !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteFriend = (req, res, next) => {
    Schtroumpf.findOne({ _id: req.params.id })
        .then(schtroumpf => {
            const filename = schtroumpf.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Schtroumpf.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Données supprimées !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllFriend = (req, res, next) => {
    Schtroumpf.find().then(
        (schtroumpfs) => {
            res.status(200).json(schtroumpfs);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
