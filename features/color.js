"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
// Da a cor as mensagens do terminal
const color = (text, color) => {
    return !color ? chalk_1.default.green(text) : chalk_1.default.Keyword(color)(text);
};
const bgcolor = (text, bgcolor) => {
    return !bgcolor ? chalk_1.default.green(text) : chalk_1.default.bgKeyword(bgcolor)(text);
};
exports.default = color;
