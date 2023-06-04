const express = require("express")
const router = express.Router()
const AllGamesContoller = require('../controllers/allGamesContoller')
const upload = require('../middleware/upload')

router.get('/', AllGamesContoller.allGames_get)
router.post('/', upload.single('poster'), AllGamesContoller.allGames_post)

module.exports = router; 