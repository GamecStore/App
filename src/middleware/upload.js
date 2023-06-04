const path = require('path');
const multer = require('multer');

//validations
const storage = multer.diskStorage({
    distination: function(req,file,cb) {
        cb(null,'../public/images/gameimages')  //location where the file will be saved
    },
    filename: function(req,file,cb) {
        const ext = path.extname(file.originalname);
        cb(null,Date.now()+ext);
    },

});