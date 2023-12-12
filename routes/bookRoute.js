const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", bookController.obtenerLibros);
router.get("/:id", bookController.obtenerLibroPorId);
router.post("/", bookController.crearLibro);
router.put("/:id", bookController.actualizarLibro);
router.delete("/:id", bookController.eliminarLibro);

module.exports = router;
