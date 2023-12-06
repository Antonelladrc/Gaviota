var express = require("express");
var router = express.Router();
var productModels = require("../models/productModels");
var cloudinary = require("cloudinary").v2;
var nodemailer = require("nodemailer");

router.get("/product", async function (req, res, next) {
  let product = await productModels.getNew();

  product = product.map((product) => {
    if (product.img_id) {
      const imagen = cloudinary.url(product.img_id, {
        width: 400,
        height: 500,
        crop: "fill",
      });
      return {
        ...product,
        imagen,
      };
    } else {
      return {
        ...product,
        imagen: "",
      };
    }
  });

  res.json(product);
});

router.post("/contact", async (req, res) => {
  const mail = {
    to: "gaviotalibros@gmail.com",
    subject: "Contacto web",
    html: `${req.body.nombre} se ha contactado a traves de la pagina web y desea obtener
        mas informacion a este correo: 
        ${req.body.email} <br> <br> Se ha realizado el siguiente comentario:
        ${req.body.mensaje} <br> <br> Su telefono es:  
        ${req.body.telefono}`,
  };
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail(mail);

  res.status(201).json({
    error: false,
    message: "Mensaje Enviado",
  });
});

module.exports = router;
