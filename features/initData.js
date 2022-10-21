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
exports.ReadCampaignsInTests = exports.ReadCampaignsInTheGroups = exports.isPreviewMode = exports.isVerbose = exports.allCampaignsInTests = exports.allCampaignsInTheGroups = exports.ReadContacts = exports.ReadCommands = exports.ReadTracedKey = exports.ReadMessages = exports.getAllGroupsList = exports.interact = exports.campaignBalance = exports.intervalOf = exports.InteractingGroup = exports.allReadTracedKey = exports.allMessagesBot = exports.myNotificationGroup = exports.myBotAdmin = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const toTryCatch_1 = __importDefault(require("./toTryCatch"));
exports.prisma = new client_1.PrismaClient();
//[1] iPhone(novo):......  "86 8169 8785"
//[2] Sansung pessoal:...  "55 86 8102 9183"
//[3] Sansung B% Estrelas: "55 86 8841 0678"
/**
 * Número do ADMINISTRADOR default do Bot. todos os grupos e verificações administrativas, são feitas por um bot-secundário rodando nesse número
 * (DEFAULT) iPhone: "86 8169 8785".
 * (pessoal) Sansung: "55 86 8102 9183".
 * (B5) Sansung: "55 86 8841 0678".
 * */
exports.myBotAdmin = "8681698785"; //[2]
/**
 * Todas as notivicações enviadas para ao Bot, devem ser rececidas pelo Grupo aqui definido.
 * (Default) Grupo de Convites ["120363023457019497@g.us]
 * */
exports.myNotificationGroup = "120363023457019497@g.us";
/**
 * lista das Mensagens predefinidas como respostas automáticas por quantidade de interações dos contatos com o Bot,
 * essas são definidas no DB, vai painel de controle do Admin.
 **/
exports.allMessagesBot = ReadMessages();
/**
 * Contem a lista das palavras-chaves (termos) do DB
 * */
exports.allReadTracedKey = ReadTracedKey();
//para as campanhas automaticas
//let interaction = 0;
/**
 * Armazena a Lista de Grupos interaginho no momento.
 */
exports.InteractingGroup = {};
/**
 * Fixa o intervalo na qual o Bot deve esperar para fazer usa postagem no grupo em questão.
 * (Default) Setado para 27 interações, ou seja, assim que os 27 últimos posts foram feitos por parte de outros participantes, o Bot deve fazer uma nova postagem de sua lista própria.
 **/
exports.intervalOf = 19;
/**
 * Saldo de Campanha.
 * Saber a quantidade em que cada campanha foi postada .
 * */
exports.campaignBalance = {};
/**
 * Função: Retorna a quantidade de interação que o contato fez com o Bot.
 */
function interact() {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = (yield exports.allMessagesBot).filter((register) => register.positionOrder);
        return interaction;
    });
}
exports.interact = interact;
/**
 * Função: Retorna a Lista dos grupos interagindo no momento.
 * @returns {Promise<void>}
 */
function getAllGroupsList() {
    return __awaiter(this, void 0, void 0, function* () {
        let allGroupList = yield exports.prisma.chatGroupsList.findMany();
        return allGroupList;
    });
} //getAllGroupsList
exports.getAllGroupsList = getAllGroupsList;
/** ler todas as mensagens ativas do db */
function ReadMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        let allMessagesBot = yield exports.prisma.messagesBot.findMany({
            where: {
                Active: "on",
                tracedKey: "off",
            },
        });
        // console.log(".:Mensagens Recuperadas da base :.", allMessagesBot);
        return allMessagesBot;
    });
} //ReadMessages
exports.ReadMessages = ReadMessages;
/** Função para ler todas as PALAVRAS CHAVE e TERMOS a serem Oberservados pelo bot. */
function ReadTracedKey() {
    return __awaiter(this, void 0, void 0, function* () {
        let allMessagesBot = yield exports.prisma.messagesBot.findMany({
            where: {
                Active: "on",
                tracedKey: "on",
            },
        });
        // console.log(".:PALAVRAS OBSERVADAS da base :.", allMessagesBot);
        return allMessagesBot;
    });
} //ReadTracedKey
exports.ReadTracedKey = ReadTracedKey;
/**
 * Função: Retorna a Lista de Comandos predefinidos no DB.
 * @param cmdFound
 * @returns
 */
