import { Sequelize } from 'sequelize';
import CONFIG from '../config/server.js';

const OPTIONS = {
    host: CONFIG.DB.HOST,
    port: CONFIG.DB.PORT,
    dialect: CONFIG.DB.DIALECT,
    logging: console.log,
    define: {
        underscored: false,
        freezeTableName: true,
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        },
        timestamps: false
    },
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    },
    query:{
        raw: true
    }
}

const sequelize = new Sequelize(
    CONFIG.DB.DATABASE, 
    CONFIG.DB.USERNAME, 
    CONFIG.DB.PASSWORD, 
    OPTIONS
);
sequelize.sync(
    {
        force: true
    }
);

const sequelizeInit = new Sequelize(
    '', 
    CONFIG.DB.USERNAME, 
    CONFIG.DB.PASSWORD, 
    OPTIONS
);

export {sequelize, sequelizeInit};