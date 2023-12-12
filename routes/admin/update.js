var express = require("express");
var router = express.Router();
var productModels = require("../../models/productModels");
var util = require("util");
var cloudinary = require("cloudinary").v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get("/", async function (req, res, next) {
  let product = await productModels.getProduct();

  product = product.map((product) => {
    if (product.img_id) {
      const imagen = cloudinary.image(novedad.img_id, {
        width: 80,
        height: 80,
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

  res.render("admin/update", {
    layout: "admin/layout",
    usuario: req.session.nombre,
    update,
  });
});

router.get("/add", (req, res, next) => {
  res.render("admin/add", {
    layout: "admin/layout",
  });
});

router.post("/add", async (req, res, next) => {
  try {
    let img_id = "";
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (
      req.body.titulo != "" &&
      req.body.subtitulo != "" &&
      req.body.cuerpo != ""
    ) {
      await productModels.insertProduct({
        ...req.body,
        img_id,
      });
      res.redirect("/admin/product");
    } else {
      res.render("admin/add", {
        layout: "admin/layout",
        error: true,
        message: "No se puede dejar campos vacios",
      });
    }
  } catch (error) {
    console.log(error);
    res.render("admin/add", {
      layout: "admin/layout",
      error: true,
      message: "No se cargo el producto",
    });
  }
});

router.get("/remove/:id", async (req, res, next) => {
  var id = req.params.id;

  let product = await productModels.getProductById(id);
  if (product.img_id) {
    await destroy(product.img_id);
  }
  await productModels.deleteProductById(id);
  res.redirect("/admin/product");
});

router.get("/modif/:id", async (req, res, next) => {
  var id = req.params.id;
  var product = await productModels.getProductById(id);
  console.log(req.params.id);
  res.render("admin/modif", {
    layout: "admin/layout",
    product,
  });
});

router.post("/modif", async (req, res, next) => {
  try {
    let img_id = req.body.img_original;
    let borrar_img_vieja = false;

    if (req.body.img_delete === "1") {
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }

    if (borrar_img_vieja && req.body.img_original) {
      await destroy(req.body.img_original);
    }

    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo,
      img_id,
    };
    console.log(obj);

    console.log(req.body.id);

    await productModels.modificarProductById(obj, req.body.id);
    res.redirect("/admin/product");
  } catch (error) {
    console.log(error);
    res.render("admin/product", {
      layout: "admin/layout",
      error: true,
      message: "No se modifico el producto",
    });
  }
});

module.exports = router;
