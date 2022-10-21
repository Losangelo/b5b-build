"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const banco_1 = __importDefault(require("../models/banco"));
const stages_1 = __importDefault(require("../models/stages"));
// const { step } = require("../models/stages");
let estagioInterno = 0;
let estagioInterno3 = 0;
function execute(user, msg) {
    /**
     * Confirmou pgto em Especie
     * Finaliza com a mensagem de agradecimento (4)
     * */
    if (estagioInterno === 1) {
        banco_1.default[user].stage = 4;
        banco_1.default[user].paymentMethod = 1;
        return stages_1.default[4].obj.execute(user, "");
    }
    if (msg === "1") {
        estagioInterno++;
        return [
            ".:: *Digite o valor em dinheiro para levarmos o troco* ::.\n :::::::::::::::::::::::::::::::::::::::::::::::::::::::",
        ];
    }
    //Confirmou pgto no Cartão
    if (msg === "2") {
        banco_1.default[user].stage = 4;
        banco_1.default[user].paymentMethod = 2;
        return stages_1.default[4].obj.execute(user, "");
    }
    //Confirmou pgto viao PIX
    if (estagioInterno3 === 1) {
        banco_1.default[user].stage = 4;
        banco_1.default[user].paymentMethod = 3;
        return stages_1.default[4].obj.execute(user, "");
    }
    if (msg === "3") {
        return [
            ".:: Para obter a nossa Chave do *PIX* envie */PIX*",
            ".:: *Aguardaremos a confirmação do _PIX_*",
        ];
    }
    if (msg.toUpperCase() === "/PIX") {
        estagioInterno3++;
        return [
            ".:: Aguardaremos a confirmação do _PIX_*",
        ];
    }
    return [".:: Qual a forma de pagamento\n:::.:.\n\n1️⃣-Dinheiro\n2️⃣-Cartão\n3️⃣-PIX"];
}
exports.execute = execute;
//# sourceMappingURL=5.js.map