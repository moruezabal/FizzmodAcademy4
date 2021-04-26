import express from 'express';
import handlebars from  'express-handlebars';
import path from 'path';


const app = express();

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(path.join(process.cwd() + '/public/form.html')); 
});



const PORT = (process.env.PORT || 8080);

app.listen(PORT, () => {
    console.log(`Aplicación corriendo en http://localhost:${PORT}`)
})