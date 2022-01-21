import { Sequelize } from 'sequelize';
import CONFIG from '../config/server';

const sequelize = new Sequelize(
    CONFIG.DB.DATABASE, 
    CONFIG.DB.USERNAME, 
    CONFIG.DB.PASSWORD, 
    {
        host: CONFIG.DB.HOST,
        port: CONFIG.DB.PORT,
        dialect: CONFIG.DB.DIALECT,
        logging: console.log,
        define: {
            underscored: false,
            freezeTableName: false,
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            },
            timestamps: true
        },
        pool: {
            max: 5,
            idle: 30000,
            acquire: 60000,
        }
    }
);

export default sequelize;