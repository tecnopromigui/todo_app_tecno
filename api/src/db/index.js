const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DEBUG, DB_USER, DB_PASSWORD, DB_DIALECT, DB_PORT, DB_HOST, DB_NAME, DB_WEB } = process.env;

if (DEBUG === "true") {
    const baseDeDatos = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        port: DB_PORT,
        dialect: DB_DIALECT,
        host: DB_HOST,
        logging: false
    })

    module.exports = baseDeDatos;
} else {
    //Render deploy database
    const baseDeDatos = new Sequelize(DB_WEB, {
        logging: false, // set to console.log to see the raw SQL queries
        native: false,
        dialect: "postgres", // lets Sequelize know we can use pg-native for ~30% more speed
        dialectOptions: {
            ssl: {
                require: true,
            },
        }
    });

    module.exports = baseDeDatos;
}

