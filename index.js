const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const router = require('./routes');

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/agendamento');

app.use('/', router);

app.listen(8080, () => {
    console.log('Server running on 8080');
});