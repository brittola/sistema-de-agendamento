const express = require('express');
const router = express.Router();
const AppointmentService = require('./services/AppointmentService');

router.get('/', (req, res) => {
    res.render('index');
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

router.get('/appointments', async (req, res) => {
    const appointments = await AppointmentService.getAll(false);
    res.json(appointments);
});

router.get('/event/:id', async (req, res) => {
    const { id } = req.params;
    const appointment = await AppointmentService.getById(id);
    
    res.render('event', { appointment });
});

router.post('/finish', async (req, res) => {
    const {id} = req.body;

    await AppointmentService.finish(id);

    res.redirect('/');
});

router.get('/search', async (req, res) => {
    const query = req.query.query;
    let appointments = [];

    if (query) {
        appointments = [...await AppointmentService.search(query)];
    } else {
        appointments = [...await AppointmentService.getAll(true)];
    }

    res.render('search', { appointments });
});

module.exports = router;