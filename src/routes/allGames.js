const express = require("express")
const router = express.Router()
const AllGamesContoller = require('../controllers/allGamesContoller')
const path = require('path');
const multer = require('multer');

//image validations
const storage = multer.diskStorage({
    distination: function(req,file,cb) {
        cb(null,'../public/images/gameimages')  //location where the file will be saved
    },
    filename: function(req,file,cb) {  //rename the file withtimestamp and extension (always unique)
        const ext = path.extname(file.originalname);
        cb(null,Date.now() + ext);
    }
});

// image extensions
const upload = multer({
    storage:storage,
    fileFilter:function(req,file,callback){
        if(
            file.mimetype == 'image/jpeg'||
            file.mimetype == 'image/jpg'||
            file.mimetype == 'image/png'
        ){
            callback(null,true);
        }
        else{
            console.log("Only jpg & png files are supported!");
            callback(null,true);
        }
    },
    limits:{
        fileSize:1024 * 1024 * 2 
    }
});


router.get('/', AllGamesContoller.allGames_get)
router.post('/', upload.single('poster'), AllGamesContoller.allGames_post)

module.exports = router; 