const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const userModel = require('../models/userModels');

class Datasource {
    constructor() {
        this.sequelize = null;
        this.users = null;

        this.connect();
    }

    async connect() {
        this.sequelize = new Sequelize(
            `postgres://${databaseConfig.dbUser}:${databaseConfig.dbPass}@${databaseConfig.dbHost}:${databaseConfig.dbPort}/${databaseConfig.database}`   
        );
        await this.defineModel();
    }

    async defineModel() {
        this.users = this.sequelize.define(userModel.table, userModel.model);
        
        await this.users.sync();
        return this.users;
    }

    static async isConnected(sequelize) {
        try {
            await sequelize.authenticate();
            return true;
        } catch (error) {
            console.error('fail!', error);
            return false;
        }
    }
}

module.exports = Datasource;
