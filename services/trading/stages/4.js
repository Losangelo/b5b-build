"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const banco_1 = __importDefault(require("../models/banco"));
const stages_1 = __importDefault(require("../models/stages"));
const prisma = new client_1.PrismaClient();
//Nota de Agradecimento ao Cliente
function execute(user, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        banco_1.default[user].stage = 6;
        // await prisma.$connect();
        // console.log("...........................................");
        // console.log(".:: SALVANDO O PEDIDO DO CLIENTE: ", db[user]);
        const numberOfOrders = yield prisma.toBeAttended.count();
        const CodeOfOrder = CreateCodeOrder(numberOfOrders);
        yield prisma.toBeAttended.create({
            data: {
                user,
                e_url: banco_1.default[user].Avatar,
                itemsToBeAttended: JSON.stringify(banco_1.default[user].items),
                paymentMethod: String(banco_1.default[user].paymentMethod).toString(),
                OrderNumber: CodeOfOrder,
            },
        });
        // console.log("terminou o salvamente Ok! INDO PARA O ESTAGIO 6");
        return (stages_1.default[6].obj.execute(user, ""));
    });
}
exports.execute = execute;
function CreateCodeOrder(x) {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, "0");
    var mes = String(data.getMonth() + 1).padStart(2, "0");
    var ano = data.getFullYear();
    return "Ped-" + dia + mes + x.toString();
} //CreateCodeOrder
//# sourceMappingURL=4.js.map