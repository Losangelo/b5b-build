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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// import color from "./color";
// import { logger } from "./logger";
const logger = require('pino')();
const initData_1 = require("./initData");
// import { Whatsapp } from "venom-bot";
// import { isVerbose } from "../paranaue";
const prisma = new client_1.PrismaClient();
/**
 * FUNCΓO DE ANUNCIOS AUTOMATICOS
 * γγγπ°π½ππ½π²πΈπ΄ π°πππΈγγγ
 * @param clientInstance, message, group
 * @returns
 *  { sendMessage: (arg0: any, arg1:
 *  { video?: any; caption?: any; gifPlayback?: boolean; text?: string; audio?: { url: any; }; mimetype?: string; }, arg2: { url: any; }) => any; }
 */
module.exports = function advertiseHERE(instance, message
//  { key: { remoteJid: string | string[]; participant: { announce: any; restrict: any; }; }; pushName: any; }
) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // console.log(`\n>>>>>>>>>>>>>>>>>>>>>>.\n${JSON.stringify(message, undefined, ' ')}\n<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
            let whoWas = message.key.remoteJid; //pega o id do chat de onde veio
            let myChatNow = message.key.participant; //pega o id de quem mandou 
            let isGroup = message.key.remoteJid.includes('g.us');
            let announce = message.key.participant.announce;
            let restrict = message.key.participant.restrict;
            let nomeChat = message.key.participant.pushName;
            let AutoPost = undefined;
            // const messageTypeKey = message.messageStubParameters  
            // console.log(`>>>>>> KEYYYY <<<<<<<\n ${myChatNow.GroupMetadata.}\n<<<<<<<<<<<<<>>>>>>>>>>>>>>>`)
            // console.log(`>>>>>> KEYYYY <<<<<<<\n ${messageTypePart[0].name}\n<<<<<<<<<<<<<>>>>>>>>>>>>>>>`)
            // const testMode = false;
            // console.log( `meu Chat: ${myChatNow}`, "yellow"));
            const start = new Date().getTime();
            console.log("\n******************************************");
            console.log(`\nΓ Grupo: ${isGroup}\nΓ Privado: ${announce}\nΓ Restrito a ADms: ${restrict}\nGrupo: ${whoWas}\nNome do grupo: ${nomeChat}\nQuem: ${myChatNow}`);
            console.log("\n******************************************");
            // console.log(`O participante ${whoWas}, no grupo ${myChatNow}, que Γ© um grupo setado como privado: ${announce} somente adm altera ${restrict}.\n\n\n`)
            // let getGroups = await clientInstance.groupFetchAllParticipating();
            // let groups = Object.entries(getGroups).slice(0).map(entry => entry[1]);
            // console.log( `Mweu grupos ${groups}`,"yellow"));
            if (isGroup) {
                // console.log(`Entrei em um grupo Publico`, "yellow")
                if (initData_1.allCampaignsInTheGroups) {
                    AutoPost = Math.floor(Math.random() * Object.keys(initData_1.allCampaignsInTheGroups).length);
                    if (initData_1.isVerbose) {
                        //criando as tag para totalizaΓ§Γ£o de entregas
                        // console.log(`**********************`);
                        logger.info(`βΆ AutoPost: ${AutoPost}`);
                        logger.info(`ππ°πΆ: ${initData_1.allCampaignsInTheGroups[AutoPost].tag} βββββΊgrupo >>>> ${nomeChat}`);
                        // logger.info("tamanho: ", Object.keys(allCampaignsInTheGroups).length);
                        // logger.info(
                        //   "(2) allCampaignsInTheGroups: ",
                        //   JSON.stringify(allCampaignsInTheGroups, null, 2) //dica de prettei
                        // );
                        // logger.info(`**********************`);
                    }
                    if (!initData_1.campaignBalance[initData_1.allCampaignsInTheGroups[AutoPost].tag]) {
                        initData_1.campaignBalance[initData_1.allCampaignsInTheGroups[AutoPost].tag] = 0;
                        if (initData_1.allCampaignsInTheGroups[AutoPost].messageLink) {
                            logger.info(`<<<>>>> Vou enviar o PostText`, "yellow");
                            // send a link
                            yield server.WhatsAppInstances[instance].sendMessage(myChatNow, { text: `${initData_1.allCampaignsInTheGroups[AutoPost].Post} ${initData_1.allCampaignsInTheGroups[AutoPost].channelLink}` });
                            // await clientInstance
                            //   .sendLinkPreview(
                            //     whoWas,
                            //     allCampaignsInTheGroups[AutoPost].channelLink,
                            //     allCampaignsInTheGroups[AutoPost].Post
                            //   )
                            //   .catch(async (erro) => {
                            //     await clientInstance
                            //       .sendText(whoWas, allCampaignsInTheGroups[AutoPost].Post)
                            //       .catch((erro: any) => {
                            //         logger.error(`Error when sending (l85): ${allCampaignsInTheGroups[AutoPost].messageLink}`, erro); //return object error
                            //       });
                            //     logger.info(
                            //       "βββββΊUsando o sendText -  grupo >>>>",
                            //       message.chat.name
                            //     );
                            //     logger.error("Error when sending:(l91) ", erro); //return object error
                        }
                        ;
                    }
                }
                if (!initData_1.InteractingGroup[myChatNow]) {
                    initData_1.InteractingGroup[myChatNow] = 1;
                }
                else {
                    initData_1.InteractingGroup[myChatNow] += 1;
                    if (initData_1.InteractingGroup[myChatNow] === 1 ||
                        initData_1.InteractingGroup[myChatNow] === initData_1.intervalOf) {
                        logger.info(`\nβββββΊββπ΄π½ππΈπ°π½π³πΎ πΏπΎπππ°πΆπ΄πΌ π°πππΎπΌπ°ππΈπ²π° πΏπ°ππ° πΎ πΆπππΏπΎβββββββ\n*γγγ${myChatNow} - ${nomeChat}\nInteraΓ§Γ£o n: ${initData_1.InteractingGroup[myChatNow]} de ${initData_1.intervalOf}γγγ*`);
                    }
                    ;
                    //SΓ³ envia na primeira vez que entrar no grupo        
                    if (!initData_1.InteractingGroup[myChatNow]) {
                        yield instance.sendMessage(myChatNow, { text: "OlΓ‘ a todos! \nPostarei aqui, espero nΓ£o causar nenhum transtorno e espero nΓ£o estar infringindo nenhuma regra do grupo!" });
                        // await clientInstance
                        //   .sendText(
                        // myChatNow,
                        logger.info("OlΓ‘ a todos! \nPostarei aqui minha propaganda, espero nΓ£o causar nenhum transtorno aos administradores e espero nΓ£o estar infringindo nenhuma regra do grupo!");
                        // )
                        // .catch((erro: any) => {
                        //   logger.error("Error quando envia a primeira vez (l132): ", erro); //return object error
                        // });
                    }
                    try {
                        logger.info(`\n\nβββββΊββDados que serΓ£o enviados π°πππΎ πΏπΎππ\n.:. ππ°πΆ: ${initData_1.allCampaignsInTheGroups[AutoPost].tag}\n`);
                        const channel = JSON.stringify(initData_1.allCampaignsInTheGroups[AutoPost].channelLink);
                        const post = initData_1.allCampaignsInTheGroups[AutoPost].Post;
                        try {
                            // //Enviando o Link com o Posta padrΓ£o
                            if (initData_1.allCampaignsInTheGroups[AutoPost].ImageFilePath) {
                                logger.info("<<>> enviando link padrao via sendeIMAGE");
                                // localhost: 3333 / message / text ? key = bot
                                yield server.WhatsAppInstances[instance]..sendMessage(myChatNow, { video: initData_1.allCampaignsInTheGroups[AutoPost].ImageFilePath, caption: initData_1.allCampaignsInTheGroups[AutoPost].Post, gifPlayback: true });
                                // await clientInstance
                                //   .sendImage(
                                //     whoWas,
                                //     allCampaignsInTheGroups[AutoPost].ImageFilePath,
                                //     allCampaignsInTheGroups[AutoPost].ImageFileName,
                                //     allCampaignsInTheGroups[AutoPost].Post
                                //     // allCampaignsInTheGroups[AutoPost].ImageCaption
                                //   )
                                //   .catch((erro: any) => {
                                //     logger.error("Error when sending: (l164) ", erro); //return object error
                                //   });
                            }
                            // await data.client.sendFile(number, dir + name, 'Video', req.body.caption)
                            //Enviado Doc, Pdf etc...
                            if (initData_1.allCampaignsInTheGroups[AutoPost].DocFilePath) {
                                console.log("<<>> Enviando via send File From Base64");
                                // await clientInstance
                                //   .sendFileFromBase64(
                                //     whoWas,
                                //     allCampaignsInTheGroups[AutoPost].DocFilePath,
                                //     allCampaignsInTheGroups[AutoPost].DocFileName,
                                //     allCampaignsInTheGroups[AutoPost].Post
                                //     // allCampaignsInTheGroups[AutoPost].DocCaption
                                //   )
                                //   .catch((erro) => {
                                //     logger.error("Error when sending: (l179) ", erro); //return object error
                                //   });
                            }
                            // await clientInstance.sendLinkPreview(whoWas, channel, post);
                            //"https://www.youtube.com/watch?v=V1bFr2SWP1I", -> festival de motos
                            if (initData_1.allCampaignsInTheGroups[AutoPost].messageLink) {
                                logger.info("<<>> Enviando via send preview");
                                yield server.WhatsAppInstances[instance]..sendMessage(myChatNow, { text: `${initData_1.allCampaignsInTheGroups[AutoPost].Post} ${initData_1.allCampaignsInTheGroups[AutoPost].channelLink}` });
                                // await clientInstance
                                //   .sendLinkPreview(
                                //     whoWas,
                                //     allCampaignsInTheGroups[AutoPost].channelLink,
                                //     allCampaignsInTheGroups[AutoPost].Post
                                //   )
                                //   .catch(async (erro) => {
                                //     await clientInstance.sendText(whoWas, post);
                                //     logger.info(
                                //       "βββββΊUsando o sendText -  grupo >>>>",
                                //       message.chat.name
                                //     );
                                //     logger.error("Error when sending: (l197)", erro); //return object error
                                //   });
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
                                //     "Venha para o prΓ³ximo nΓ­vel!",
                                //     buttons,
                                //     "VocΓͺ pode participar de um novo grupo, clicando no botΓ£o abaixo"
                                //   )
                                //   .then((result) => {
                                //     console.log("Result: ", result); //return object success
                                //   })
                                //   .catch((erro) => {
                                //     logger.error("Error when sending: ", erro); //return object error
                                //   });
                            }
                            // //Enviando Audio se tiver no final de todas as outras.
                            if (initData_1.allCampaignsInTheGroups[AutoPost].AudioFilePath) {
                                console.log("<<>> Enviando via send Voice");
                                yield server.WhatsAppInstances[instance].sendMessage(myChatNow, { audio: { url: initData_1.allCampaignsInTheGroups[AutoPost].AudioFilePath }, mimetype: 'audio/mp4' }, { url: initData_1.allCampaignsInTheGroups[AutoPost].AudioFilePath });
                                // await clientInstance
                                //   .sendVoice(
                                //     whoWas,
                                //     allCampaignsInTheGroups[AutoPost].AudioFilePath
                                //   )
                                //   .catch((erro: any) => {
                                //     logger.error("Error when sending: (l236)", erro); //return object error
                                //   });
                            }
                            //Para saber Nome do grupo onde foi postado
                        }
                        catch (error) {
                            logger.error("Error when sending: (l241)", error);
                        }
                        initData_1.campaignBalance[initData_1.allCampaignsInTheGroups[AutoPost].tag] += 1;
                    }
                    catch (err) {
                        logger.error(`erro ao enviar mensagem (l246) ao grupo ${initData_1.InteractingGroup[myChatNow]} o erro foi : ${err}`);
                    }
                    initData_1.InteractingGroup[myChatNow] = 0;
                    // InteractingGroup[myChatNow] = 0;
                    // TODO - Depois criar uma colection para armazenar os grupos naqual estΓ£o sendo postados e a quantidade de vezes que foi postado
                    try {
                        yield prisma.$connect();
                        const [campaignBalanceSave] = yield prisma.$transaction([
                            prisma.campaignBalance.upsert({
                                where: {
                                    tag: initData_1.allCampaignsInTheGroups[AutoPost].tag,
                                },
                                update: {
                                    Value: { increment: 1 },
                                    lastGroup: nomeChat,
                                },
                                create: {
                                    tag: initData_1.allCampaignsInTheGroups[AutoPost].tag,
                                    Value: initData_1.campaignBalance[initData_1.allCampaignsInTheGroups[AutoPost].tag],
                                },
                            }),
                        ]);
                    }
                    catch (error) {
                        logger.error(`[ERROR (l273)] ${error}`);
                    }
                    finally {
                        yield prisma.$disconnect();
                    }
                }
                //sΓ³ para ganrantir que ficarΓ‘ zerado.
                if (initData_1.InteractingGroup[myChatNow] > initData_1.intervalOf) {
                    initData_1.InteractingGroup[myChatNow] = 0;
                }
            }
            if (initData_1.isVerbose) {
                logger.info(`βββββΊββπΎπ πΆπππΏπΎπ π΄ πππ°π πΈπ½ππ΄ππ°π²πΎπ΄πβββββββ\n`);
                // logger.info(`**********************`);
                const object2 = Object.fromEntries(Object.entries(initData_1.InteractingGroup).map(([key, val]) => [key, val]));
                logger.info(object2);
                logger.info(`**********************Quantidade de grupos em movimento: ${Object.keys(initData_1.InteractingGroup).length}`);
                if (initData_1.allCampaignsInTheGroups) {
                    console.log(`\n\nβββββΊββ [bΜ²ΜΞ±Μ²ΜlΜ²ΜΞ±Μ²ΜΠΈΜ²ΜΓ§Μ²ΜΟΜ²Μ Μ²ΜdΜ²ΜΡΜ²Μ Μ²ΜcΜ²ΜΞ±Μ²ΜΠΌΜ²ΜΟΜ²ΜΞ±Μ²ΜΠΈΜ²ΜΠ½Μ²ΜΞ±Μ²Μ] βββββββ`);
                    // const [error, result] = await to(
                    yield initData_1.allCampaignsInTheGroups.map((gp) => __awaiter(this, void 0, void 0, function* () {
                        if (initData_1.campaignBalance[gp.tag]) {
                            logger.info(`\n${gp.tag} .:. ${initData_1.campaignBalance[gp.tag]}`);
                        }
                    }));
                    // console.log( `**********************`, "yellow"));
                }
            }
            else {
                logger.info(`**********************\n.::Quantidade de grupos em movimento:${Object.keys(initData_1.InteractingGroup).length}`
                // Object.keys(InteractingGroup).length
                );
                if (initData_1.allCampaignsInTheGroups) {
                    logger.info(`\n\nβββββΊββ [bΜ²ΜΞ±Μ²ΜlΜ²ΜΞ±Μ²ΜΠΈΜ²ΜΓ§Μ²ΜΟΜ²Μ Μ²ΜdΜ²ΜΡΜ²Μ Μ²ΜcΜ²ΜΞ±Μ²ΜΠΌΜ²ΜΟΜ²ΜΞ±Μ²ΜΠΈΜ²ΜΠ½Μ²ΜΞ±Μ²Μ] βββββββ`);
                    // const [error, result] = await to(
                    yield initData_1.allCampaignsInTheGroups.map((gp) => __awaiter(this, void 0, void 0, function* () {
                        if (initData_1.campaignBalance[gp.tag]) {
                            logger.info(`\n${gp.tag} .:. ${initData_1.campaignBalance[gp.tag]}`);
                        }
                    }));
                    //  `**********************`, "yellow");
                }
            }
            // })//if readonly
            // }
            if (initData_1.InteractingGroup[myChatNow] >= initData_1.intervalOf) {
                initData_1.InteractingGroup[myChatNow] = 0;
            }
            // } // *γγγFIM DO ANUNCIE AQUIγγγ*
            const elapsed = new Date().getTime() - start;
            const momento = new Date().toLocaleString();
            logger.info(`\n----\nLevou ${elapsed}ms\nMomento ${momento}`);
        }));
    });
};
