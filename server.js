var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const logger = require('pino')();
dotenv.config();
const app = require('./config/express');
const config = require('./config/config');
const { Session } = require('./api/class/session');
const connectToCluster = require('./api/helper/connectMongoClient');
let server;
if (config.mongoose.enabled) {
    mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
        logger.info('Connected to MongoDB');
    });
}
server = app.listen(config.port, () => __awaiter(this, void 0, void 0, function* () {
    logger.info(`Ouvindo a porta ${config.port}`);
    global.mongoClient = yield connectToCluster(config.mongoose.url);
    if (config.restoreSessionsOnStartup) {
        logger.info(`Restoring Sessions`);
        const session = new Session();
        let restoreSessions = yield session.restoreSessions();
        logger.info(`${restoreSessions.length} Session(s) Restored`);
    }
}));
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
module.exports = server;
