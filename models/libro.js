const Libro = mongoose.model("Libro", {
  id: {
    type: mongoose.Schema.Types.ObjectId,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
  paginas: {
    type: Number,
    required: true,
  },
});
