# Proyecto Final - Fizzmod Academy

_Aplicación desarrollada en Node.js, que mantiene un inventario de productos persistidos con Mongo DB_

### Instalación 🔧

_Instalar dependencias y ejecutar con:_

_npm start_

## Rutas 

_Endpoints disponibles para navegar la aplicación_

* ('/') -> Formulario para cargar proyectos
* ('/listar/:id') -> Lista los productos. Si tiene el id, lista solo el producto seleccionado
* ('/listar/set-correo) -> Formulario para ingresar correo electrónico al cual enviar el email.

### Envío de mail 📋

_Cada vez que se cargan 10 productos en el inventario, te envía un email al correo especificado en '/set-correo'_
