"use strict";
// import { MessageType, Contact } from '@adiwajshing/baileys'
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
const prisma = new client_1.PrismaClient();
/**
 * FUNCΓO DE ANUNCIOS AUTOMATICOS
 * γγγπ°π½ππ½π²πΈπ΄ π°πππΈγγγ
 * @param clientInstance, message, group
 * @returns
 */
module.exports = function advertiseHERE({ clientInstance, message, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const whoWas = message[0].key.participant; //pega o id de quem mandou 
            const myChatNow = message[0].key.remoteJid; //pega o id do chat de onde veio 
            const isGroup = message[0].key.remoteJid.includes('g.us');
            const announce = message[0].key.announce;
            const restrict = message[0].key.restrict;
            const nomeChat = message[0].key.name;
            // const testMode = false;
            const start = new Date().getTime();
            // console.log(color(`meu Chat: ${myChatNow}`, "yellow"));
            console.log("******************************************");
            console.log("******************************************");
            console.log(`Γ Grupo: ${isGroup}\nΓ Privado: ${announce}\nΓ Restrito a ADms: ${restrict}\nGrupo: ${whoWas}\nQuem: ${myChatNow}`);
            console.log("******************************************");
            console.log("******************************************");
            console.log(`O participante ${whoWas}, no grupo ${myChatNow}, que Γ© um grupo setado como privado: ${announce} somente adm altera ${restrict}.\n\n\n`);
            // let getGroups = await clientInstance.groupFetchAllParticipating();
            // let groups = Object.entries(getGroups).slice(0).map(entry => entry[1]);
            // console.log(color(`Mweu grupos ${groups}`,"yellow"));
            // if (isGroup && !announce && !restrict) {
            //   console.log(`Entrei em um grupo Publico`, "yellow")
            // if (allCampaignsInTheGroups) {
            //   const AutoPost = Math.floor(
            //     Math.random() * Object.keys(allCampaignsInTheGroups).length
            //   );
            //   if (isVerbose) {
            //     //criando as tag para totalizaΓ§Γ£o de entregas
            //     // console.log(`**********************`);
            //     logger.info(`βΆ AutoPost: ${AutoPost}`);
            //     // logger.info("tamanho: ", Object.keys(allCampaignsInTheGroups).length);
            //     // logger.info(
            //     //   "(2) allCampaignsInTheGroups: ",
            //     //   JSON.stringify(allCampaignsInTheGroups, null, 2) //dica de prettei
            //     // );
            //     console.log(color(`ππ°πΆ: ${allCampaignsInTheGroups[AutoPost].tag}`, "yellow"),
            //       color(`βββββΊgrupo >>>> ${nomeChat}`, "yellow"));
            //     // logger.info(`**********************`);
            //   }
            //   if (!campaignBalance[allCampaignsInTheGroups[AutoPost].tag]) {
            //     campaignBalance[allCampaignsInTheGroups[AutoPost].tag] = 0;
            //     if (allCampaignsInTheGroups[AutoPost].messageLink) {
            //       await clientInstance
            //         .sendLinkPreview(
            //           whoWas,
            //           allCampaignsInTheGroups[AutoPost].channelLink,
            //           allCampaignsInTheGroups[AutoPost].Post
            //         )
            //         .catch(async (erro) => {
            //           await clientInstance
            //             .sendText(whoWas, allCampaignsInTheGroups[AutoPost].Post)
            //             .catch((erro: any) => {
            //               logger.error(`Error when sending (l85): ${allCampaignsInTheGroups[AutoPost].messageLink}`, erro); //return object error
            //             });
            //           logger.info(
            //             "βββββΊUsando o sendText -  grupo >>>>",
            //             message.chat.name
            //           );
            //           logger.error("Error when sending:(l91) ", erro); //return object error
            //         });
            //       // const buttons = [
            //       //   {
            //       //     buttonText: {
            //       //       displayText: "Text of Button 1",
            //       //     },
            //       //   },
            //       //   {
            //       //     buttonText: {
            //       //       displayText: "Text of Button 2",
            //       //     },
            //       //   },
            //       // ];
            //     }
            //   }
            //   if (!InteractingGroup[whoWas]) {
            //     InteractingGroup[whoWas] = 1;
            //   } else {
            //     InteractingGroup[whoWas] += 1;
            //     if (
            //       InteractingGroup[whoWas] === 1 ||
            //       InteractingGroup[whoWas] === intervalOf
            //     ) {
            //       console.log(
            //         color(
            //           `\nβββββΊββπ΄π½ππΈπ°π½π³πΎ πΏπΎπππ°πΆπ΄πΌ π°πππΎπΌπ°ππΈπ²π° πΏπ°ππ° πΎ πΆπππΏπΎβββββββ\n*γγγ${whoWas} (${message.chat?.name}) \nInteraΓ§Γ£o n: ${InteractingGroup[whoWas]} de ${intervalOf}γγγ*`,
            //           "green"
            //         )
            //       );
            //       //SΓ³ envia na primeira vez que entrar no grupo
            //       if (!InteractingGroup[whoWas]) {
            //         await clientInstance
            //           .sendText(
            //             whoWas,
            //             "OlΓ‘ a todos! \nPostarei aqui minha propaganda, espero nΓ£o causar nenhum transtorno aos administradores e espero nΓ£o estar infringindo nenhuma regra do grupo!"
            //           )
            //           .catch((erro: any) => {
            //             logger.error("Error quando envia a primeira vez (l132): ", erro); //return object error
            //           });
            //       }
            //       try {
            //         console.log(
            //           color(
            //             `\n\nβββββΊββDados que serΓ£o enviados π°πππΎ πΏπΎππ\n`,
            //             "magenta"
            //           ),
            //           color(
            //             `.:. ππ°πΆ: ${allCampaignsInTheGroups[AutoPost].tag}\n`,
            //             "yellow"
            //           )
            //         );
            //         const channel = JSON.stringify(
            //           allCampaignsInTheGroups[AutoPost].channelLink
            //         );
            //         const post = allCampaignsInTheGroups[AutoPost].Post;
            //         try {
            //           // //Enviando o Link com o Posta padrΓ£o
            //           if (allCampaignsInTheGroups[AutoPost].ImageFilePath) {
            //             await clientInstance
            //               .sendImage(
            //                 whoWas,
            //                 allCampaignsInTheGroups[AutoPost].ImageFilePath,
            //                 allCampaignsInTheGroups[AutoPost].ImageFileName,
            //                 allCampaignsInTheGroups[AutoPost].Post
            //                 // allCampaignsInTheGroups[AutoPost].ImageCaption
            //               )
            //               .catch((erro: any) => {
            //                 logger.error("Error when sending: (l164) ", erro); //return object error
            //               });
            //           }
            //           // await data.client.sendFile(number, dir + name, 'Video', req.body.caption)
            //           //Enviado Doc, Pdf etc...
            //           if (allCampaignsInTheGroups[AutoPost].DocFilePath) {
            //             await clientInstance
            //               .sendFileFromBase64(
            //                 whoWas,
            //                 allCampaignsInTheGroups[AutoPost].DocFilePath,
            //                 allCampaignsInTheGroups[AutoPost].DocFileName,
            //                 allCampaignsInTheGroups[AutoPost].Post
            //                 // allCampaignsInTheGroups[AutoPost].DocCaption
            //               )
            //               .catch((erro) => {
            //                 logger.error("Error when sending: (l179) ", erro); //return object error
            //               });
            //           }
            //           // await clientInstance.sendLinkPreview(whoWas, channel, post);
            //           //"https://www.youtube.com/watch?v=V1bFr2SWP1I", -> festival de motos
            //           if (allCampaignsInTheGroups[AutoPost].messageLink) {
            //             await clientInstance
            //               .sendLinkPreview(
            //                 whoWas,
            //                 allCampaignsInTheGroups[AutoPost].channelLink,
            //                 allCampaignsInTheGroups[AutoPost].Post
            //               )
            //               .catch(async (erro) => {
            //                 await clientInstance.sendText(whoWas, post);
            //                 logger.info(
            //                   "βββββΊUsando o sendText -  grupo >>>>",
            //                   message.chat.name
            //                 );
            //                 logger.error("Error when sending: (l197)", erro); //return object error
            //               });
            //             // const buttons = [
            //             //   {
            //             //     buttonText: {
            //             //       displayText: "Text of Button 1",
            //             //     },
            //             //   },
            //             //   {
            //             //     buttonText: {
            //             //       displayText: "Text of Button 2",
            //             //     },
            //             //   },
            //             // ];
            //             // await clientInstance
            //             //   .sendButtons(
            //             //     message.from,
            //             //     "Venha para o prΓ³ximo nΓ­vel!",
            //             //     buttons,
            //             //     "VocΓͺ pode participar de um novo grupo, clicando no botΓ£o abaixo"
            //             //   )
            //             //   .then((result) => {
            //             //     console.log("Result: ", result); //return object success
            //             //   })
            //             //   .catch((erro) => {
            //             //     logger.error("Error when sending: ", erro); //return object error
            //             //   });
            //           }
            //           // //Enviando Audio se tiver no final de todas as outras.
            //           if (allCampaignsInTheGroups[AutoPost].AudioFilePath) {
            //             await clientInstance
            //               .sendVoice(
            //                 whoWas,
            //                 allCampaignsInTheGroups[AutoPost].AudioFilePath
            //               )
            //               .catch((erro: any) => {
            //                 logger.error("Error when sending: (l236)", erro); //return object error
            //               });
            //           }
            //           //Para saber Nome do grupo onde foi postado
            //         } catch (error) {
            //           logger.error("Error when sending: (l241)", error);
            //         }
            //         campaignBalance[allCampaignsInTheGroups[AutoPost].tag] += 1;
            //       } catch (err) {
            //         logger.error(
            //           `erro ao enviar mensagem (l246) ao grupo ${InteractingGroup[whoWas]} o erro foi : ${err}`
            //         );
            //       }
            //       InteractingGroup[whoWas] = 0;
            //       // InteractingGroup[whoWas] = 0;
            //       //TODO - Depois criar uma colection para armazenar os grupos naqual estΓ£o sendo postados e a quantidade de vezes que foi postado
            //       try {
            //         await prisma.$connect();
            //         const [campaignBalanceSave] = await prisma.$transaction([
            //           prisma.campaignBalance.upsert({
            //             where: {
            //               tag: allCampaignsInTheGroups[AutoPost].tag,
            //             },
            //             update: {
            //               Value: { increment: 1 }, //campaignBalance[allCampaignsInTheGroups[AutoPost].tag],
            //               lastGroup: message.chat.name,
            //             },
            //             create: {
            //               tag: allCampaignsInTheGroups[AutoPost].tag,
            //               Value:
            //                 campaignBalance[allCampaignsInTheGroups[AutoPost].tag],
            //             },
            //           }),
            //         ]);
            //       } catch (error) {
            //         logger.error(color(`[ERROR (l273)] ${error}`, "red"));
            //       } finally {
            //         await prisma.$disconnect();
            //       }
            //     }
            //     //sΓ³ para ganrantir que ficarΓ‘ zerado.
            //     if (InteractingGroup[whoWas] > intervalOf) {
            //       InteractingGroup[whoWas] = 0;
            //     }
            //   }
            //   if (isVerbose) {
            //     logger.info(`βββββΊββπΎπ πΆπππΏπΎπ π΄ πππ°π πΈπ½ππ΄ππ°π²πΎπ΄πβββββββ\n`);
            //     // logger.info(`**********************`);
            //     const object2 = Object.fromEntries(
            //       Object.entries(InteractingGroup).map(([key, val]) => [key, val])
            //     );
            //     logger.info(object2);
            //     logger.info(
            //       color(`**********************`, "yellow"),
            //       color(
            //         `Quantidade de grupos em movimento: ${Object.keys(InteractingGroup).length
            //         }`,
            //         "yellow"
            //       )
            //     );
            //     if (allCampaignsInTheGroups) {
            //       console.log(
            //         color(`\n\nβββββΊββ [bΜ²ΜΞ±Μ²ΜlΜ²ΜΞ±Μ²ΜΠΈΜ²ΜΓ§Μ²ΜΟΜ²Μ Μ²ΜdΜ²ΜΡΜ²Μ Μ²ΜcΜ²ΜΞ±Μ²ΜΠΌΜ²ΜΟΜ²ΜΞ±Μ²ΜΠΈΜ²ΜΠ½Μ²ΜΞ±Μ²Μ] βββββββ`, "magenta")
            //       );
            //       // const [error, result] = await to(
            //       await allCampaignsInTheGroups.map(
            //         async (gp: { tag: string | number }) => {
            //           if (campaignBalance[gp.tag]) {
            //             logger.info(
            //               color(`\n${gp.tag} .:. `, "cyan"),
            //               color(`${campaignBalance[gp.tag]}`, "yellow")
            //             );
            //           }
            //         }
            //       );
            //       // console.log(color(`**********************`, "yellow"));
            //     }
            //   } else {
            //     logger.info(
            //       color(`**********************`, "yellow"),
            //       color(`\n.::Quantidade de grupos em movimento:`, "yellow"),
            //       color(`${Object.keys(InteractingGroup).length}`, "yellow")
            //       // Object.keys(InteractingGroup).length
            //     );
            //     if (allCampaignsInTheGroups) {
            //       logger.info(
            //         color(`\n\nβββββΊββ [bΜ²ΜΞ±Μ²ΜlΜ²ΜΞ±Μ²ΜΠΈΜ²ΜΓ§Μ²ΜΟΜ²Μ Μ²ΜdΜ²ΜΡΜ²Μ Μ²ΜcΜ²ΜΞ±Μ²ΜΠΌΜ²ΜΟΜ²ΜΞ±Μ²ΜΠΈΜ²ΜΠ½Μ²ΜΞ±Μ²Μ] βββββββ`, "magenta")
            //       );
            //       // const [error, result] = await to(
            //       await allCampaignsInTheGroups.map(
            //         async (gp: { tag: string | number }) => {
            //           if (campaignBalance[gp.tag]) {
            //             logger.info(
            //               color(`\n${gp.tag} .:. `, "cyan"),
            //               color(`${campaignBalance[gp.tag]}`, "yellow")
            //             );
            //           }
            //         }
            //       );
            //       // color(`**********************`, "yellow");
            //     }
            //   }
            // } //if readonly
            // // }
            // if (InteractingGroup[whoWas] >= intervalOf) {
            //   InteractingGroup[whoWas] = 0;
            // }
            // } // *γγγFIM DO ANUNCIE AQUIγγγ*
            const elapsed = new Date().getTime() - start;
            const momento = new Date().toLocaleString();
            return logger.info(`\n----\nLevou ${elapsed}ms\nMomento ${momento}`);
        }
        catch (error) {
            return logger.error(`[ERROR (l364)] - advertiseHERE: grupos em Movimento, ${error}`);
        }
    });
};
