"use strict";
/**
 * aqui ele vai buscar os produtos na base e disponibilizar
 * opção menu
 * pegar campos no db e printalos
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const menu0_1 = __importDefault(require("../menu/menu0"));
// const menu0 = require("../menu/menu0");
const banco_1 = __importDefault(require("../models/banco"));
// import db from "./services/trading/models/banco";
function execute(user, msg, contato) {
    // Obtem a hora atual do PC para definir se vai ser Bom dia, tarde ou noite.
    const stamp = new Date();
    const hours = stamp.getHours();
    let time = '';
    if (hours >= 18 && hours < 24) {
        time = "Boa noite!";
    }
    else if (hours >= 12 && hours < 18) {
        time = "Boa tarde!";
    }
    else if (hours >= 0 && hours < 12) {
        time = "Bom dia!";
    }
    // time = hours >= 0 && hours < 12 ? "Dia" : (hours >= 12 && hours < 18 ? "Tarde" : "Noite")
    let menu = "*.:: CARDÁPIO ::.*\n::::::::::::::::::::::::::::::::::::::::::::::::::::\n\n";
    Object.keys(menu0_1.default).forEach(value => {
        const item = menu0_1.default[value];
        // console.log(".:: item:", item);
        menu += `${value} - ${menu0_1.default[value].description}\n  ${" ".repeat(Number(value.length) + 3)}*R$ ${menu0_1.default[value].price}* \n::..........\n`;
    });
    banco_1.default[user].stage = 1;
    return [
        menu,
        `*${time} ${contato}*, sou uma assistente virtual, irei lhe apresentar o *cardápio*, para fazer o pedido basta enviar o *código* do produto.`,
    ];
}
exports.execute = execute;
;
//# sourceMappingURL=0.js.map