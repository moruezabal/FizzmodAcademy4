import express from 'express';
import handlebars from  'express-handlebars';
import path from 'path';
import mongoose from 'mongoose'
import productModel from './model/products.js'


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(path.join(process.cwd() + '/public/form.html')); 
});

app.get('/listar/:id?', (req,res) => {

    let {id} = req.params;
    let query = id ? {_id:id} : {}

    productModel.find(query, (err,products) => {
        if (err) throw new Error (`Error: ${err}`)
        products.forEach(product => {
            console.log(product);
        });
        res.send(products)
    })
});

app.post('/ingreso', (req, res) => {
    let product = req.body
    const productoNuevo = new productModel(product);
    productoNuevo.save( err => {
        if (err) throw new Error (`Error: ${err}`)
        console.log('usuario incorporado');
        res.send(product);
    })

})

const PORT = (process.env.PORT || 8080);

mongoose.connect('mongodb+srv://moruezabal:Zane_0042@misdatos.avg7f.mongodb.net/tp4?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, err => {
        if (err) throw new Error (`Error en la conexión con la base de datos: ${err}`)
        console.log("Base de datos conectada!")

        app.listen(PORT, () => {
            console.log(`Aplicación corriendo en http://localhost:${PORT}`)
        })

})




