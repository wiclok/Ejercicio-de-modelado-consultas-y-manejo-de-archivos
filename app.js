import express from "express";
import fileUpload from "express-fileupload";
import { PORT } from "./config/config.js";
import rutasLibros from "./routes/libros.js";
import rutasAutor from "./routes/autores.js";
import { connectMongoDb } from "./config/databaseconnect.js";
const app = express();

app.use(express.static("public"));
app.use(express.json());



app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());
app.use("/libros", rutasLibros);
app.use("/autor", rutasAutor);

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
  connectMongoDb();
});
