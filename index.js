import express from "express";
import { crud_productos } from "./controlador/d_productos.js"; // Cambiado a productos

const app = express();
const port = 5000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Archivos estáticos (opcional si agregas CSS/JS)
app.use(express.static('./public'));

// Configuración EJS
app.set('views', './vistas/clientes'); // Cambiado a la carpeta de vistas de productos
app.set('view engine', 'ejs');

// Rutas
app.get('/', crud_productos.leer);      // Leer productos
app.post('/crud_p', crud_productos.cud); // CRUD productos (crear, actualizar, borrar)

// Iniciar servidor
app.listen(port, () => {
    console.log(`Aplicación iniciada en http://localhost:${port}/`);
});
