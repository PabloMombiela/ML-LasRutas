// ************ Require's ************
const express = require('express');
const router = express.Router();
let multer = require('multer');
let path = require('path');
//funcionamiento MULTER//

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/products')
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })


// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index);

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);
router.post('/create', upload.any(), productsController.store);


/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productsController.detail);

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', upload.any(), productsController.update); // llamamos a la variable upload y al metodo any.


/*** DELETE ONE PRODUCT***/
router.delete('/:id', productsController.destroy);


module.exports = router;