"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const banco_1 = __importDefault(require("../models/banco"));
function execute(user, msg) {
    if (msg === "*") {
        banco_1.default[user].stage = 7; //0; //cancelado
        return [".:: Pedido *cancelado* com sucesso"];
    }
    if (msg === "#") {
        banco_1.default[user].stage = 3; //Endereço para Entrega
        return [".:: Digite o *endereço para entrega* por favor :"];
    }
    let resumo = ".:: *RESUMO DO PEDIDO*\n¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨\n";
    let total = 0;
    // var total = db[user].items.reduce(getTotal, 0);
    // function getTotal(total: number, item: { value: number; quantity: number; }) {
    //   item.quantity = 1; //pq falta eu incluir a opcao de qt nas operações
    //   return total + item.value * item.quantity;
    // }
    banco_1.default[user].items.forEach((value) => {
        resumo += `${value.description}\n${value.price}\n¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨\n`;
        total += value.price;
    });
    resumo += ".........................\n";
    resumo += ` *Total R$ ${total.toFixed(2)}*`;
    return [
        "Para *confirmar* digite # ou para *cancelar* digite * ",
        resumo
    ];
}
exports.execute = execute;
/**
 * trocar por essa forma que é melhor...
 */
// var products = [
//   { name: "caneta", value: 2.3, quantity: 3 },
//   { name: "caderno", value: 13.4, quantity: 2 },
//   { name: "borracha", value: 1.2, quantity: 5 },
// ];
// var total = products.reduce(getTotal, 0);
// function getTotal(total, item) {
//   return total + item.value * item.quantity;
// }
// alert(`O valor total da compra é de ${total.toFixed(2)}`);
//# sourceMappingURL=2.js.map