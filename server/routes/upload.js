var express = require("express");
var multer = require('multer');
const router = express.Router();

// multer file storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        // gets the file extension
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, Date.now() + ext);
    }
})
var upload = multer({ storage: storage })

// the route for uploading an image
router.post('/', upload.single('img'), async function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    //console.log(req.file);
    res.send( req.file.filename );
});

module.exports = router;
