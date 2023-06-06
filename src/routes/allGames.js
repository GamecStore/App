const express = require("express")
const router = express.Router()
const AllGamesContoller = require('../controllers/allGamesController')
const path = require('path');
const multer = require('multer');


//image validations
const storage = multer.diskStorage({
    destination:function(req,file,cb) {   //location where the file will be saved
        cb(null,'src/public/images/uploads/')
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
            callback(null,false);
        }
    },
    limits:{
        fileSize:1024 * 1024 * 2 
    }
});


router.get('/', AllGamesContoller.allGames_get)
router.post('/', upload.single('poster'), AllGamesContoller.allGames_post)
module.exports = router; 