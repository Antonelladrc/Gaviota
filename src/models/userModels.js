/* este código proporciona una función para autenticar a los usuarios mediante la búsqueda de un 
nombre de usuario y una contraseña coincidentes en una base de datos */

var pool = require('./bd');
var md5 = require('md5');

async function getUserByUsernameAndPassword(user, password){
    try{
        var query = 'select * from usuario where usuario = ? and password = ? limit 1';
        var rows = await pool.query(query,[user, md5(password)]);
        return rows[0];
    } catch (error){
        console.log(error);
    }
 }

 module.exports = {getUserByUsernameAndPassword}

/* 
var pool = require("")
const {DataTypes} = require ('sequelize')
const sequelize = require ('./db')

const User= sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

    },
    role: {
        type: DataTypes.ENUM(["user","admin"]),
        allowNull: false,
    },
    contact: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

User.sync(); */