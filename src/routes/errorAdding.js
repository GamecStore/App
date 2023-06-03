const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    res.render('pages/errorAdding')
})



module.exports = router
