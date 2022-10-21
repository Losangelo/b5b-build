"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const banco_1 = __importDefault(require("../models/banco"));
const stages_1 = __importDefault(require("../models/stages"));
function execute(user, msg) {
    if (msg === "*") {
        banco_1.default[user].stage = 7; //0-inicio 6-concluido;
        return [".:: Pedido *cancelado* com sucesso"];
    }
    if (msg === "#") {
        banco_1.default[user].stage = 5;
        return stages_1.default[5].obj.execute(user, "");
    }
    return [
        `*Confirma endereco de entrega :*\n${msg}`,
        ".:: Digite # para *continuar* ou * para *cancelar*",
    ];
}
exports.execute = execute;
//# sourceMappingURL=3.js.map