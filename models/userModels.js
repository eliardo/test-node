const Sequelize = require('sequelize');

module.exports = {
    table: "users",
    model:
    {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
        },
        user: {
            type: Sequelize.STRING,
            required: true,
        },
        name: {
            type: Sequelize.STRING,
            required: true,
        },
        status: {
            type: Sequelize.STRING,
            required: true,
        },
        password: {
            type: Sequelize.STRING,
            required: true,
        }
    }
};