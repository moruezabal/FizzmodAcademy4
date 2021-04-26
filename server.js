import express from 'express';
import handlebars from  'express-handlebars';
import path from 'path';
import mongoose from 'mongoose';
import fs from 'fs';
import productModel from './model/products.js';
import email from './email.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

app.engine('hbs', handlebars({
    extname:'.hbs', 
    defaultLayout: 'main.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))
app.set('views', './views')
app.set('view engine', 'hbs')

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
        res.render('list', {products})
    })
});

app.get('/set-correo', (req, res) => {
    res.sendFile(path.join(process.cwd() + '/public/set-correo.html'));
})

app.post('/ingreso', (req, res) => {
    let product = req.body
    const productoNuevo = new productModel(product);
    productoNuevo.save( err => {
        if (err) throw new Error (`Error: ${err}`)
        console.log('producto incorporado');

        productModel.find({}, (err,productos) => {
            if(err) throw new Error(`error en lectura de productos: ${err}`)
            
            if(productos.length % 10 == 0) {
                email.sendmail(productos, (err,info) => {
                    console.log(err,info)
                    res.redirect('/')                    
                })  
            }
        })
        res.redirect('/');
    })
})

app.post('/set-correo', (req,res) =>{
    let {correo} = req.body

    fs.writeFile('correo.dat', correo, err => {
        if(err) throw new Error(`No se pudo escribir correctamente el correo: ${err}`)
        res.redirect('/')
    })
})

app.delete('/borrar/:id', async (req, res) => {
    let {id} = req.params;
    let response = await productModel.deleteOne({_id:id},);
    res.send(response);
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




