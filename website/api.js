const express = require('express');
const router = express.Router();

router.get('/see', (req, res) => {
    console.log('Hello')
});

module.exports = router;
