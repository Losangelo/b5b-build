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
exports.getStage = exports.Trading = void 0;
const banco_1 = __importDefault(require("../services/trading/models/banco"));
const stages_1 = __importDefault(require("../services/trading/models/stages"));
const paranaue_1 = require("../paranaue");
const color_1 = __importDefault(require("./color"));
// import { logger } from "./logger";
/*************************************************************************
 * FUNÇÕES DE INTERAÇÕES E FUNCIONALIDADES EXTRAS DO BOT
 * COMO NEGOCIAÇÕES, ETC
 */
/** **********************************************************************
 * NEGOCIAÇÕES
 * @param contatofrom
 * @param contatobody
 * @param contatoSenderName
 * @param e_urlImg
 */
function Trading(client, contatofrom, contatobody, contatoSenderName, e_urlImg) {
    return __awaiter(this, void 0, void 0, function* () {
        const StageID = yield getStage(client, contatofrom, e_urlImg);
        if (paranaue_1.isVerbose) {
            console.log(".:: Stage:", StageID);
            console.log(".:: Quem?", contatofrom);
            console.log(".:: Nível:", stages_1.default[StageID].description);
            console.log(".:: ====>", Object.values(stages_1.default));
        }
        let resp = stages_1.default[StageID].obj.execute(contatofrom, contatobody, contatoSenderName);
        console.log(".:: Situação: ", resp);
        // console.log(".:: Transormando o Obj em array----------");
        // console.log(Object.keys(db).map((key) => [String(key), db[key]]))
        // `Obrigado pela preferência.\nAguarde, seu pedido chegará em breve\nMais informações *envie /Menu*\n\n*Bot de Auto Atendimetno v.1.2.2* - modo demonstrativo do App)\n*Desenvolvido por Losangelo Pacífico <losangelo@gmail.com>*\n\nMais informações *envie /Menu*`
        // if (StageID === 5 ) {
        //   client.sendText(
        //     contatofrom,
        //     `Obrigado pela preferência. Aguarde, seu pedido chegará em breve.\n\nO número do seu Pedido é: *${db[contatofrom].CodeOfOrder}*\n\nMais informações ligue para nós!\nEnvie */Menu*\n\n*Robot de Auto Atendimento v.1.2.2*\n(Em Modo de Demonstrativo do Bot)\n*Desenvolvido por Losangelo Pacífico.\n<losangelo@gmail.com>*\n\n.:: Envie */Menu*`
        //   );
        // }
        for (let index = 0; index < resp.length; index++) {
            const element = resp[index];
            yield client.sendText(contatofrom, element);
        }
    });
} //Trading
exports.Trading = Trading;
/** *********************************************************************
 * FUNCAO: getState - auxiliar de Trading
 * @param contact
 * @param avatar
 * @returns states
 */
function getStage(client, contact, avatar) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`.:: Pessoas com o Cardapio ABERTO: `, banco_1.default);
        console.log(`.:: Usuario ( ${contact} ) acaba de solicitar o CARDAPIO.`);
        // console.log(".:: Pedidos  :", db);
        if (banco_1.default[contact]) {
            // console.log(":::::. Com os Itens: ", db[contact].items);
            console.log(`:::::. Estágio Atual é: ${banco_1.default[contact].stage} - ${stages_1.default[banco_1.default[contact].stage].description}`);
            if (banco_1.default[contact].stage === 5) {
                yield client.sendText(contact, ".:: Digite algo para ver o *Número do seu Pedido*");
            }
            if (banco_1.default[contact].stage === 6) {
                yield client.sendText(contact, `Obrigado pela preferência! Aguarde, seu pedido chegará em breve.\n\nO número do seu Pedido é: *${banco_1.default[contact].CodeOfOrder}*\n\nMais informações ligue para nós!\n.::Envie */Menu*\n\n......\n*Robot de Auto Atendimento\nv.1.2.2*\n(Em Modo de Demonstração do RoBot)\n*Desenvolvido por Losangelo Pacífico.\n<losangelo@gmail.com>*\n\n.:: Envie */Menu*`);
            }
            return banco_1.default[contact].stage;
        }
        else {
            //Se for a primeira vez que entra em contato
            banco_1.default[contact] = {
                stage: 0,
                items: [],
                Avatar: avatar,
            };
            console.log((0, color_1.default)(`:::::. Com os Itens:\n `, "lime"), (0, color_1.default)(`:::::. ${banco_1.default[contact].items}`, "yellow"), (0, color_1.default)(`:::::. Estágio começando em:`, "lime"), (0, color_1.default)(`${banco_1.default[contact].stage} - ${stages_1.default[banco_1.default[contact].stage].description}`, "yellow"));
            return banco_1.default[contact].stage;
        }
        // return "0"
    });
} //getStage - CARDAPIO
exports.getStage = getStage;
//# sourceMappingURL=trading.js.map