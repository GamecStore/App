const express = require("express")
const router = express.Router()
const AddingGamesContoller = require('../controllers/addingGamesController')


router.get('/', AddingGamesContoller.addingGames_get)
// router.post('/', AddingGamesContoller.addingGames_post)



module.exports = router