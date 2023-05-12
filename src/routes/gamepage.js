const express = require('express')
const router = express.Router()

router.get('gamepage', (req, res) => {
    res.render('pages/gamePage')
})

module.exports = router