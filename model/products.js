import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
    foto: String
})

const productModel = mongoose.model('products', productsSchema)

export default productModel;

