import { Router } from "express";
import { autorModel } from "../models/autor.js";
const rutasAutor = Router();
// Ruta para crear un nuevo autor
rutasAutor.post("/", async (req, res) => {
  try {
    const nuevoAutor = new autorModel({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      biografia: req.body.biografia,
    });

    const autorGuardado = await nuevoAutor.save(); // Corrección aquí

    res.json(autorGuardado);
  } catch (error) {
    console.log(error, "nose pudo crear");
    res.status(400).json({ error: "No se pudo crear el autor" });
  }
});
// Ruta para obtener la lista de autores
rutasAutor.get("/", async (req, res) => {
  try {
    const autores = await autorModel.find();

    res.json(autores); // Aquí se envía la lista de autores como respuesta JSON
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "No se pudo obtener la lista de autores" });
  }
});

// Ruta para obtener un autor por su ID
rutasAutor.get("/:id", async (req, res) => {
  try {
    const autor = await autorModel.findById(req.params.id);
    if (!autor) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    res.json(autor);
  } catch (error) {
    res.status(400).json({ error: "No se pudo obtener el autor" });
  }
});

// Ruta para actualizar un autor por su ID
rutasAutor.put("/:id", async (req, res) => {
  try {
    const autor = await autorModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!autor) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    res.json(autor);
  } catch (error) {
    res.status(400).json({ error: "No se pudo actualizar el autor" });
  }
});

// Ruta para eliminar un autor por su ID
rutasAutor.delete("/:id", async (req, res) => {
  try {
    const autor = await autorModel.findByIdAndDelete(req.params.id);
    if (!autor) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    res.json({ mensaje: "Autor eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ error: "No se pudo eliminar el autor" });
  }
});

rutasAutor.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No se encontraron archivos para cargar.");
  }

  // Accede a los archivos cargados
  const archivoCargado = req.files.archivo;

  archivoCargado.mv(`./uploads/${archivoCargado.name}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send("Archivo cargado correctamente.");
  });
});

export default rutasAutor;
