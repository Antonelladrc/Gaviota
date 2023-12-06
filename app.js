var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var session = require("express-session");
var fileUpload = require("express-fileupload");
var cors = require("cors");

var app = express();
var indexRouter = require("./routes/index.js");
var usersRouter = require("./routes/users.js");
var loginRouter = require("./routes/admin/login");
var adminRouter = require("./routes/admin/updates");
var apiRouter = require("./routes/api");

app.use(
  session({
    secret: " ",
    resave: false,
    saveUninitialized: true,
  })
);

secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error);
  }
};

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use("/", indexRouter);
app.use("/admin/login", loginRouter);
app.use("/admin/update", secured, adminRouter);
app.use("/api", cors(), apiRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
