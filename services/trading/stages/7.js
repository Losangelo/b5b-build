"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const banco_1 = __importDefault(require("../models/banco"));
function execute(user, msg) {
    //Libera o contato para fazer novo cardapio, se ele desejar
    console.table(banco_1.default);
    delete banco_1.default[user];
    console.log("\nLiberei o contato para fazer outro pedido se ele assim o quiser!");
    return ["Liberado"];
}
exports.execute = execute;
//# sourceMappingURL=7.js.map