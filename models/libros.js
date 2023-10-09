import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
  titulo: String,
  genero: String,
  añoPublicacion: Number,
  portada: String,
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autor",
  },
});
export const libroModel = mongoose.model("Libro", libroSchema);
