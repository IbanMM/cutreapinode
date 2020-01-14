// ------------------------------------------
// Routes configuration
// ------------------------------------------
var path = require('path')
var slugify = require('slugify')
// ------------------------------------------
// Multer handle uploads
// ------------------------------------------
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let filename = file.originalname.substr(0, file.originalname.lastIndexOf('.'))
        cb(null, slugify(filename,{lower: true}) + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage })

// ------------------------------------------
// Initialize express router
// ------------------------------------------
let router = require('express').Router();

// ------------------------------------------
// Set default API response
// ------------------------------------------
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// ------------------------------------------
// Import controllers
// ------------------------------------------
var image = require('./imageController')
var userController = require('./userController')
var contentController = require('./contentController')
var imageSizeController = require('./imageSizeController')

// ------------------------------------------
// User routes
// ------------------------------------------
router.route('/users')
    .get(userController.index)
    .post(userController.new);

router.route('/user')
    .post(userController.new)
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

router.route('/user-login')
    .get(userController.login);

// ------------------------------------------
// Content routes
// ------------------------------------------
router.route('/content')
    .post(contentController.new);

router.route('/content-upload')
    .post(upload.any(), (req, res) => {
        if (!req.files) {
          console.log("No file received");
          return res.send({
            success: false
          });
      
        } else {
          req.files.forEach(i => {
            image.imageResize(i.path,i.filename,i.destination,200,200)
          })
          return res.send({
            success: true
          })
        }
    });

// ------------------------------------------
// Image size routes
// ------------------------------------------
router.route('/imagesize')
    .get(imageSizeController.index)
    .post(imageSizeController.new)

router.route('/imagesizeone')
    .get(imageSizeController.getone)
    .post(upload.any(),(req,res)=>{
        imageSizeController.new(req,res)
    })
    .patch(upload.any(),(req,res)=>{
        imageSizeController.update(req,res)
    })

// Export API routes
module.exports = router;