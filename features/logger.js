"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const log = (0, pino_1.default)({
    enabled: !!!process.env.LOG_DISABLED,
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "dd-mm-yyyy, h:MM:ss",
            levelFirst: true,
        },
    },
});
exports.logger = log;
//# sourceMappingURL=logger.js.map