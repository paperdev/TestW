import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';

import CONFIG from '../config/server.js';
import router from '../routes/index.js';
import logHandler from '../utils/logHandler.js';
import errorHandler from '../utils/errorHandler.js';
import bodyChecker from '../utils/bodyChecker.js';
import { sequelizeInit } from '../db/sequelize.js'

const PORT = CONFIG.SERVER.PORT.HTTP;
const app = express();
const main_server = http.createServer(app);

export default async function() {
    app.use(bodyParser.json());
    app.use(bodyChecker);
    app.use(logHandler);
    app.use(errorHandler);
    await sequelizeInit.query('CREATE DATABASE IF NOT EXISTS ' + CONFIG.DB.DATABASE + ';');
    await router(app);
    main_server.listen(PORT);
}

main_server.on('listening', (err) => {
    if (err) {
        return console.error('Server start failed.\n' + err);
    }
    console.log('Server running on port : ' + main_server.address().port);
});

main_server.on('errorHandler', (err) => {
    console.error('Server start failed.\n' + err);
});

main_server.on('close', (err) => {
    if (err) {
        return console.error('Server close failed.\n' + err);
    }
    console.log('Server closed.');
});