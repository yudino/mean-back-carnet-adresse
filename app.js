const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const schtroumpfRoutes = require('./routes/schtroumpf');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://yudino:yudinoAdmin@cluster0.bmpho.mongodb.net/myFirstDatabase?retryWrites=true&w=majorityy',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'+ urlcourante))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        next();
});


app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/carnet', schtroumpfRoutes);
app.use('/auth', userRoutes);

module.exports = app;
