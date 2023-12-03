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

User.sync();