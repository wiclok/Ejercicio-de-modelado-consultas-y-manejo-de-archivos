import { Router } from "express";
import { libroModel } from "../models/libros.js";
const rutasLibros = Router();
import { autorModel } from "../models/autor.js";

// Ruta para crear un nuevo libro

rutasLibros.post("/", async (req, res) => {
  try {
    if (!req.files || !req.files.portada) {
      return res
        .status(400)
        .json({ error: "No se proporcionó una imagen de portada." });
    }

    const portada = req.files.portada;
    const autorId = req.body.autorId;


    const autorExistente = await autorModel.findById(autorId);

    if (!autorExistente) {
      return res.status(400).json({ error: "El autor ingresado no existe." });
    }

    const nuevoLibro = new libroModel({
      titulo: req.body.titulo,
      genero: req.body.genero,
      añoPublicacion: req.body.añoPublicacion,
      portada: `/img/${portada.name}`,
      autor: autorId,
    });

    await portada.mv(`./img/${portada.name}`);

    const libroGuardado = await nuevoLibro.save();

    res.json(libroGuardado);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "No se pudo crear el libro" });
  }
});

// Ruta para obtener la lista de libros
rutasLibros.get("/", async (req, res) => {
  try {
    const libros = await libroModel.find().populate("autor");
    res.json(libros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo obtener la lista de libros" });
  }
});

// Ruta para obtener un libro por su ID
rutasLibros.get("/:id", async (req, res) => {
  try {
    const libro = await libroModel.findById(req.params.id);
    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.json(libro);
  } catch (error) {
    res.status(400).json({ error: "No se pudo obtener el libro" });
  }
});
// Ruta para actualizar un libro por su ID
rutasLibros.put("/:id", async (req, res) => {
  try {
    const libro = await autorModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!libro) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    res.json(libro);
  } catch (error) {
    res.status(400).json({ error: "No se pudo actualizar el autor" });
  }
});

// Ruta para eliminar un libro por su ID
rutasLibros.delete("/:id", async (req, res) => {
  try {
    const libro = await libroModel.findByIdAndDelete(req.params.id);
    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.json({ mensaje: "Libro eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ error: "No se pudo eliminar el libro" });
  }
});

export default rutasLibros;
