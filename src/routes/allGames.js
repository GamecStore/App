const express = require("express")
const router = express.Router()
const AllGamesContoller = require('../controllers/allGamesContoller')


router.get('/', AllGamesContoller.allGames_get)
router.post('/', AllGamesContoller.allGames_post)

module.exports = router;