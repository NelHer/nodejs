// Importa el módulo 'express' para configurar rutas.
const express = require("express");
// Crea un enrutador para definir las rutas.
const routes = express.Router();

// Define una ruta para manejar peticiones GET a la raíz ('/').
routes.get("/", (req, res) => {
  // Obtiene la conexión a la base de datos desde el objeto 'req'.
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    // Ejecuta una consulta SQL para seleccionar todos los registros de la tabla 'books'.
    conn.query("SELECT * FROM books", (err, rows) => {
      if (err) return res.send(err);

      // Devuelve los resultados en formato JSON como respuesta.
      res.json(rows);
    });
  });
});

// Define una ruta para manejar peticiones POST a la raíz ('/').
routes.post("/", (req, res) => {
  // Obtiene la conexión a la base de datos desde el objeto 'req'.
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    // Ejecuta una consulta SQL para insertar un nuevo libro en la base de datos.
    conn.query("INSERT INTO books set ?", [req.body], (err, rows) => {
      if (err) return res.send(err);

      // Envía una respuesta indicando que el libro se ha añadido con éxito.
      res.send("book added!");
    });
  });
});

// Define una ruta para manejar peticiones DELETE con un parámetro 'id'.
routes.delete("/:id", (req, res) => {
  // Obtiene la conexión a la base de datos desde el objeto 'req'.
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    // Ejecuta una consulta SQL para eliminar un libro específico basado en el 'id' proporcionado.
    conn.query(
      "DELETE FROM books WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        // Envía una respuesta indicando que el libro se ha eliminado con éxito.
        res.send("book excluded!");
      }
    );
  });
});

// Define una ruta para manejar peticiones PUT con un parámetro 'id'.
routes.put("/:id", (req, res) => {
  // Obtiene la conexión a la base de datos desde el objeto 'req'.
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    // Ejecuta una consulta SQL para actualizar un libro específico basado en el 'id' proporcionado.
    conn.query(
      "UPDATE books set ? WHERE id = ?",
      [req.body, req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        // Envía una respuesta indicando que el libro se ha actualizado con éxito.
        res.send("book updated!");
      }
    );
  });
});

// Exporta el enrutador 'routes' para su uso en otras partes de la aplicación.
module.exports = routes;
