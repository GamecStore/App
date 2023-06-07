const express = require("express")
const router = express.Router()
const UserController = require('../controllers/UserController');

router.get('/', UserController.library)

module.exports = router