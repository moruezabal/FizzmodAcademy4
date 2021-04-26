import nodemailer from 'nodemailer';
import fs from 'fs';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user: 'moruedev@gmail.com',
        pass: 'Zane_0042'    
    }
})

function render (data){
    let html = data.map((elem, index) =>{
       return ( `<tr>
                    <td>${elem.nombre}</td>
                    <td>${elem.precio}</td>
                    <td>${elem.descripcion}</td>
                    <td><img src="${elem.foto}"></td>
                </tr>`);
    }).join(" ");

    return html
}

const sendmail = function(productos) {

    if (!fs.existsSync('correo.dat')) {
        fs.writeFileSync('correo.dat', 'moruezabal@gmail.com')
    }

    fs.promises.readFile('correo.dat', 'utf-8').then ( email => {

        let template = render(productos);
        
        const mailOptions = {
            from: 'moruedev@gmail.com',
            to: email,
            subject: 'Se han agregado 10 productos!',
            html: template
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err)
                cb(err, null)
            }
            console.log(info)
            cb(null,info)
        })
    })
}

export default {
    sendmail
};