const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price, discount) => toThousand(Math.round(price * (1 - (discount / 100))));
const controller = {



    // Root - Show all products
    index: (req, res) => {
        res.render('products', { products: products }) // renderiza LA RUTA; PERO FALTAN LOS PRODUCTOS
    },

    // Detail - Detail from one product
    detail: (req, res) => {

        products.forEach(function(product) {
            if (product.id == req.params.id) {
                producto = product
            }
        })
        res.render('detail', { producto: producto, toThousand, formatPrice });

    },

    // Create - Form to create
    create: (req, res) => {
        res.render('product-create-form')
    },

    // Create -  Method to store
    store: (req, res) => {

        // Guardo el nombre de la imagen
        var filename = req.files.map(function(file) {
            return file.filename.toString();
        });
        let producto = { //recupero los datos del form//
            id: products.length + 1,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            description: req.body.description,
            image: filename
        };

        // products.id = products.length + 1 // Esta linea pone el atributo ID en el producto que creamos, si no lo hacemos se suma al json sin el atributo id, y la vista DETAIL nunca los mostraria//
        products.push(producto); //los empujo a products que es el json parseado)
        productsJSON = JSON.stringify(products); // los empaqueto en JSON

        fs.writeFileSync('data/productsDataBase.json', productsJSON); // escribo el nuevo producto en la BD.


        console.log(req.body)

        res.redirect('/')
    },





    // Update - Form to edit // Muestra formulario de Edicion
    edit: (req, res) => {

        res.render('product-edit-form', { products: products, id: req.params.id - 1 })

    },
    // Update - Method to update // Envia producto actualizado
    update: (req, res, next) => {

        // Guardo el nombre de la imagen
        var filename = req.files.map(function(file) {
            return file.filename.toString();
        });
        // recupero los datos del form//
        products.forEach(function(element) {
            if (element.id == req.params.id) {
                //console.log(elemento)
                element.name = req.body.name;
                element.price = req.body.price;
                element.discount = req.body.discount;
                element.category = req.body.category;
                element.description = req.body.description;
                element.image = filename;
            }
        });
        // los empaqueto en un JSON
        productsJSON = JSON.stringify(products);


        // Escribimos nuevamente el archivo productsDataBase.json
        fs.writeFileSync('data/productsDataBase.json', productsJSON);

        console.log(req.body)
        res.redirect('/');


    },









    // Delete - Delete one product from DB
    destroy: (req, res) => {
        // Aca buscamos y borramos//
        let eliminar = products.filter(function(element) {
                return element.id != req.params.id;
            })
            // los empaqueto en un string
        productsJSON = JSON.stringify(eliminar);

        // Escribimos nuevamente el archivo productsDataBase.json
        fs.writeFileSync('data/productsDataBase.json', productsJSON);

        console.log('se elimino el producto ' + req.params.id) // muestra por consola lo eliminado
        res.redirect('/')
    }
};

module.exports = controller;