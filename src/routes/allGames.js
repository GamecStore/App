const express = require("express")
const router = express.Router()
const AllGamesContoller = require('../controllers/allGamesContoller')
const multer = require('multer');
const upload = multer({ dest: "../imagesFile" });


router.get('/', AllGamesContoller.allGames_get)
router.post('/', upload.single("image"), AllGamesContoller.allGames_post)

module.exports = router; 