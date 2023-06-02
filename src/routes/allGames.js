const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    res.render('pages/allGames')
})
module.exports = router