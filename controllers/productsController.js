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

        console.log(req.body)

        res.send('viaja por POST')
    },

    // Update - Form to edit // Muestra formulario de Edicion
    edit: (req, res) => {
        let id = req.params.id
        res.render('product-edit-form', { products: products, id })

    },
    // Update - Method to update // Envia producto actualizado
    update: (req, res) => {
        res.send('Viaja por PUT')
    },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
        console.log('se elimino el producto ' + req.params.id) // muestra por consola lo eliminado
        res.send('El producto se elimino correctamente, bravo.')
    }
};

module.exports = controller;