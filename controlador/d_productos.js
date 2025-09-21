import { conectar } from "../modelo/db_conectar.js";

var crud_productos = {};

// 📌 Leer productos + marcas
crud_productos.leer = (req, res) => {
    const sql_productos = `
        SELECT p.idProducto, p.producto, p.idMarca, m.marca, p.descripcion,
               p.precio_costo, p.precio_venta, p.existencia
        FROM Productos p
        LEFT JOIN Marcas m ON p.idMarca = m.idMarca;
    `;
    const sql_marcas = `SELECT * FROM Marcas`;

    conectar.query(sql_productos, (error, resultados_productos) => {
        if (error) throw error;
        conectar.query(sql_marcas, (err2, resultados_marcas) => {
            if (err2) throw err2;
            res.render('index', { productos: resultados_productos, marcas: resultados_marcas });
        });
    });
};

// 📌 Insertar, actualizar o eliminar producto
crud_productos.cud = (req, res) => {
    const { btn_crear, btn_actualizar, btn_borrar, txt_id, txt_producto, txt_idMarca, txt_descripcion, txt_precio_costo, txt_precio_venta, txt_existencia } = req.body;

    if (btn_crear) {
        const sql = `
            INSERT INTO Productos (producto, idMarca, descripcion, precio_costo, precio_venta, existencia)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        conectar.query(sql, [txt_producto, txt_idMarca, txt_descripcion, txt_precio_costo, txt_precio_venta, txt_existencia], (error) => {
            if (error) console.log(error);
            res.redirect('/');
        });
    }

    if (btn_actualizar) {
        const sql = `
            UPDATE Productos SET producto=?, idMarca=?, descripcion=?, precio_costo=?, precio_venta=?, existencia=?
            WHERE idProducto=?
        `;
        conectar.query(sql, [txt_producto, txt_idMarca, txt_descripcion, txt_precio_costo, txt_precio_venta, txt_existencia, txt_id], (error) => {
            if (error) console.log(error);
            res.redirect('/');
        });
    }

    if (btn_borrar) {
        const sql = `DELETE FROM Productos WHERE idProducto=?`;
        conectar.query(sql, [txt_id], (error) => {
            if (error) console.log(error);
            res.redirect('/');
        });
    }
};

export { crud_productos };
