import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  bibliografia: String,
  libros: { type: mongoose.Types.ObjectId, ref: "Libro" },
});

export const autorModel = mongoose.model("autor", autorSchema);
