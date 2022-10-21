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
exports.advertiseInChatId = void 0;
const lib_prisma_1 = __importDefault(require("../hooks/lib.prisma"));
const color_1 = __importDefault(require("./color"));
const logger_1 = require("./logger");
const initData_1 = require("./initData");
const sleep_1 = require("./sleep");
/** *********************************************************************
 * Postando mensagens em grupos especificos
 * Rotina: para forsar a postagem de mensagens em grupos especificos
 * 》》》🅰🅽🆄🅽🅲🅸🅴 🅰🆀🆄🅸 no ChatX《《《
 */
function advertiseInChatId(clientInstance, message, Chat, ChatName) {
    return __awaiter(this, void 0, void 0, function* () {
        // const prisma = new PrismaClient();
        try {
            const whoWas = Chat;
            const start = new Date().getTime();
            const AutoPost = Math.floor(Math.random() * Object.keys(initData_1.allCampaignsInTheGroups).length);
            if (!initData_1.campaignBalance[initData_1.allCampaignsInTheGroups[AutoPost].tag]) {
                initData_1.campaignBalance[initData_1.allCampaignsInTheGroups[AutoPost].tag] = 0;
                if (initData_1.allCampaignsInTheGroups[AutoPost].messageLink) {
                    yield clientInstance
                        .sendLinkPreview(whoWas, initData_1.allCampaignsInTheGroups[AutoPost].channelLink, initData_1.allCampaignsInTheGroups[AutoPost].Post)
                        .catch((error) => __awaiter(this, void 0, void 0, function* () {
                        yield clientInstance.sendText(whoWas, initData_1.allCampaignsInTheGroups[AutoPost].Post);
                        console.log((0, color_1.default)(`░▒▓█►usando o sendText - grupo >>>> ${message.chat.name}\n${error}`, "red"));
                    }));
                }
            }
            // console.log(
            //   color(
            //     `\n░▒▓█►─═🅴🅽🆅🅸🅰🅽🅳🅾 🅿🅾🆂🆃🅰🅶🅴🅼 🅰🆄🆃🅾🅼🅰🆃🅸🅲🅰 🅿🅰🆁🅰 🅾 🅶🆁🆄🅿🅾═─◄█▓▒░*》》》${whoWas} (${message.chat.name})《《《*`,
            //     "green"
            //   )
            // );
            // await clientInstance.sendText(
            //  whoWas,
            //   "Olá a todos! \nPostarei aqui minha propaganda, espero não causar nenhum transtorno aos administradores e espero não estar infringindo nenhuma regra do grupo!"
            // );
            try {
                console.log((0, color_1.default)(`\n.:. 🅖🅡🅤🅟🅞: ${whoWas} - ${ChatName}`, "lime"), (0, color_1.default)(`\n.:. 🆃🅰🅶: ${initData_1.allCampaignsInTheGroups[AutoPost].tag}\n`, "yellow"));
                const channel = JSON.stringify(initData_1.allCampaignsInTheGroups[AutoPost].channelLink);
                const post = initData_1.allCampaignsInTheGroups[AutoPost].Post;
                try {
                    // //Enviando o Link com o Posta padrão
                    if (initData_1.allCampaignsInTheGroups[AutoPost].ImageFilePath) {
                        yield clientInstance.sendImage(whoWas, initData_1.allCampaignsInTheGroups[AutoPost].ImageFilePath, initData_1.allCampaignsInTheGroups[AutoPost].ImageFileName, initData_1.allCampaignsInTheGroups[AutoPost].Post
                        // allCampaignsInTheGroups[AutoPost].ImageCaption
                        );
                    }
                    // await data.client.sendFile(number, dir + name, 'Video', req.body.caption)
                    //Enviado Doc, Pdf etc...
                    if (initData_1.allCampaignsInTheGroups[AutoPost].DocFilePath) {
                        yield clientInstance
                            .sendFileFromBase64(whoWas, initData_1.allCampaignsInTheGroups[AutoPost].DocFilePath, initData_1.allCampaignsInTheGroups[AutoPost].DocFileName, initData_1.allCampaignsInTheGroups[AutoPost].Post
                        // allCampaignsInTheGroups[AutoPost].DocCaption
                        )
                            .catch((erro) => {
                            logger_1.logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                            // logger.error("Error no envio de Ducumento: ", erro); //return object error
                        });
                    }
                    // await clientInstance.sendLinkPreview(whoWas, channel, post);
                    //"https://www.youtube.com/watch?v=V1bFr2SWP1I", -> festival de motos
                    if (initData_1.allCampaignsInTheGroups[AutoPost].messageLink) {
                        yield clientInstance
                            .sendLinkPreview(whoWas, initData_1.allCampaignsInTheGroups[AutoPost].channelLink, initData_1.allCampaignsInTheGroups[AutoPost].Post)
                            .catch((erro) => __awaiter(this, void 0, void 0, function* () {
                            yield clientInstance.sendText(whoWas, post);
                        }));
                        // const buttons = [
                        //   {
                        //     buttonText: {
                        //       displayText: "Text of Button 1",
                        //     },
                        //   },
                        //   {
                        //     buttonText: {
                        //       displayText: "Text of Button 2",
                        //     },
                        //   },
                        // ];
                        // await clientInstance
                        //   .sendButtons(
                        //     message.from,
                        //     "Venha para o próximo nível!",
                        //     buttons,
                        //     "Você pode participar de um novo grupo, clicando no botão abaixo"
                        //   )
                        //   .then((result) => {
                        //     console.log("Result: ", result); //return object success
                        //   })
                        //   .catch((erro) => {
                        //     logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                        //   });
                    }
                    // //Enviando Audio se tiver no final de todas as outras.
                    if (initData_1.allCampaignsInTheGroups[AutoPost].AudioFilePath) {
                        yield clientInstance
                            .sendVoice(whoWas, initData_1.allCampaignsInTheGroups[AutoPost].AudioFilePath)
                            .catch((erro) => {
                            logger_1.logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                        });
                    }
                    //Para saber Nome do grupo onde foi postado
                }
                catch (error) {
                    logger_1.logger.error((0, color_1.default)(JSON.stringify(error, null, ' '), "red")); //Erro aqui.... [Erro AQUI, VEJA!!!]\n
                }
                initData_1.campaignBalance[initData_1.allCampaignsInTheGroups[AutoPost].tag] += 1;
            }
            catch (err) {
                console.log((0, color_1.default)(`[ERRO ao enviar mensagem ao grupo `, "lime"), (0, color_1.default)(`${initData_1.InteractingGroup[whoWas]} `, "yellow"), (0, color_1.default)(`o erro foi:/n`, "lime"), (0, color_1.default)(`${err}`, "red"));
            }
            initData_1.InteractingGroup[whoWas] = 0;
            // InteractingGroup[whoWas] = 0;
            //TODO - Depois criar uma colection para armazenar os grupos naqual estão sendo postados e a quantidade de vezes que foi postado
            try {
                // await prisma.$connect();
                // let [campaignBalanceSave] =
                const AutoSleep = Math.floor(Math.random() * 3000 + 1000);
                lib_prisma_1.default.$transaction([
                    lib_prisma_1.default.campaignBalance.upsert({
                        where: {
                            tag: initData_1.allCampaignsInTheGroups[AutoPost].tag,
                        },
                        update: {
                            Value: { increment: 1 },
                            lastGroup: message.chat.name,
                        },
                        create: {
                            tag: initData_1.allCampaignsInTheGroups[AutoPost].tag,
                            Value: initData_1.campaignBalance[initData_1.allCampaignsInTheGroups[AutoPost].tag],
                        },
                    }),
                ]);
                yield (0, sleep_1.sleep)(AutoSleep);
            }
            catch (error) {
                console.log((0, color_1.default)(`[ERROR] ${error}`, "red"));
            }
            finally {
                yield lib_prisma_1.default.$disconnect();
            }
            const elapsed = new Date().getTime() - start;
            const momento = new Date().toLocaleString();
            console.log((0, color_1.default)(`\n---`, "crimson"), (0, color_1.default)(`\nLevou ${elapsed}ms`, "yellow"), (0, color_1.default)(`\nMomento ${momento}`, "lime"));
        }
        catch (error) {
            console.log((0, color_1.default)(`[ERROR - advertiseInChatId: grupos especificos] ${error}`, "red"));
        }
    });
} //advertiseInChatId - grupos especificos
exports.advertiseInChatId = advertiseInChatId;
//# sourceMappingURL=advetiseInChatId.js.map