function ReadCommands(cmdFound) {
    return __awaiter(this, void 0, void 0, function* () {
        let allCommands = yield exports.prisma.commands.findFirst({
            where: {
                command: cmdFound,
                Active: "on",
            },
        });
        // console.log(".:Commands Recuperadas da base :.", allCommands);
        return allCommands;
    });
} //ReadCommands
exports.ReadCommands = ReadCommands;
/** Função: Retorna todos que em algum momento entraram em contato diretamente com o Bot. Ex: chamadas para conversar no privado. */
function ReadContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        let allContatos = yield exports.prisma.whatsLeadContact.findMany({
            select: {
                serialized: true,
            },
        });
        // console.log(".:Todos os CONTATOS Recuperadas da base :.", allContatos);
        return allContatos;
    });
} //ReadContacts
exports.ReadContacts = ReadContacts;
/** Armazena todas as campanhas ativas no momento extraidas do Db */
exports.allCampaignsInTheGroups = [];
/** Armazena todas as campanhas em fase de TESTES, aindas não aprovadas no momento e extraidas do Db */
exports.allCampaignsInTests = [];
/** Variável para setar se exibe ou não os logs */
exports.isVerbose = false;
/**
 * Variável para setar se enviará uma cópia da postagem,
 * também para o grupo de convites (Modo demonstrativo das postagens)
 **/
exports.isPreviewMode = true;
/**
 * Inicializando as Campanhas ativas
 **/
function ReadCampaignsInTheGroups() {
    return __awaiter(this, void 0, void 0, function* () {
        const [error, result] = yield (0, toTryCatch_1.default)(exports.prisma.campaignsInTheGroups.findMany({
            where: {
                Active: "on",
                ActiveTestPost: "off",
            },
        }));
        if (error) {
            return console.log("Ocorreu um erro na Leitura dos dados ou o DB pode estar vázio.", error);
        }
        // allCampaignsInTheGroups = [];
        // var allGroupFound = [];
        let counter = 0;
        for (var grupo of result) {
            exports.allCampaignsInTheGroups[counter] = grupo;
            counter += 1;
            // console.log(grupo);
        }
        // console.log("(*)--------------------------------------\n", grupo);
        // console.log("░▒▓█►", JSON.stringify(allCampaignsInTheGroups));
        // console.log("❶ PreView >>", JSON.stringify(allCampaignsInTheGroups, null, 2));
        // console.log("❶(*)quantos grupos:", Object.keys(result).length);
        // console.log("❶(*)quantos props:", Object.keys(grupo).length);
        return result; //prettier
    });
} //Inicializando as Campanhas ativas
exports.ReadCampaignsInTheGroups = ReadCampaignsInTheGroups;
//TODO - ESTÁ SEM USO VERIFICAR  - Agora procura pelos testes para enviar para o Meus Test Group.
function ReadCampaignsInTests() {
    return __awaiter(this, void 0, void 0, function* () {
        const [error, result] = yield (0, toTryCatch_1.default)(exports.prisma.campaignsInTheGroups.findMany({
            where: {
                ActiveTestPost: "on",
            },
        }));
        if (error) {
            return console.log("Ocorreu um erro na Leitura dos dados ou o DB pode estar vázio.", error);
        }
        // allCampaignsInTests = [];
        // var allGroupFound = [];
        let counter = 0;
        for (var grupo of result) {
            exports.allCampaignsInTests[counter] = grupo;
            counter += 1;
            console.log(grupo);
        }
        return result; //prettier
    });
} //Agora procura pelos testes para enviar para o Meus Test Group.
exports.ReadCampaignsInTests = ReadCampaignsInTests;
// console.log(
//   "(*)quantos allCampaignsInTheGroups:",
//   Object.keys(allCampaignsInTheGroups).length
// );
// console.log(`░▒▓█►─═🅾🆂 🅶🆁🆄🅿🅾🆂 tentando vê-los\n`);
// console.log(`**********************`);
// const object2 = Object.fromEntries(
//   Object.entries(allCampaignsInTheGroups).map(([key, val]) => [key, val])
// );
// console.log(object2);
// console.log(
//   "Quantidade ENCONTRADOS:",
//   Object.keys(allCampaignsInTheGroups).length
// );
// console.dir(allCampaignsInTheGroups);
// console.log(`**********************`);
// async function getAllGroupsReadOnlyList() {
//   let allGroupList = await prisma.chatGroupsList.findMany({
//     where: {
//       isReadOnly: false,
//     },
//   });
//   return allGroupList;
// } //getAllGroupsReadOnlyList
// function startsWith(str: string | any[], word: any) {
//   return str.lastIndexOf(word, 0) === 0;
// }
// function endsWith(str: string | any[], word: any | any[]) {
//   return str.indexOf(word, str.length - word.length) !== -1;
// }
//lê as campanhas armazenadas no banco de dados
ReadCampaignsInTheGroups();
//# sourceMappingURL=initData.js.map