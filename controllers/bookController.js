const { Libro } = require('../models'); 

const bookController = {
  async obtenerLibros(req, res) {
    try {
      const libros = await Libro.findAll();
      res.json(libros);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los libros');
    }
  },

  async obtenerLibroPorId(req, res) {
    const libroId = req.params.id;

    try {
      const libro = await Libro.findByPk(libroId);
      if (libro) {
        res.json(libro);
      } else {
        res.status(404).send('Libro no encontrado');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener el libro por ID');
    }
  },

  async crearLibro(req, res) {
    const nuevoLibro = req.body;

    try {
      const libroCreado = await Libro.create(nuevoLibro);
      res.status(201).json(libroCreado);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear el libro');
    }
  },

  async actualizarLibro(req, res) {
    const libroId = req.params.id;
    const datosActualizados = req.body;

    try {
      const libro = await Libro.findByPk(libroId);
      if (libro) {
        await libro.update(datosActualizados);
        res.json(libro);
      } else {
        res.status(404).send('Libro no encontrado');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al actualizar el libro');
    }
  },

  async eliminarLibro(req, res) {
    const libroId = req.params.id;

    try {
      const libro = await Libro.findByPk(libroId);
      if (libro) {
        await libro.destroy();
        res.send('Libro eliminado exitosamente');
      } else {
        res.status(404).send('Libro no encontrado');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar el libro');
    }
  },
};

module.exports = bookController;