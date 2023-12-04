var createError = require('http-errors'); /* para crear instancia de errores */
var express = require('express'); /* para lo de node */
var path = require('path'); /* ruta de archivo y directorio */
var cookieParser = require('cookie-parser'); /* analiza las cookies de la solicitud */
var logger = require('morgan'); /* registra las solicitudes en consola */


require('dotenv').config(); /* para cargar variables de entorno desde un archivo .env  */
var session = require('express-session'); /* para el inicio de sesion del usuario */
var fileUpload = require('express-fileupload');  /* facilita la gestión de la carga de archivos */
var cors = require('cors'); /* para la solicitud */

/* las rutas */
var app = express();
var indexRouter = require('./routes/authors.js');
var usersRouter = require('./routes/bookRoute,js');
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/updates');
var apiRouter = require('./routes/api');

/* configuramos el middleware de sesión para gestionar las sesiones */
app.use(session({
    secret: " ", /* para firmar la cookie de la sesion  */
    resave: false, /* la sesión se guarda en el almacén solo si ha habido cambios  */
    saveUninitialized: true /* se almacenarán todas las sesiones, incluso aquellas que no han sido modificadas */
}))

/* este middleware se usa para garantizar que solo los usuarios autenticados
tengan acceso a las rutas protegidas. Si el usuario no está autenticado, se redirige a la página de inicio de sesión. */
secured = async (req, res, next) => {
    try{
        console.log(req.session.id_usuario);
        if(req.session.id_usuario){
            next();
        }
        else{
            res.redirect("/admin/login");
        }
    } catch (error){
        console.log(error);
    }
}

/* se usa para manejar la carga de archivos desde formularios HTML en una solicitud HTTP */
app.use(fileUpload({
    useTempFiles: true, /* carga archivos temporales */
    tempFileDir: "/tmp" /* unix? */
}));

app.use("/", indexRouter);
app.use("/admin/login", loginRouter);
app.use("/admin/update", secured, adminRouter);
app.use("/api", cors(), apiRouter);

/* parte de codigo de clase */
/* catch 404 */
app.use(function(req, res, next){
    next(createError(404));
});

app.use(funtion(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err: {};
    
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
