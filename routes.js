const express = require('express');
const router = express.Router();
const AppointmentService = require('./services/AppointmentService');

router.get('/', (req, res) => {
    res.send('Hello, World!');
});

router.get('/cadastro', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const {name, email, description, cpf, date, time} = req.body;

    try {
        await AppointmentService.create(name, email, description, cpf, date, time);
        res.redirect('/');
    } catch(err) {
        console.log(err);
        res.send("Ocorreu uma falha.");
    }
});

module.exports = router;