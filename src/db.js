const {Sequelize} = require(sequelize)

const sequelize = new Sequelize(register, user, password, {
    host: localhost,
    dialect: mysql
}) 

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY } =
  process.env;
  
module.exports = sequelize;
/* comentario de prueba */