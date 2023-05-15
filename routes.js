const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, World!');
});

router.get('/cadastro', (req, res) => {
    res.render('create');
});

module.exports = router;