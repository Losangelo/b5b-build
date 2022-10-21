"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu0_1 = __importDefault(require("../menu/menu0"));
const banco_1 = __importDefault(require("../models/banco"));
function execute(user, msg) {
    if (msg === "*") {
        banco_1.default[user].stage = 7; //0; //cancelado
        // db[user].stage = 0;
        return [".:: Pedido *cancelado* com sucesso"];
    }
    if (msg === "#") {
        banco_1.default[user].stage = 2;
        return [
            ".:: Digite algo para eu te enviar o Resumo do seu pedido.",
            "*.:: Estamos fechando seu pedido, ok?*",
        ];
    }
    if (!menu0_1.default[msg]) {
        return [
            ".:: *Código inválido*, digite corretamente",
            ".:: Digite # para *finalizar* ou * para cancelar",
        ];
    }
    banco_1.default[user].items.push(menu0_1.default[msg]);
    return [
        ".:: Digite # para finalizar ou * para cancelar",
        `.:: Item( *${menu0_1.default[msg].description}* ) adiconado com sucesso`,
    ];
}
exports.execute = execute;
//# sourceMappingURL=1.js.map