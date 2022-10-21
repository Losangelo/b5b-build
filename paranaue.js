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
exports.B5Main = exports.numberOfCycles = exports.cycle = exports.isVerbose = void 0;
const lib_prisma_1 = __importDefault(require("./hooks/lib.prisma"));
const banco_1 = __importDefault(require("./services/trading/models/banco"));
// import step from "./services/trading/models/stages";
const fs_extra_1 = __importDefault(require("fs-extra"));
const color_1 = __importDefault(require("./features/color"));
const logger_1 = require("./features/logger");
const initData_1 = require("./features/initData");
// import { Client } from "socket.io/dist/client";
const sleep_1 = require("./features/sleep");
const advetiseInChatId_1 = require("./features/advetiseInChatId");
const trading_1 = require("./features/trading");
const B5VersionCheck_1 = require("./features/B5VersionCheck");
const placard_1 = __importDefault(require("./features/placard"));
// const prisma = new PrismaClient();
//
/** Variável para setar se exibe ou não os logs */
exports.isVerbose = false;
/** Define a quantidade de lopp que o app vai fazer para exibir o balanço e suas infos */
exports.cycle = 20;
/** Contador para interagir com cycle */
exports.numberOfCycles = 0;
(0, B5VersionCheck_1.B5VersionCheck)();
/**
 * Todo o processamento das ações aqui em: B5Main()
 * @alpha
 * @param {client} Whatsapp
 * @returns {Promise<void>}
 **/
function B5Main(client) {
    return __awaiter(this, void 0, void 0, function* () {
        // // Forçar recarregamento caso obtenha erros
        // await client.onStateChange(async (state) => {
        //   logger.info(
        //     color("[RELOAD]", "red"),
        //     color("Isso pode ser ignorado →", "lime"),
        //     color(state, "yellow")
        //   );
        //   if (
        //     state === "UNPAIRED" ||
        //     state === "CONFLICT" ||
        //     state === "UNLAUNCHED"
        //   ) {
        //     logger.info(color("[REINICIANDO O BOT]", "yellow"));
        //     client.restartService();
        //   }
        // });
        // await client.onIncomingCall(async (callData) => {
        //   let eChat = await client.getContact(callData);
        //   let pushname =
        //     eChat?.pushname ||
        //     eChat?.name ||
        //     eChat?.verifiedName ||
        //     eChat?.formattedName;
        //   logger.info(
        //     color("[CALL]", "red"),
        //     color(`${callData.peerJid.replace("@c.us", "")} me ligou...`, "yellow")
        //   );
        //   try {
        //     await client
        //       .sendText(
        //         callData.peerJid,
        //         `Não posso te atender no momento!!!\n\nMe envie um zap, que verei como te ajudar!\n\nSe for por mais informações sobre o bot, basta enviar a palavra *botb5*!\n\n---\nⓂⓔⓝⓢⓐⓖⓔⓜ ⓐⓤⓣⓞⓜⓐⓣⓘⓒⓐ\n❺ 🅔🅢🅣🅡🅔🅛🅐🅢`
        //       )
        //       .catch((erro: any) => {
        //         logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
        //       });
        //     /**
        //      * Link de convite: chat.whatsapp.com/KUfPL1fIkdLBmliP8CpqU4
        //      * Grupo: Divulgando em Teresina B5Main
        //      */
        //     await client
        //       .sendText(
        //         callData.peerJid,
        //         `E se ainda não fizer parte de um dos nossos grupos, te convido a fazer!\n\nhttps://chat.whatsapp.com/KUfPL1fIkdLBmliP8CpqU4---\nⓂⓔⓝⓢⓐⓖⓔⓜ ⓐⓤⓣⓞⓜⓐⓣⓘⓒⓐ\n❺ 🅔🅢🅣🅡🅔🅛🅐🅢`
        //       )
        //       .catch((erro: any) => {
        //         logger.error(erro);
        //       });
        //     await client
        //       .sendText(
        //         myNotificationGroup,
        //         `${pushname} - ${callData.peerJid} Te ligou !\n\n---\nⓂⓔⓝⓢⓐⓖⓔⓜ ⓐⓤⓣⓞⓜⓐⓣⓘⓒⓐ\n❺ 🅔🅢🅣🅡🅔🅛🅐🅢`
        //       )
        //       .catch((erro: any) => {
        //         logger.error(erro);
        //       });
        //   } catch {
        //     logger.info(color(`[ERRO]-[INCOMING CALL]`, "red"));
        //   }
        // });
        // // Bloqueia na call
        // client.onIncomingCall(async (callData) => {
        // 	try {
        // 		await client.sendText(callData.peerJid, mylang(config.Language).blockcalls())
        // 	} catch { await client.contactBlock(callData.peerJid) }
        // 	logger.info(color('[CALL]', 'red'), color(`${callData.peerJid.replace('@c.us', '')} foi bloqueado por me ligar...`, 'yellow'))
        // })
        let allInteractions = yield (0, initData_1.interact)();
        // let allCommands = ReadCommands("all");
        /** última expressão enviada dos contatos */
        let previousExpression = "";
        yield client
            .onMessage((message) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            /** Expressão atual recebida dos contatos */
            const expr = String(message.body).toUpperCase().trim();
            /** Se a expressão for igual é porque foi enviada repetida */
            if (expr === previousExpression) {
                previousExpression = expr;
                return;
            }
            else {
                previousExpression = expr;
            }
            if (!initData_1.allMessagesBot)
                return;
            //Identificando o Profile e o Usuario
            let usuario = String(message.sender.id).split("@")[0];
            let usuarioSender = String(message.sender.id);
            let Contato = yield client.getContact(message.from);
            let quemFoi = yield client.getContact(message.sender.id);
            /** Testando se foi digitado algum comando interno do Bot */
            switch (expr) {
                /**
               * @groups CMD_GROUP
               * @category General Use
               * cmd: /ISVERBOSE
               * COMANDO FIXO PARA USO DO dev view console
               */
                case "!!ISVERBOSE":
                    {
                        exports.isVerbose = !exports.isVerbose;
                    }
                    break;
                /**
                * Palavra Chave: botb5 - Caso o usuário digita a palavra chave, o bot responde com a mensagem de boas vindas
                */
                case "!!BOTB5":
                    {
                        (0, placard_1.default)("!!BotB5");
                        // logger.info(`\n.:: ░▒▓█►PALAVRA *BotB5* detectada◄█▓▒░] ::.`);
                        yield client
                            .sendText(initData_1.myNotificationGroup, `░▒▓█► ${((_a = message.chat) === null || _a === void 0 ? void 0 : _a.name) || message.sender.id} ◄█▓▒░\n.:: Digitou a palavra chave *BOTB5* - ENTRE EM CONTATO]::.`)
                            .catch((erro) => {
                            logger_1.logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                        });
                    } //botb5
                    break;
                /**
                 * TODO - Totalizar os retornos do UpdateDB
                 * e exibir ao solicitante, além da mensagem de atualizado.
                 */
                case "!!UPDATEDB": {
                    (0, placard_1.default)("!!Updatedb");
                    let allMessagesBot = (0, initData_1.ReadMessages)();
                    let allReadTracedKey = (0, initData_1.ReadTracedKey)();
                    let allCampaignsInTheGroups = (0, initData_1.ReadCampaignsInTheGroups)();
                    allInteractions = yield (0, initData_1.interact)();
                    yield client.sendText(message.from, "O banco foi atualizado...");
                    // logger.info(
                    //   color(`::::::::::::::::::::::::::::::::::::::::::`, "yellow"),
                    //   color(`::. 》》》A base foi atualizada...《《《 .::`, "yellow"),
                    //   color(`::::::::::::::::::::::::::::::::::::::::::`, "yellow")
                    // );
                    break;
                }
                case "!!CARDAPIO":
                case "!!CARDÁPIO":
                    {
                        (0, placard_1.default)("!!Cardapio");
                        // logger.info("::::::::::::::::::::::::::::::::::::::::::::::");
                        // logger.info("::. 》》》ROTINA DE NEGOCIAÇÃO ATIVADA 《《《.::");
                        // logger.info("::::::::::::::::::::::::::::::::::::::::::::::");
                        (0, trading_1.Trading)(client, message.from, message.body, message.sender.name, Contato.profilePicThumbObj.eurl);
                    } // Cardapio Solicitado mudei parao case switch
                    break;
                /**
                * TODO - REFATORAR ESSE CÓDIGO
                * /gestor, está fixo, pensar em dinamizar o código
                */
                case "!!GESTOR":
                    {
                        (0, placard_1.default)("!!Gestor");
                        console.log((0, color_1.default)(`\nLista de Comandos Internos do Bot solicitados!`, "yellow"));
                        yield client
                            .sendText(message.from, `
                .:: Caro Gestor ::.\n
                Você pode usar os comandos privados abaixo:\n\n
                ঔৣ☬✞ Vendas e Negociações ✞☬ঔৣ꧂\n\n
                *!!Cardápio* - O contato inicia uma negocação com sua empresa.\n
                *!!@* - Exibe o link do Instagram.\n
                *!!Foto* - pode ser aqui a foto promocional do seu empreendimento.\n
                *!!Audio* - Ouça as Crenças e hábitos inadequados.\n
                *!!Empresa* - A Geo localização do seu empreendimento (Mapa)!!.\n
                ঔৣ☬✞ Manutenção e Visualização ✞☬ঔৣ꧂\n\n
                *!!isVerbose* On/Off informações de console, para acompanhamento via terminal.\n
                *!!UpDateDb* - Após alterações no app _painelBot_ *rode esse comando* para o Bot reconhecer os novos parametros, assim como as novas mensagens, campanhas e tudo mais.\n
                ঔৣ☬✞ Sobre o Desenvolvedor e Bot ✞☬ঔৣ꧂\n\n
                *!!Vittae* - Curriculo do desenvolvedor desse Robot de Auto atendimento, vendas e marketing.\n
                *!!Dev* - Envia um PDF do curriculo do desenvolvedor.\n
                *!!ABOUT* - Detalhes do celular, núemro na qual o Bot está rodando, esses são enviados aquem os solicitou.\n
                *!!Bateria* - Exibe o nível de bateria do número na qual o Bot está funcionando.\n
                ঔৣ☬✞ Grupos ✞☬ঔৣ꧂\n\n
                *!!MKG* - Cria um grupo com o nome e descrição informados.\n
                *!!SUBJECT* - Altera a Descrição do Grupo.\n
                *!!ADDUSERS* - Adiciona participantes ao grupo informado.\n
                *!!RMP* - Remove grupo e seus membros, apagando em seguida.\n
                ঔৣ☬✞ Dados ✞☬ঔৣ꧂\n\n
                *!!Clean qtDeDias* - Faz uma limpeza das mensagens do Bot, excluindo as mensagens antigas, se for omitido a qtDeDias ele assume 30dias.\n
                *!!POSTALL* - Executa a rotina de postagens para todos os grupos imediatamente (use em intervalos longos).\n
                *!!GETALLCHATS* - Exibe todos os grupos que o Bot está atualmente atendendo (salva em arquivo).\n
                *!!TRANSMISSION* - Gera uma lista de todos os contatos que estão ativos nos grupos para uso de envio em massa (todos os DDD 86 e 89 - Piauí).\n
                *!!TRANSMISSION2* - Gera uma lista de todos os contatos que estão ativos nos grupos para uso de envio em massa (todos os DDD 86 e 89 - Piauí).\n
                *!!REPORTGROUPS* - Salva em disco a relação de Grupos em arquivos separados, contendo a quantidade de membros, nomes e números de contatos, se o grupo é público, privado ou se é apenas contato livre.\n
                *!!REPORTADMINS* - Salva em disco a relação de ADMINISTRADORES DOS Grupos em arquivos separados, contendo a quantidade de membros, nomes e números de admininstradores, dos grupos públicos\n
                *!!EXITGROUPS* - Sai dos grupos privados, serve para aliviar o bot de atender aos contatos desenecessários.\n
                ঔৣ☬✞ Outros ✞☬ঔৣ꧂\n\n
                *!!Gestor* - Exibe a lista de comandos internos do Bot.\n
                `)
                            .catch((erro) => {
                            logger_1.logger.error("Error when sending: ", JSON.stringify(erro, null, ' '));
                        });
                    } //COMANDO FIXO PARA USO DO GESTOR
                    break;
                /** Mey instagram */
                case "!!@":
                    {
                        (0, placard_1.default)("Meu !!@");
                        console.log((0, color_1.default)(`\nInstagram da empresa solicitado`, "yellow"));
                        //  await client.startTyping(message.from);
                        yield client
                            .sendLinkPreview(message.from, "https://www.instagram.com/festasda_luoficial/", "*Luciana Ferreira (recomeçando)*\n•Desde 2012\n🚫Conta antiga 10k desativada sem aviso\n🎉Decoração/Personalizados de Luxo e Papelaria\n🌎Enviamos p/ todo Brasil e Exterior\n📱86 98171-3083\n\n*Venha conhecer o meu Instagram!!!*\n\nCHAMA NO NUMERO ABAIXO:\n👇👇👇👇👇👇👇👇👇👇\nwa.me/message/RFE6FLOY7ZC2D1")
                            .catch((erro) => {
                            logger_1.logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                        }); //COMANDO FIXO PARA USO DO GESTOR
                        //  await client.stopTyping(message.from);
                    }
                    break;
                /**Envia um audio meu! */
                case "!!AUDIO":
                    {
                        //  await client.startTyping(message.from);
                        yield client
                            .sendVoice(message.from, "/home/godev/Downloads/Telegram Desktop/06 - Crenças e hábitos inadequados.mp3")
                            .catch((erro) => {
                            logger_1.logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                        }); //COMANDO FIXO PARA USO DO GESTOR
                        //  await client.stopTyping(message.from);
                    }
                    break;
                //Meu Curriculo - pode ser o cardápio em PDF - Lista de PRODUTOS E SERVIÇOS.
                case "!!DEV":
                    {
                        (0, placard_1.default)("!!DEV");
                        console.log((0, color_1.default)(`\nCurrículo do Desenvolvedor do Bot solicitado!`, "yellow"));
                        //  await client.startTyping(message.from);
                        yield client
                            .sendFile(message.from, "/home/godev/Downloads/projects/pessoais/ProjetoLu/BotLu/src/public/PDF/Curriculo Losangelo.pdf", "Curriculo Losangelo.pdf", "*Veja o meu curriculo...*")
                            .catch((erro) => {
                            logger_1.logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                        }); //COMANDO FIXO PARA USO DO GESTOR
                        //  await client.stopTyping(message.from);
                    }
                    break;
                /**
                 * TODO - REFATORAR ESSE CÓDIGO
                 * Frase do dia...
                 * pegar aleatóriamente da lista de frases do dia.
                 */
                case "!!FOTO":
                    {
                        (0, placard_1.default)("!!Foto");
                        console.log((0, color_1.default)(`\nFoto com texto motivacional solicitado...`, 'yellow'));
                        yield client
                            .sendImage(message.from, "/home/godev/Imagens/AsPessoasNaoFazemIdeia.png", "FraseDoDia.png", "*Frase do dia!*")
                            .then((result) => {
                            logger_1.logger.info("Result: ", result); //return object success
                        })
                            .catch((erro) => {
                            logger_1.logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                        }); //COMANDO FIXO PARA USO DO GESTOR
                    }
                    break;
                /**
                 * TODO - REFATORAR ESSE CÓDIGO
                 * Configurar via db para cada gestor poder colocar sua localização fixa ou
                 * o App deve pegar a localização do usuário e mostrar ao gestor.
                 */
                case "!!EMPRESA":
                    {
                        (0, placard_1.default)("!!GPS");
                        console.log((0, color_1.default)(`\nLocalização da empresa solicitada!`, "yellow"));
                        yield client
                            .sendLocation(message.from, "-5.103546", "-42.7876264", "Cristo Rei - Teresina/Pi")
                            .catch((erro) => {
                            logger_1.logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                        }); //COMANDO FIXO PARA USO DO GESTOR
                    }
                    break;
                /** ***********************************************************************
                 *  ░▒▓█►DIVULGANDO NA FORÇA NOS CHATS com mais de argo[1] dias◄█▓▒░
                 */
                case "!!POSTALL":
                    {
                        const start = new Date().getTime();
                        let postedIn = [];
                        let divulgar = 0;
                        (0, placard_1.default)('PostALL');
                        console.log((0, color_1.default)('\nPostanto em todos os chats diretamente!', 'yellow'));
                        logger_1.logger.info(
                        // color(`\n////////////////////////////////////////`, "cyan"),
                        // color(`\n////////////////////////////////////////`, "yellow"),
                        // color(`\n// Comando !!POSALLTNOW solicitado... //`, "lime"),
                        (0, color_1.default)(`\n// As: ${start}`, "lime"));
                        yield client
                            .sendText(message.from, "Comando !!POSALLTNOW solicitado...")
                            .catch((e) => logger_1.logger.info((0, color_1.default)(e, "yellow")));
                        const chats = (yield client.getAllChats()).filter((chat) => chat.isGroup && !(chat.isAnnounceGrpRestrict && chat.isReadOnly));
                        chats.forEach((chat) => __awaiter(this, void 0, void 0, function* () {
                            try {
                                const AutoSleep = Math.floor(Math.random() * 3000 + 1000);
                                divulgar = divulgar + 1;
                                (0, advetiseInChatId_1.advertiseInChatId)(client, message, chat.id._serialized, chat.name);
                                postedIn.push(`{${chat.id._serialized}, ${chat.name},}`);
                                logger_1.logger.info((0, color_1.default)(`${chat.id._serialized}`, "magenta"));
                                yield (0, sleep_1.sleep)(AutoSleep);
                            }
                            catch (error) {
                                logger_1.logger.info((0, color_1.default)(error, "red"));
                            }
                        })); // end foreach
                        if (divulgar > 0) {
                            const postlisted = JSON.stringify(postedIn, null, 2);
                            yield client
                                .sendText(message.from, `Eiii... Divulguei em ${divulgar} de ${chats.length} chats.\n Lista de postados\n${postlisted}`)
                                .catch((e) => logger_1.logger.info((0, color_1.default)(e, "yellow")));
                        }
                        const elapsed = new Date().getTime() - start;
                        const momento = new Date().toLocaleString();
                        logger_1.logger.info((0, color_1.default)(`\n----`, "crimson"), (0, color_1.default)(`\nComando !!POSALLTNOW solicitado levou ${elapsed}ms`, "yellow"), (0, color_1.default)(`\nMomento ${momento}`, "lime"));
                    }
                    break;
                /** Autaliza a lista de Transmissão como números Privados no estado do Piaui */
                case "!!TRANSMISSION":
                    {
                        const start = new Date().getTime();
                        // const aContactsPiaui: any[] = [];
                        // const aContactsOutros: any[] = [];
                        (0, placard_1.default)("Get Privados");
                        console.log((0, color_1.default)(`\nGeração de Lista de contatos para Transmissão sendo gerada!`, "yellow"));
                        const FullContacts = yield client.getAllContacts();
                        const allContacts = FullContacts.map((chat) => __awaiter(this, void 0, void 0, function* () {
                            if (chat.id._serialized.substring(0, 4) === "5586" ||
                                chat.id._serialized.substring(0, 4) === "5589") {
                                // aContactsPiaui.map(async (contacts) => {
                                const profileAtual = yield client.getContact(chat.id._serialized);
                                // logger.info("Privado: ", profileAtual);
                                // logger.info("ID: ", contacts.id._serialized);
                                // if (contacts.name.startsWith("+", 0)) {
                                //   Name = contacts.pushname;
                                // } else {
                                //   Name = contacts.name;
                                // }
                                let Name = (chat === null || chat === void 0 ? void 0 : chat.pushname) ||
                                    (chat === null || chat === void 0 ? void 0 : chat.name) ||
                                    (chat === null || chat === void 0 ? void 0 : chat.verifiedName) ||
                                    (chat === null || chat === void 0 ? void 0 : chat.shortName) ||
                                    (chat === null || chat === void 0 ? void 0 : chat.formattedName);
                                // if (chat.hasOwnProperty("formattedName")) {
                                //   if (chat.formattedName) Name = chat.formattedName;
                                // }
                                // if (chat.hasOwnProperty("mentionName")) {
                                //   if (chat.mentionname) Name = chat.mentionName;
                                // }
                                // if (chat.hasOwnProperty("shortName")) {
                                //   if (chat.shortName) Name = chat.shortName;
                                // }
                                // if (chat.hasOwnProperty("pushname")) {
                                //   if (chat.pushname) Name = chat.pushname;
                                // }
                                // if (chat.hasOwnProperty("name")) {
                                //   if (chat.name) Name = chat.name;
                                // }
                                // logger.info("\n\n[•⊶⸼⊑⊒⸼⊷•] 🤖", profileAtual);
                                try {
                                    const upsertUser = lib_prisma_1.default.transmissionList.upsert({
                                        where: {
                                            participantId: chat.id._serialized,
                                        },
                                        update: {
                                            participantName: Name,
                                        },
                                        create: {
                                            groupId: "007c@us",
                                            groupName: "",
                                            groupType: "3",
                                            participantId: chat.id._serialized,
                                            participantName: Name,
                                            checked: false,
                                        },
                                    });
                                }
                                catch (error) {
                                    logger_1.logger.info("Erro ao salvar na lista de Transmissão: ", error);
                                }
                                // }
                                // });
                                // aContactsPiaui.push(chat);
                            }
                            else {
                                // aContactsOutros.push(chat);
                            }
                        }));
                    } // fim de cmd GETPRIVADOS
                    break;
                /***************************************************************************
                 * Listando os grupos ABERTOS, FECHADOS e CONTATOS pessoais da agenda
                 * TODO - REFATORAR para pegar os participantes e filtrar, agrupar por DDDs
                 * ::. !!list all groups by type
                 **************************************************************************/
                case "!!REPORTGROUPS": {
                    //  && message.type === "chat"
                    // const args = message.body.slice(13).split(" ");
                    let groupsClosed = [];
                    let groupsOpen = [];
                    let noGroups = [];
                    let dddLocal = []; //usa para armazenar os DDDs no dddPiaui[]
                    let dddPiaui = [];
                    let aContactNames = [];
                    let aSpanTitle = [];
                    (0, placard_1.default)("R.Groups");
                    console.log((0, color_1.default)(`\nSalva listagem, detalhado dos grupos e contatos!`, "yellow"));
                    yield client.getAllChats().then((chats) => __awaiter(this, void 0, void 0, function* () {
                        chats.forEach((chat) => __awaiter(this, void 0, void 0, function* () {
                            /**
                             * Filtrando os grupos em Abertos,
                             * ver depois "isBusiness": chat.isBusiness
                             */
                            if (chat.isGroup) {
                                let groupName = chat.name;
                                let participantesNoAdmin = chat.groupMetadata.participants
                                    .filter((a) => !(a.isAdmin || a.isSuperAdmin))
                                    .map((b) => b.id._serialized);
                                let qtParicipantes = participantesNoAdmin.length;
                                dddLocal = participantesNoAdmin
                                    .filter((a) => a.startsWith("5586") || a.startsWith("5589"))
                                    .map((a) => dddPiaui.push(a));
                                //Verficando se é um grupo aberto ou fechado
                                if (!chat.isAnnounceGrpRestrict && !chat.isReadOnly) {
                                    groupsOpen.push(chat.groupMetadata.id._serialized);
                                    if (qtParicipantes != 0) {
                                        fs_extra_1.default.writeFile(`/home/godev/Imagens/Bot5Estrelas/botReports/Open/${groupName} id-(${chat.id._serialized}) (${qtParicipantes}).json`, JSON.stringify(participantesNoAdmin, null, 2), function (erro) {
                                            if (erro) {
                                                logger_1.logger.error(erro);
                                            }
                                        });
                                    }
                                    else {
                                        /**
                                         * Capturar os dados dos integrantes pela tag html
                                         */
                                        //  aSpanTitle.push(document.getElementById('span title').innerText)
                                        //  alert(aSpanTitle)
                                        fs_extra_1.default.writeFile(`/home/godev/Imagens/Bot5Estrelas/botReports/OpenZerados/${groupName} id-(${chat.id._serialized}) (${qtParicipantes}).json`, JSON.stringify(participantesNoAdmin, null, 2), function (erro) {
                                            if (erro) {
                                                logger_1.logger.error(erro);
                                            }
                                        });
                                    }
                                }
                                else {
                                    //Não é nenhum Grupo e sim Contato avulso
                                    groupsClosed.push(chat.groupMetadata.id._serialized);
                                    if (qtParicipantes != 0) {
                                        fs_extra_1.default.writeFile(`/home/godev/Imagens/Bot5Estrelas/botReports/Closed/${groupName} id-(${chat.id._serialized}) (${qtParicipantes}).json`, JSON.stringify(participantesNoAdmin, null, 2), function (erro) {
                                            if (erro) {
                                                logger_1.logger.error(erro);
                                            }
                                        });
                                    }
                                    else {
                                        fs_extra_1.default.writeFile(`/home/godev/Imagens/Bot5Estrelas/botReports/ClosedZerados/${groupName} id-(${chat.id._serialized}) (${qtParicipantes}).json`, JSON.stringify(participantesNoAdmin, null, 2), function (erro) {
                                            if (erro) {
                                                logger_1.logger.error(erro);
                                            }
                                        });
                                    }
                                }
                            }
                            else {
                                noGroups.push(chat.id._serialized);
                            }
                        }));
                        /**
                         * Gerando e listando a contabilidade dos grupos
                         * abertos, fechados e contatos pessoais
                         * */
                        const groupList = [
                            "chatsNoGroups",
                            "chatsGroupsOpen",
                            "chatsGroupsClosed",
                        ];
                        const groupListData = [noGroups, groupsOpen, groupsClosed];
                        /**
                         * Salvando em arquivo
                         */
                        let counter = 0;
                        groupList.forEach((g) => {
                            fs_extra_1.default.writeFile(`/home/godev/Imagens/Bot5Estrelas/botReports/${g}.json`, JSON.stringify(groupListData[counter], null, 2), function (erro) {
                                if (erro) {
                                    logger_1.logger.error(erro);
                                }
                            });
                            counter++;
                        });
                        // Quando terminar me avisa no whats
                        yield client
                            .sendText(message.from, `Listados groupsOpen: ${groupsOpen.length}\nListados groupsClosed: ${groupsClosed.length}\nListados noGroups: ${noGroups.length}`)
                            .catch((erro) => {
                            logger_1.logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                        });
                        // await client.sendText(
                        //   message.from,
                        //   `Listados groupsClosed: ${groupsClosed.length}`
                        // );
                        // await client.sendText(
                        //   message.from,
                        //   `Listados noGroups: ${noGroups.length}`
                        // );
                    }));
                    //filtrando os DDD do Piauí
                    let SoPiaui = noGroups
                        .filter((a) => a.startsWith("5586") || a.startsWith("5589"))
                        .map((a) => dddPiaui.push(a));
                    fs_extra_1.default.writeFile(`/home/godev/Imagens/Bot5Estrelas/botReports/SoPiaui.json`, JSON.stringify(dddPiaui, null, 2), function (erro) {
                        if (erro) {
                            logger_1.logger.info((0, color_1.default)(`Erro em salvar o arquivo SoPiaui.json\n ${erro})`, "red"));
                        }
                    });
                    dddPiaui.forEach((a) => __awaiter(this, void 0, void 0, function* () {
                        let eChat = yield client.getContact(a);
                        let pushname = (eChat === null || eChat === void 0 ? void 0 : eChat.pushname) ||
                            (eChat === null || eChat === void 0 ? void 0 : eChat.name) ||
                            (eChat === null || eChat === void 0 ? void 0 : eChat.verifiedName) ||
                            (eChat === null || eChat === void 0 ? void 0 : eChat.formattedName);
                        logger_1.logger.info((0, color_1.default)(eChat.id._serialized, "yellow"), (0, color_1.default)(pushname, "blue"), (0, color_1.default)(eChat === null || eChat === void 0 ? void 0 : eChat.name, "pink"), (0, color_1.default)(eChat === null || eChat === void 0 ? void 0 : eChat.verifiedName, "green"), (0, color_1.default)(eChat === null || eChat === void 0 ? void 0 : eChat.formattedName, "lime"));
                        // logger.info(color(`\n${a} - ${pushname}\n`, "yellow"));
                        // aContactNames.push(eChat);
                        aContactNames.push(`${eChat.id._serialized}, ${pushname}`);
                    }));
                    fs_extra_1.default.writeFile(`/home/godev/Imagens/Bot5Estrelas/botReports/aChats.json`, JSON.stringify(aContactNames, null, 2), function (erro) {
                        if (erro) {
                            logger_1.logger.info((0, color_1.default)(`Erro em salvar o arquivo /Profile/aChat.json\n ${erro})`, "red"));
                        }
                    });
                    //liberando memória
                    groupsClosed = [];
                    groupsOpen = [];
                    SoPiaui = [];
                    noGroups = [];
                    dddLocal = [];
                    dddPiaui = [];
                    aContactNames = [];
                    break;
                } //* ::. /listAllGroupTypes - Listando os grupos ABERTOS, FECHADOS e CONTATOS pessoais
                case "!!REPORTADMINS": {
                    let groupsAdmins = [];
                    (0, placard_1.default)("R.ADMINs");
                    console.log((0, color_1.default)(`\nSalva listagem com os ADMINS dos grupos, para ser enviado msn de soliciação de ingresso, rs!`, "yellow"));
                    yield client.getAllChats().then((chats) => __awaiter(this, void 0, void 0, function* () {
                        chats.forEach((chat) => __awaiter(this, void 0, void 0, function* () {
                            /**
                             * Filtrando os grupos em Abertos,
                             * ver depois "isBusiness": chat.isBusiness
                             */
                            if (chat.isGroup) {
                                let groupName = chat.name;
                                let participantesAdmin = chat.groupMetadata.participants
                                    .filter((a) => (a.isAdmin || a.isSuperAdmin))
                                    .map((b) => b.id._serialized);
                                let qtParicipantes = participantesAdmin.length;
                                let complementFileName = '';
                                //Verficando se é um grupo aberto ou fechado
                                if (chat.isAnnounceGrpRestrict && chat.isReadOnly) {
                                    complementFileName = "(restrito)";
                                }
                                groupsAdmins.push(chat.groupMetadata.id._serialized);
                                if (qtParicipantes != 0) {
                                    fs_extra_1.default.writeFile(`/home/godev/Imagens/Bot5Estrelas/botReports/Administradores/${groupName} id-(${chat.id._serialized}) [${qtParicipantes}] ${!!!complementFileName}.json`, JSON.stringify(participantesAdmin, null, 2), function (erro) {
                                        if (erro) {
                                            logger_1.logger.error(erro);
                                        }
                                    });
                                }
                                // }
                            }
                        }));
                        //liberando memória
                        groupsAdmins = [];
                    }));
                    break;
                } //::. !!REPORTADMINS Listando os ADMINISTRADORES DOS GRUPOS ABERTOS
                /**
              * Todas as informações sobre o meu Divice
              */
                case "!!ABOUT": {
                    const inforBot = yield client.getHostDevice();
                    (0, placard_1.default)("!!About");
                    console.log((0, color_1.default)(`\nSobre o status do celular e bot solicitados!`, "yellow"));
                    yield client
                        .sendText(message.from, `.:: My Device Information ::. \n${JSON.stringify(inforBot, null, 2)}`)
                        .catch((erro) => {
                        logger_1.logger.error("Error when cmd Informe: ", erro); //return object error
                    });
                    break;
                }
                default:
                    break;
            }
            /**
               * ░▒▓█►LIMPANDO CONVERSAS NOS CHATS com mais de argo[1] dias◄█▓▒░
               * refatorar e reformular
               */
            if (expr.startsWith("!!CLEAN")) {
                const argo = expr.split("!!CLEAN ")[1];
                let cleanedIn = [];
                (0, placard_1.default)("Clean");
                console.log((0, color_1.default)(`\nLimpando conversas nos chats com mais de ${argo} dias`, "yellow"));
                const chats = (yield client.getAllChats()).filter((chat) => chat.isGroup || !(chat.isAnnounceGrpRestrict && chat.isReadOnly));
                let apagar = 0;
                let max = argo || 30;
                chats.forEach((chat) => __awaiter(this, void 0, void 0, function* () {
                    let difference = Math.floor(Date.now() / 1000) - chat.t;
                    let daysDifference = Math.floor(difference / 60 / 60 / 24);
                    if (daysDifference > max) {
                        apagar = apagar + 1;
                        //isso apaga os ensagens dos meus contatos...quero apagar as mensagens.
                        yield client.clearChatMessages(chat.id._serialized);
                        logger_1.logger.info((0, color_1.default)(`${chat.id._serialized}`, "magenta"), (0, color_1.default)(` Diferença de ${daysDifference} dias`, "yellow"));
                        cleanedIn.push(`{${chat.id._serialized}, ${chat.name},}`);
                        yield (0, sleep_1.sleep)(3000);
                    }
                })); // end foreach
                logger_1.logger.info((0, color_1.default)(`Eiii... apagando ${apagar} chats`, "red"));
                if (apagar > 0) {
                    yield client
                        .sendText(initData_1.myBotAdmin, "Apagando  " + apagar + " chats")
                        .catch((e) => logger_1.logger.info((0, color_1.default)(e, "red")));
                    yield client
                        .sendText(initData_1.myBotAdmin, "Lista de apagados\n" + cleanedIn)
                        .catch((e) => logger_1.logger.info((0, color_1.default)(e, "red")));
                }
                return;
            }
            /**
              * remove todos os grupos Apenas de Leitura dos meus contatos e
              * sair dos mesmos.
              */
            if (expr.startsWith("!!EXITGROUPS")) {
                const argo = expr.split("!!EXITGROUPS ")[1];
                const start = new Date().getTime();
                (0, placard_1.default)("ExitGroups");
                console.log((0, color_1.default)(`\nSaindo dos grupos com mais de ${argo} dias`, "yellow"));
                let cleanedIn = [];
                const chats = (yield client.getAllChats()).filter((chat) => (chat.isGroup && chat.isAnnounceGrpRestrict && chat.isReadOnly));
                let apagar = 0;
                let max = argo || 30;
                logger_1.logger.info((0, color_1.default)(`\nExecutando a solicitação de !!ExitGroups\nSaindo e apagando grupos apenas de leitura com menos de ${max} dias!\nAgora: ${start}\n`, "magenta"));
                chats.forEach((chat) => __awaiter(this, void 0, void 0, function* () {
                    let difference = Math.floor(Date.now() / 1000) - chat.t;
                    let daysDifference = Math.floor(difference / 60 / 60 / 24);
                    if (daysDifference > max) {
                        apagar = apagar + 1;
                        //isso apaga os ensagens dos meus contatos...quero apagar as mensagens.
                        yield client.leaveGroup(chat.id._serialized).then(() => __awaiter(this, void 0, void 0, function* () {
                            (0, sleep_1.sleep)(3000);
                            yield client.deleteChat(chat.id._serialized);
                        })).catch((e) => logger_1.logger.error((0, color_1.default)(e, "red")));
                        logger_1.logger.info((0, color_1.default)(`\n${chat.id._serialized}`, "magenta"), (0, color_1.default)(` Diferença de ${daysDifference} dias`, "yellow"));
                        cleanedIn.push(`{${chat.id._serialized}, ${chat.name},}`);
                        yield (0, sleep_1.sleep)(2000);
                    }
                })); // end foreach
                logger_1.logger.info((0, color_1.default)(`\nEiii... apagando ${apagar} chats`, "red"));
                if (apagar > 0) {
                    yield client
                        .sendText(initData_1.myBotAdmin, `${apagar} chats apagados\n${cleanedIn}`)
                        .catch((e) => logger_1.logger.info((0, color_1.default)(e, "red")));
                }
                const elapsed = new Date().getTime() - start;
                const momento = new Date().toLocaleString();
                logger_1.logger.info((0, color_1.default)(`\n----`, "yellow"), (0, color_1.default)(`\nComando !!EXITGROUPS solicitado, levou ${elapsed}ms`, "yellow"), (0, color_1.default)(`\nMomento ${momento}`, "yellow"));
            }
            /** COMANDO NOVOS PARA O GESTOR
             * ░▒▓█►─═/RMP - Remove Participantes - nomeDoGrupo1 grupo2 ... ═─◄█▓▒░
             * Comando para remover todos os integrantes do grupo expecifico
             * Se for o próprio bot ou o administrador, ele remove todos os integrantes do grupo.
             *  */
            // if (expr.startsWith("/Membros ")) {
            //   const args = expr.slice(9).split(" ");
            //   const groups = await client.getAllChatsGroups();
            //   const members = await client.getGroupMembers(
            //     groups[0].id._serialized
            //   );
            //   logger.info("Get Members: ", members);
            // }
            /**
             * ░▒▓█►─═/RMP - Remove Participantes - nomeDoGrupo1 grupo2 ... ═─◄█▓▒░
             */
            if (expr.startsWith("!!RMP ")) {
                const args = expr.slice(6).split(" ");
                yield client.getAllChats().then((chats) => __awaiter(this, void 0, void 0, function* () {
                    const groups = chats.filter((chat) => chat.name.startsWith("B5"));
                    groups.forEach((chat) => __awaiter(this, void 0, void 0, function* () {
                        if (chat.isGroup) {
                            const participantesNoAdmin = chat.groupMetadata.participants
                                .filter((a) => !(a.isAdmin || a.isSuperAdmin))
                                .map((b) => b.id._serialized);
                            participantesNoAdmin.forEach((participanteNoAdmin, i) => {
                                setTimeout(function () {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        logger_1.logger.info(participanteNoAdmin);
                                        yield client.removeParticipant(chat.id.id, [
                                            participanteNoAdmin,
                                        ]);
                                    });
                                }, 6000 + Math.floor(Math.random() * 3000) * (i + 1));
                            });
                            yield client.leaveGroup(chat.id.id);
                        }
                        else {
                            yield client
                                .reply(message.from, "Esse comando só pode ser usado dentro de um grupo!", message.id.toString())
                                .catch((erro) => {
                                logger_1.logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                            });
                        }
                    }));
                }));
                return;
            }
            //  && message.sender.id === message.fromMe) ||
            // message.sender.id === myBotAdmin //"5586981488472" antigo vivo
            //  const args = expr.slice(5).split(" ");
            //   await client.getAllChats().then((chats) => {
            //   const groups = chats.filter((chat) => chat.isGroup);
            //   groups.map(async (group) => {
            //     if (group.isGroup) {
            //       const members = await client.getGroupMembers(
            //         group.id._serialized
            //       );
            //       logger.info("Get Members: ", members);
            //       members.map(async (member) => {
            //         // if (member.id !== message.sender.id) {
            //         //   await client.removeFromGroup(
            //         //     group.id._serialized,
            //         //     member.id
            //         //   );
            //         // }
            //       });
            //     }
            //   });
            // }
            /** COMANDO NOVOS PARA O GESTOR
             * ░▒▓█►─═/MKG - Make Group - nomeDoGrupo1 grupo2 ... ═─◄█▓▒░
             * Comando para CRIAR NOVOS GRUPOS
             * Se for o próprio bot ou o administrador, ele CRIA GRUPOS
             * Usando o message.body no lugar do expr para evitar a caixa alta
             *  */
            // const msnbody = message.body;
            if (expr.startsWith("!!MKG")) {
                logger_1.logger.info((0, color_1.default)(`O comando  ░▒▓█►─═/MKG - Make Group ═─◄█▓▒░ foi chamado`, "cyan"));
                //   &&
                //   (message.sender.id === message.fromMe ||
                //     message.sender.id === myBotAdmin) //"5586981488472" antigo vivo
                // ) {
                const args = message.body.slice(6).split(",");
                logger_1.logger.info(`Os novos grupos terão como ADMIN: ${initData_1.myBotAdmin}@c.us`);
                for (const arg of args) {
                    yield client
                        .createGroup(arg, `${initData_1.myBotAdmin}@c.us`)
                        .then((result) => __awaiter(this, void 0, void 0, function* () {
                        logger_1.logger.info((0, color_1.default)(`▄ ▅ ▆ ▇ Result, ${result}`, "blue")); //return object success
                        //promove o usuário para admin
                        yield client
                            .promoteParticipant(result.gid._serialized, `${initData_1.myBotAdmin}@c.us`)
                            .catch((erro) => {
                            logger_1.logger.info((0, color_1.default)(`[Error] ao promover participante, ${erro}`, "red")); //return object error
                        });
                        //muda o icone do grupo
                        // await client
                        //   .setGroupImage(
                        //     result.gid._serialized,
                        //     "./public/IMG/destaquese.png"
                        //   )
                        //   .catch((erro) => {
                        //     logger.error(
                        //       `Error em alterar a imagem do grupo: ${arg}`,
                        //       erro
                        //     ); //return object error
                        //   });
                        yield client
                            .setGroupDescription(result.gid._serialized, "Desejamos trazer o máximo de aproveitamento para nossos participantes.\nEste grupo é para *DDD (86/89) Estado do Piauí*, os DDDs diferentes serão remanejados para outros grupos. Isso é para poder fazer uma segmentação por região, mas *não se preocupem*, terão grupos *Globais* onde todos se encotrarão.")
                            .catch((erro) => {
                            logger_1.logger.info(`Error em inserir a descrição do grupo ${arg}`, erro); //return object error
                        });
                        yield client
                            .sendText(initData_1.myBotAdmin, `Grupos ${arg} criado com sucesso!\nDescrição do grupo: "▄ ▅ ▆ ▇ Este grupo foi criado automaticamente pelo ░▒▓█►bot◄█▓▒░."`)
                            .catch((erro) => {
                            logger_1.logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                        });
                    }))
                        .catch((erro) => {
                        logger_1.logger.info(`Error ao criar o grupo ${arg}`, erro); //return object error
                    });
                }
                return;
            }
            // //ABRIR TODOS OS GRUPOS QUE O BOT É ADMIN;
            // client.getAllChats().then((chats) => {
            //   const groups = chats.filter((chat) => chat.isGroup);
            //   // logger.info("▄ ▅ ▆ ▇ Grupos ▇ ▆ ▅ ▄", groups);
            //   if (groups.length == 0) {
            //     client.reply(
            //       message.from,
            //       "▄ ▅ ▆ ▇ Você ainda não tem grupos ▇ ▆ ▅ ▄",
            //       message.id.toString()
            //     );
            //   } else {
            //     groups.forEach((group, i) => {
            // client.setMessagesAdminsOnly(group.id.id, false);
            //       // logger.info(
            //       //   "▄ ▅ ▆ ▇ Criando grupos ▇ ▆ ▅ ▄",
            //       //   group + " : " + i
            //       // );
            //     });
            //   }
            // });
            /***************************************************************************
             * CMD: /ADDUSERS
             * @param {string} usuario
             * @param {string} grupo
             *
             * Adicionando novos usuarios no grupo
             * Divulgando no Estado do Piauí - 乃5 id-(120363019932273880@g.us)
             * =>Divulgando em Teresina 乃5 id-(120363040424802267@g.us)
             * 乃5 Divulgando no Estado do Piauí id-(120363041613406090@g.us)
             * Divulgando no 乃5 id-(120363037512414519@g.us)
             * Meu Convite Aberto id-(120363039879191259@g.us) (0)
             * Meus BOTestes Solitários id-(120363039662705391@g.us) (2)
             *
             *  /adduser 120363019932273880@g.us: lista, lista, lista
             */
            if (expr.substring(11, 0) === "!!ADDUSERS ") {
                const inGroup = "120363019932273880@g.us";
                const args = message.body.slice(11).split(",");
                // const numerosSemRepeticao = [...new Set(args)];
                /** O ADM tem qeu saber sempre o que ocorre */
                if (args.length > 0) {
                    yield client
                        .reply(initData_1.myBotAdmin, `Adicionando ${args.length} contatos no grupo ${inGroup}`, message.id.toString())
                        .catch((e) => {
                        logger_1.logger.info((0, color_1.default)(`[📌 Errão]  ${e}`, "red"));
                    });
                }
                for (let arg of args) {
                    logger_1.logger.info((0, color_1.default)(`Adicionando `, "lime"), (0, color_1.default)(`${arg}`, "yellow"), (0, color_1.default)(`  ao grupo `, "lime"), (0, color_1.default)(`${inGroup}`, "magenta"), (0, color_1.default)(` pelo ADMIN: `, "lime"), (0, color_1.default)(`${initData_1.myBotAdmin}@c.us`, "blue"), (0, color_1.default)(`n\n.:: Quem foi: `, "lime"), (0, color_1.default)(`${message.sender.name === undefined
                        ? message.chat.name
                        : message.sender.name} .::Qual grupo ${message.from}`, "yellow"));
                    /**
                     * Add o usuário no grupo,
                     * envia msg de boas vindas, no privado
                     * e solicita a inclusão do numero na agenda do inscrito
                     * para as visualizaçõs do status do grupo e evitar spam e block
                     *          */
                    let NewParticipant = yield client
                        .addParticipant(inGroup, arg)
                        .catch((error) => {
                        logger_1.logger.info((0, color_1.default)(`[Error] ao *Adicionar* o participante *${arg}* ao grupo *${inGroup}*\n ${error}\n ---------------------`, "red"));
                        //return object error
                    });
                    // await sleep(8000);
                }
                return logger_1.logger.info((0, color_1.default)("[Terminou...]", "blue"));
            } //end of cmd ADDUSERS
            /********************************************************************************************* */
            //MUDAR TITULO DO GRUPO
            if (expr.startsWith("!!SUBJECT")) {
                let newSubject = expr.slice(10);
                return yield client
                    .getAllChats()
                    .then((chats) => {
                    const groups = chats.filter((chat) => chat.isGroup);
                    if (groups.length == 0) {
                        client.reply(message.from, "Você ainda não tem grupos.", message.id.toString());
                    }
                    else {
                        groups.forEach((group, i) => __awaiter(this, void 0, void 0, function* () {
                            // group.name.setSubject(newSubject);
                            yield client.setGroupTitle(group.id.id, newSubject);
                        }));
                    }
                })
                    .catch((err) => logger_1.logger.info(err));
            } //MUDAR TITULO DO GRUPO
            /** COMANDOs de Gerenciamento do GESTOR do Bot
             * Remover todos os integrantes do grupo expecifico
             * ░▒▓█►─═🅼🅰️🆃🆁🅸🆇═─◄█▓
             * Refatorar essa funcao
             **/
            /**
             * Extração e Geração de lista de TRANSMISSÃO.
             * TODO - REFATORAR para aceitar parametros de entrada do DDDs
             *
             * ESTRATEGIA: usar oa dica do ZDG, usar a chave FILE para criar um arquivo
             * cria um para cada DDD, envia via sendText para o ADMIN do BOT, apagando-os depois.
             * v2.0
             */
            if (expr == "!!TRANSMISSION2") {
                const start = new Date().getTime();
                const groups = yield client.getAllChats();
                const allGroups = groups.filter((chat) => chat.isGroup);
                // if (isVerbose) {
                // fs.writeFile(
                //   `/home/godev/Imagens/Bot5Estrelas/botReports/ContatosPiaui.json`,
                //   JSON.stringify(aContactsPiaui, null, 2),
                //   function (erro) {
                //     if (erro) {
                //       logger.error(erro);
                //     }
                //   }
                // );
                // fs.writeFile(
                //   `/home/godev/Imagens/Bot5Estrelas/botReports/aContactsOutros.json`,
                //   JSON.stringify(aContactsOutros, null, 2),
                //   function (erro) {
                //     if (erro) {
                //       logger.error(erro);
                //     }
                //   }
                // );
                // }
                logger_1.logger.info(`TOTAL DE GRUPOS: ${allGroups.length}`);
                const sGrupos = allGroups.forEach((contacts) => __awaiter(this, void 0, void 0, function* () {
                    let chatName = contacts.contact.name;
                    let chatID = contacts.id._serialized;
                    // é grupo? se for é restrito ou publico
                    let groupType = contacts.isGroup
                        ? !(contacts.isAnnounceGrpRestrict && contacts.isReadOnly)
                            ? "2"
                            : "1"
                        : "3";
                    if (contacts.groupMetadata.participants.length > 0) {
                        const participantesNoAdminIDs = contacts.groupMetadata.participants
                            .filter((a) => !(a.isAdmin || a.isSuperAdmin))
                            // .map((b) => b.id._serialized)
                            .map((lead) => __awaiter(this, void 0, void 0, function* () {
                            const profileAtual = client.getNumberProfile(lead.id._serialized);
                            let Name = (lead === null || lead === void 0 ? void 0 : lead.pushname) ||
                                (lead === null || lead === void 0 ? void 0 : lead.name) ||
                                (lead === null || lead === void 0 ? void 0 : lead.displayName) ||
                                (lead === null || lead === void 0 ? void 0 : lead.shortName) ||
                                (lead === null || lead === void 0 ? void 0 : lead.formattedName);
                            // if (!!lead.displayName) {
                            //   Name = lead.displayName;
                            // }
                            // if (!!lead.formattedShortName) {
                            //   Name = lead.formattedShortName;
                            // }
                            // if (lead.hasOwnProperty("formattedName")) {
                            //   if (lead.formattedName) Name = lead.formattedName;
                            // }
                            // if (!!lead.hasOwnProperty("pushname")) {
                            //   if (lead.pushname) Name = lead.pushname;
                            // }
                            // if (lead.hasOwnProperty("name") && !!lead.name) {
                            //   if (lead.name) Name = lead.name;
                            // }
                            // fs.writeFile(
                            //   `/home/godev/Imagens/Bot5Estrelas/botReports/${lead.id._serialized}.json`,
                            //   JSON.stringify(profileAtual, null, 2),
                            //   function (erro) {
                            //     if (erro) {
                            //       logger.error(erro);
                            //     }
                            //   }
                            // );
                            try {
                                const upsertUser = yield lib_prisma_1.default.transmissionList.upsert({
                                    where: {
                                        participantId: contacts.id._serialized,
                                    },
                                    update: {
                                        groupType: groupType,
                                    },
                                    create: {
                                        groupId: chatID,
                                        groupName: chatName,
                                        groupType: groupType,
                                        participantId: lead.id._serialized,
                                        participantName: Name,
                                        checked: false,
                                    },
                                });
                            }
                            catch (error) {
                                logger_1.logger.info("Erro ao salvar na lista de Transmissão: ", error);
                            }
                        }));
                    }
                }));
                // const AllPrivates = allContacts.map(async (contacts) => {
                //   const profileAtual = await client.getContact(
                //     contacts.id._serialized
                //   );
                //   // logger.info("Privado: ", profileAtual);
                //   // logger.info("ID: ", contacts.id._serialized);
                //   // if (contacts.name.startsWith("+", 0)) {
                //   //   Name = contacts.pushname;
                //   // } else {
                //   //   Name = contacts.name;
                //   // }
                //   if (!Name) {
                //     Name =
                //       contacts.shortName &&
                //       contacts.name &&
                //       contacts.formattedName &&
                //       contacts.pushname;
                //   }
                //   // logger.info("\n\n[•⊶⸼⊑⊒⸼⊷•] 🤖", profileAtual);
                //   try {
                //     const upsertUser = prisma.transmissionList.upsert({
                //       where: {
                //         participantId: contacts.id._serialized,
                //       },
                //       update: {},
                //       create: {
                //         groupId: "007c@us",
                //         groupName: "",
                //         groupType: "3",
                //         participantId: contacts.id._serialized,
                //         participantName: Name,
                //         checked: false,
                //       },
                //     });
                //   } catch (error) {
                //     logger.info("Erro ao salvar na lista de Transmissão: ", error);
                //   }
                //   // }
                // });
                // fs.writeFile(
                //   `/home/godev/Imagens/Bot5Estrelas/botReports/ExtratorList.json`,
                //   JSON.stringify(contacts, null, 2),
                //   function (erro) {
                //     if (erro) {
                //       logger.error(erro);
                //     }
                //     logger.info("Arquivo salvo");
                //   }
                // );
                const elapsed = new Date().getTime() - start;
                return logger_1.logger.info(`\nA EXTRAÇÂO levou ${elapsed}ms`);
            } //fim de cmd GETGRUPOS
            /**
             * Usado na rotina de mensagens esperadas para desabilitar o grupo xy e nao postar
             * Monta uma lista com todos os grupos salva em arquivo.json e no db.
             */
            if (expr === "!!GETALLCHATS") {
                // client.getStatus(o id do contato)
                logger_1.logger.info(".::: Monta uma lista com todos os grupos em Arquivo.json...:");
                yield client.getAllChats().then((chats) => __awaiter(this, void 0, void 0, function* () {
                    let groups = chats.filter((chat) => __awaiter(this, void 0, void 0, function* () { return chat.isGroup && !chat.isReadOnly && !chat.isAnnounceGrpRestrict; }));
                    const chatTXT = JSON.stringify(groups);
                    //salva em txt
                    fs_extra_1.default.writeFile("/home/godev/Imagens/Bot5Estrelas/botReports/ListaDeGrupos.json", chatTXT, function (erro) {
                        if (erro) {
                            logger_1.logger.error(erro);
                        }
                        // logger.info("Arquivo salvo");
                    });
                    // logger.info(groups);
                    // logger.info("▄ ▅ ▆ ▇ os grupos ▇ ▆ ▅ ▄");
                    if (groups.length == 0) {
                        client.reply(message.from, "Você ainda não tem grupos.", message.id.toString());
                    }
                    else {
                        let existingGroups = yield (0, initData_1.getAllGroupsList)();
                        let qtRecordsGroup = existingGroups.length;
                        let countSaveNewGroups = 0;
                        if (exports.isVerbose) {
                            logger_1.logger.info(".:: Grupos já cadastrados no DB ::.", qtRecordsGroup);
                        }
                        groups.forEach((grupo) => __awaiter(this, void 0, void 0, function* () {
                            let groupName = grupo.name
                                ? grupo.name
                                : grupo.contact.name;
                            // logger.info(`▄ ▅ ▆ ▇ groupName ${grupo} ▇ ▆ ▅ ▄`);
                            const profileAtual = yield client.getContact(grupo.id._serialized);
                            groupName = profileAtual.name
                                ? profileAtual.name
                                : profileAtual.pushname;
                            if (groupName != undefined) {
                                const ok = existingGroups.find((register) => register.name === groupName);
                                let chatGroupsFound = [];
                                if (!ok) {
                                    let structureData = {
                                        idSerialized: grupo.id._serialized,
                                        name: groupName,
                                        isReadOnly: grupo.isReadOnly,
                                        checked: false,
                                    };
                                    chatGroupsFound.push(structureData);
                                    countSaveNewGroups += 1;
                                    if (exports.isVerbose) {
                                        logger_1.logger.info(`.:: Novo grupo encontrados ::. (${countSaveNewGroups}): ${groupName}`);
                                    }
                                }
                                if (chatGroupsFound.length != 0) {
                                    yield lib_prisma_1.default.chatGroupsList
                                        .createMany({
                                        data: chatGroupsFound,
                                    })
                                        .catch((e) => {
                                        throw e;
                                    })
                                        .finally(() => __awaiter(this, void 0, void 0, function* () {
                                        yield lib_prisma_1.default.$disconnect();
                                    }));
                                }
                                chatGroupsFound = [];
                            }
                            return logger_1.logger.info;
                            // }
                        }));
                    }
                }));
                return;
            } // fim do cmd GETALLCHATS
            // if (expr == "!!BATERIA") {
            //   const NivelBatery = await client
            //     .getBatteryLevel()
            //     .then((batteryInfo: any) => {
            //       logger.info(`.:: Battery: ${batteryInfo}%`);
            //       client.sendText(
            //         message.from,
            //         `.:: Sua bateria tem *${batteryInfo}%* de carga atualmente! ::.`
            //       );
            //     });
            //   return;
            //   // logger.info(await getHostDevice()) deu erro
            // }
            /** End Of Functions Features Bot */
            // String(message.body).split(" ")[0]
            // if (expr.includes("REMOVEU")) {
            //   logger.info(`\n.:: ░▒▓█►REMOÇÃO◄█▓▒░] ::.`);
            //   await client
            //     .sendText(
            //       myNotificationGroup,
            //       `.:: ${String(message.body)} me removeu do grupo] ::. ░▒▓█► ${
            //         message.chat.name
            //       } ◄█▓▒░`
            //     )
            //     .catch((erro: any) => {
            //       logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
            //     });
            // }
            /************************************************************************************************** */
            if (exports.isVerbose) {
                logger_1.logger.info((0, color_1.default)("\n.::- - - - - - - - -- - - - - - - - -::.", "magenta"), (0, color_1.default)(`\n.:: Origem....: ${Contato}`, "lime"), (0, color_1.default)(`\n.:${usuario}\n`, "yellow"), (0, color_1.default)(`\n.:: USUÁRIO sender...: ${usuarioSender}`, "magenta"), (0, color_1.default)(`\n.: ${quemFoi}`, "magenta"), (0, color_1.default)(`\n.:: Bot?..: ${message.fromMe ? "SIM" : "NÃO"}`, "lime"), (0, color_1.default)("\n.::- - - - - - - - -- - - - - - - - -::.", "magenta"));
            }
            // await prisma.$connect();
            /**
             * procura saber se esse contato já está no Db
             * para apenas registrar mais uma interação
             */
            let wfound = yield lib_prisma_1.default.whatsLeadContact.findFirst({
                where: {
                    user: usuario,
                },
                select: {
                    id: true,
                    blackContact: true,
                },
            }); // wfound = await prisma.whatsLeadContact
            /**
             * Se NÃO ENCONTRAR, Salva o contato no banco de dados
             */
            if (!wfound) {
                try {
                    yield lib_prisma_1.default.whatsLeadContact.create({
                        data: {
                            // server: Contato.id.server,
                            user: quemFoi.id.user,
                            serialized: quemFoi.id._serialized,
                            nameUser: quemFoi.name,
                            // shortName: quemFoi.shortName,
                            pushname: (quemFoi === null || quemFoi === void 0 ? void 0 : quemFoi.pushname) ||
                                (quemFoi === null || quemFoi === void 0 ? void 0 : quemFoi.shortName) ||
                                (quemFoi === null || quemFoi === void 0 ? void 0 : quemFoi.formattedName),
                            msgs: message.type === "video" || message.type === "image"
                                ? "Video ou Imagem"
                                : expr,
                            e_url: quemFoi.profilePicThumbObj.eurl,
                            // img: quemFoi.profilePicThumbObj.img,
                            // imgFull: quemFoi.profilePicThumbObj.imgFull,
                            // raw:
                            //   quemFoi.profilePicThumbObj.raw != null
                            //     ? quemFoi.profilePicThumbObj.raw
                            //     : "",
                            // tag:
                            //   quemFoi.profilePicThumbObj.tag != null
                            //     ? quemFoi.profilePicThumbObj.tag
                            //     : "",
                            blackContact: expr == "/SAIR" ? true : false,
                        },
                    });
                }
                catch (error) {
                    logger_1.logger.error(`[ERROR] Erro ao salvar o balance${error}`);
                }
            } //if (!wfound) end
            /********************************************* */
            logger_1.logger.info((0, color_1.default)(`.:: Quem foi: ${(quemFoi === null || quemFoi === void 0 ? void 0 : quemFoi.pushname) || (quemFoi === null || quemFoi === void 0 ? void 0 : quemFoi.shortName) || (quemFoi === null || quemFoi === void 0 ? void 0 : quemFoi.formattedName)}`, "yellow"), (0, color_1.default)(`.:: de onde: ${(Contato === null || Contato === void 0 ? void 0 : Contato.name) || (Contato === null || Contato === void 0 ? void 0 : Contato.formattedName) || (Contato === null || Contato === void 0 ? void 0 : Contato.shortName)}`, "yellow"));
            // logger.info(".::: wfound", wfound.blackContact);
            // logger.info(".::- - - - - - - - -- - - - - - - - - -  - ::.\n");
            /**
             * VERIFICAÇÕES PARA SABER SE, É PERMITIDA O ENVIO DE RESPOSTAS E POSTS
             * Se quem enviou (contato) e não de onde veio (grupo)
             */
            let isInTheListOfAllowedAreaCodes = message.sender.id.startsWith("5586") ||
                message.sender.id.startsWith("5589");
            let ContactIsDifferentThanBotNumber = message.sender.id != message.fromMe;
            let CanYouReceivePostsInPrivate = !message.isGroupMsg
                ? ((wfound === null || wfound === void 0 ? void 0 : wfound.blackContact) === false || (wfound === null || wfound === void 0 ? void 0 : wfound.blackContact)) ===
                    undefined
                : true;
            /**
             * Se for grupo,
             * tem qeu ver o contato e pesquisar o valor do campo.
             */
            // let truth =
            //   isInTheListOfAllowedAreaCodes &&
            //   ContactIsDifferentThanBotNumber &&
            //   CanYouReceivePostsInPrivate;
            // if (isVerbose) {
            //   logger.info("\n = = = = = = = = = = =");
            //   logger.info("*》》》VERDADE está liberado? ", truth);
            //   logger.info("*》》》DDDs liberado? ", isInTheListOfAllowedAreaCodes);
            //   logger.info("*》》》Contato Permitido....: ", wfound?.blackContact);
            //   logger.info(
            //     "*》》》isBLACKCONTACT?......: ",
            //     wfound?.blackContact === false || wfound?.blackContact === undefined
            //   );
            //   logger.info(
            //     "*》》》Pode Receber postagens no Privado? ",
            //     CanYouReceivePostsInPrivate
            //   );
            //   logger.info("= = = = = = = = = = =");
            //   logger.info(
            //     ".:: REGISTRO ATUAL (null - se não estiver cadastrado): ",
            //     wfound
            //   );
            //   logger.info("ddd", isInTheListOfAllowedAreaCodes);
            //   logger.info("contado do bot", ContactIsDifferentThanBotNumber);
            // }
            /**
             * Contatos que se iniciam com o DDD
             * diferente do Número naqual o bot está rodando
             */
            if (isInTheListOfAllowedAreaCodes &&
                ContactIsDifferentThanBotNumber &&
                CanYouReceivePostsInPrivate) {
                // logger.info(
                //   ".:: 》》》 Entrei no (isInTheListOfAllowedAreaCodes && ContactIsDifferentThanBotNumber && isBlockContact)《《《 ::.\n- - - - - - - - - - - -- - - - -- - "
                // );
                //se for de um grupo ele pega o número do contato.
                // const [, match] = message.from.match(/(\S+)-/) || [];
                // logger.info("\n.:: Contato: ", match && match);
                // console.table(client.getNumberProfile);
                // logger.info("\n Minha Agenda? ", message.chat.contact.isMyContact);
                // logger.info("\n Id..........:  ", message.chat.contact.id);
                switch (message.type) {
                    case "text":
                        logger_1.logger.info((0, color_1.default)(`\n.:: *》》》Expressão《《《* \n${expr}`, "yellow"));
                        break;
                    case "video":
                        logger_1.logger.info("\n.:: Video Postado...\n");
                        break;
                    case "image":
                        logger_1.logger.info("\n.:: Imagem Postada...\n");
                        break;
                    default:
                        break;
                }
                /******************************************************
                 * traceKey - palavra Oberservada
                 ******************************************************/
                // let traceKey =
                (yield initData_1.allReadTracedKey).forEach((key) => __awaiter(this, void 0, void 0, function* () {
                    // let foundObservation = expr.indexOf(key.title.toUpperCase());
                    // if (foundObservation >= 0) {
                    // const termFound = termFind(key,"title",expr.toUpperCase()).length;
                    const termFound = key.title.find((key) => key.toUpperCase() == expr.toUpperCase());
                    // logger.info("<+> valor de termFound", termFound);
                    if (termFound) {
                        logger_1.logger.info((0, color_1.default)(`\n\n🆀🆄🅴🅼 : ${message.from}`, "lime"), (0, color_1.default)(`\n🅾🆁🅸🆄🅽🅳🅾 🅳🅴 🆄🅼 🅶🆁🆄🅿🅾: ${message.isGroupMsg.valueOf()}`, "yellow"), (0, color_1.default)(`\n░▒▓█►🅿🅰🅻🅰🆅🆁🅰🆂 🅾🅱🆂🅴🆁🆅🅰🅳🅰🆂◄█▓▒░`, "yellow"), (0, color_1.default)(`\n::::::::::::::::::::::::::::::::::::::::\n`, "magenta"), (0, color_1.default)(`\n🅿🅰🅻🅰🆅🆁🅰 🅾🆄 🆃🅴🆁🅼🅾 🅾🅱🆂🅴🆁🆅🅰🅳🅾\n░▒▓█►${expr.toUpperCase()}`, "yellow"), (0, color_1.default)(`\n.:::Texto enviado ao usuário..: ${key.text}`, "yellow"));
                        /**
                         * Aqui ele envia para a pessoa se for oriundo de um grupo ele responde no grupo e no privado.
                         */
                        if (message.isGroupMsg) {
                            logger_1.logger.info(`\n.:: ..::::::... ::.
                \n.:: Grupo ....: ${message.chat.name}
                \n.:: Somente Leitura? ${message.chat.isReadOnly}
                \n.:: Menagem ID: ${message.sender.name}
                \n.:: ..::::::... ::.\n`);
                            try {
                                //Não responderá se for um grupo apenas de leitura: isReadOnly
                                if (!message.chat.isReadOnly) {
                                    //Se for apenas para responder no grupo ou em ambos (privado e Grupo)
                                    if (key.whereToAnswer === "G" ||
                                        key.whereToAnswer === "A") {
                                        yield client
                                            .reply(message.from, key.text ? key.text : "", message.id.toString())
                                            .catch((e) => {
                                            logger_1.logger.error("📌 Error no Retry linha 201 no apt: ", e);
                                        });
                                    }
                                }
                            }
                            catch (error) {
                                logger_1.logger.error(".::: 📌 Identifique o erro: ", error);
                            }
                            // Envia para o Privado do contato.
                            // match.concat("@c.us"),
                            if (key.whereToAnswer === "P" || key.whereToAnswer === "A") {
                                yield client
                                    .sendText(message.sender.id, key.text
                                    ? `Oi, participamos de um grupo em comum *(${message.chat.name})* e observei que você digitou um termo que me sugeriu te enviar essa mensagem.\n\n ${key.text} \n\nPara que você não receba mais mensagens referente ao termo *${termFound}*, basta enviar */sair*\n\nNão esqueça de digitar a *barra antes do comando.* ;)`
                                    : "")
                                    .catch((e) => {
                                    logger_1.logger.info("Error do Macht: ", e);
                                });
                            }
                        }
                        else {
                            //SE for um Direct
                            yield client
                                .sendText(message.from, key.text ? key.text : "")
                                .catch((erro) => {
                                logger_1.logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                            });
                        }
                    }
                })); //traceKey - palavra/Termo Observada
                // //AnuncieAQUI()
                // advertiseHERE({ client: client, message });
            } // end - if (message.from.startsWith("5586")! != message.fromMe) Faz só se for nos DDDs permitidos e que nao seja o número do bot.
            /******************
             * NÃO RODARÁ o código abaixo SE FOR GRUPO
             ******************/
            if (message.isGroupMsg === false &&
                message.from !== "status@broadcast") {
                //.:. exprConvertedInArray:  [ '/SUAVE', 'DE', 'MAIS' ]
                const exprConvertedInArray = expr.split(" ");
                //.:. exprIsCommand [/BELEZA]
                const exprIsCommand = exprConvertedInArray.filter((valor) => valor.includes("/"));
                // if (message.from === "status@broadcast") return true;
                if (message.type === "text") {
                    logger_1.logger.info(`\n.:: Comandos solicitados: ${exprIsCommand}`);
                }
                //* verificando se um comando foi solicitado pelo usuário */
                /**
                 * para cada valor,
                 * deve-se localizar o comando e
                 * a msn para ser exibida.
                 * A EXPRESSÃO É UM COMANDO?
                 */
                if (exprIsCommand) {
                    //Caso  vários comandos tenham sido chamados
                    exprIsCommand.map((valor) => __awaiter(this, void 0, void 0, function* () {
                        let foundCommandUnique = yield (0, initData_1.ReadCommands)(valor);
                        if (foundCommandUnique) {
                            // let aMSN: String = foundCommandUnique
                            logger_1.logger.info(`\n.:: ------------------
                \n.:: Valor de valor é: ${valor}
                \n.:: Registro é: ${foundCommandUnique}
                \n.:: A mensagem é! ::.
                \n${foundCommandUnique.messageCommand}
                \n.:: ------------------`);
                            yield client.sendText(message.from, foundCommandUnique.messageCommand);
                        }
                    }));
                } //Para cada valor, EXPRESSÃO É UM COMANDO?
                /***************************************************
                 * Cardapio verificação dos passos
                 **************************************************/
                try {
                    // let Contato: Contact = await client.getContact(message.from); //Veja linha:429
                    // if (db != {} {}
                    if (banco_1.default) {
                        if (banco_1.default[message.from]) {
                            if (banco_1.default[message.from].stage != 7) {
                                (0, trading_1.Trading)(client, message.from, message.body, message.sender.name, Contato.profilePicThumbObj.eurl);
                            }
                        }
                    } // Cardapio verificação dos passos
                    // if (expr == "/CARDAPIO" || expr == "/CARDÁPIO") {
                    //   logger.info("::::::::::::::::::::::::::::::::::::::::::::::");
                    //   logger.info("::. 》》》ROTINA DE NEGOCIAÇÃO ATIVADA 《《《.::");
                    //   logger.info("::::::::::::::::::::::::::::::::::::::::::::::");
                    //   Trading(
                    //     client,
                    //     message.from,
                    //     message.body,
                    //     message.sender.name,
                    //     Contato.profilePicThumbObj.eurl
                    //   );
                    // } // Cardapio Solicitado mudei parao case switch
                    // logger.info(" ::..................");
                    // logger.info(".:: Conteudo de DB ::.", db);
                    // logger.info(" ::..................");
                    // : WhatsappProfile
                    // let profile = client.getContact.name
                    //------------------ movi para a cima
                    // let profile: any = await client.getNumberProfile(message.from);
                    // let usuario = profile.id.user;
                    // console.info(".:: USUÁRIO .............: ", usuario);
                    // await prisma.$connect();
                    if (expr == "/SAIR") {
                        client
                            .sendText(message.from, `Olá, ${message.sender.name}! \nVejo que você não deseja mais receber nossas postagens, *evitaremos enviar de agora em diante*, agradecemos sua atenção e desejamos um bom trabalho e prosperidade!!!`)
                            .catch((erro) => {
                            logger_1.logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                        });
                        logger_1.logger.info(`\n::.🔥 》》》${message.from}, pediu para não mais receber postagens! .::`);
                        // let blackContactValeu = true;
                    } // (expr == "/SAIR")
                    // logger.info(".:: Veja o quem Encontrei: ", wfound);
                    logger_1.logger.info(`\n.:: Apelido: ${Contato.pushname}\n.:: Nome...: ${Contato.name}`);
                    //Se não encontrou, Salva
                    if (!wfound) {
                        logger_1.logger.info(`\n.:: É o primeiro contato... de ${usuario}\nvindo de: ${message.from}`);
                        //Construindo o menu de Opções
                        // const TitleList = "Clique na sua opção",
                        //   const  subTileList,
                        //  const descriptionList,
                        //  const buttonTextList,
                        //  const menuList,
                        // // await client.sendText(message.from, `Olá, *${
                        //   Contato?.pushname || Contato?.name
                        // }!* como posso lhe ajudar?`);
                        // await client.sendListMenu(
                        //   message.from,
                        //   TitleList,
                        //  subTileList,
                        //  descriptionList,
                        //  buttonTextList,
                        //  menuList,
                        // );
                        // Send List menu
                        //This function does not work for Bussines contacts
                        // const list = [
                        //   {
                        //     title: "Bot 5 Estrelas - Divulgando e Captando leads",
                        //     rows: [
                        //       {
                        //         title: "Quero divulgar meu negócio",
                        //         description:
                        //           "Fiquei interessado em captar mais clientes, quero divulgar meu negócio.",
                        //       },
                        //     ],
                        //   },
                        //   {
                        //     title: "Como adquirir minha MOTO NOVA!",
                        //     rows: [
                        //       {
                        //         title: "Reinaldo Rodriques - Motos HONDA",
                        //         description: "Consórcio Nacional HONDA - Motos",
                        //       },
                        //     ],
                        //   },
                        //   {
                        //     title: "Personalizados de Luxo e Papelaria.",
                        //     rows: [
                        //       {
                        //         title: "Close Friends - Grupo fechado para treinamento",
                        //         description: "Quero saber mais sobre o grupo",
                        //       },
                        //     ],
                        //   },
                        //   {
                        //     title: "AutoPac Acessórios, tudo para o seu veículo",
                        //     rows: [
                        //       {
                        //         title: "Pecas para o seu veículo",
                        //         description: "Quero ver se temos essa peça",
                        //       },
                        //     ],
                        //   },
                        //   {
                        //     title: "Signus.It - Sua Assitência 24h",
                        //     rows: [
                        //       {
                        //         title: "Manutenção em equipamenteos de Informática",
                        //         description:
                        //           "Resolvendo problemas com equipamentos de informática",
                        //       },
                        //     ],
                        //   },
                        //   {
                        //     title: "LeAuto - Serviços Automotivos",
                        //     rows: [
                        //       {
                        //         title: "Aqui resolvemos os problemas do seu carro!",
                        //         description: "Necessitando de um serviço de carro?",
                        //       },
                        //     ],
                        //   },
                        //   {
                        //     title: "Um outro assunto para conversar",
                        //     rows: [
                        //       {
                        //         title: "Quero conversar sobre outra coisa!",
                        //         description: "Te aguardo!",
                        //       },
                        //     ],
                        //   },
                        // ];
                        // 🆂🅴🅻🅴🅲🅸🅾🅽🅴 🆄🅼🅰 🅾🅿🅲🅰🅾 🅰🅱🅰🅸🆇🅾!
                        // Crar em forma de Button ..
                        // await client.sendButtons(message.from, list);
                        // client.sendButtons(to: string, title: string, buttons: [], subtitle: string_');
                        // enderLayer.sendListMenu(to: string, title: string, subTitle: string, description: string, buttonText: string, menu: any[])
                        /**
                         * Só funciona em whatsapp comum
                         */
                        // await client
                        //   .sendListMenu(
                        //     message.from,
                        //     "Olá, seja bem vindo ao nosso WhatsApp!",
                        //     "ᔕᕮᒪᕮᑕƗ〇ᘉᕮ ᑌᗰᗩ 〇ᑭᑕᗩ〇 ᗩᙖᗩƗ᙭〇!",
                        //     "Clique no botão menu abaixo e escolha entre as opções. Rolando até o final tem a opção para falar comigo diretamente!",
                        //     "menu",
                        //     list
                        //   )
                        //   .then((result) => {
                        //     logger.info("Result: ", result); //return object success
                        //   })
                        //   .catch((erro) => {
                        //     logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                        //   });
                        /**
                         * solicita que me adicione na agenda do whatsapp e assim
                         * poder usdar o status e postar no privado
                         */
                        yield client.sendText(message.from, "Oi, tudo bem?\nTe Retornarei o mais breve possível!!!\n\nMe adicione na sua agenda, facilitando assim nossa comunicação! \n---\nⓂⓔⓝⓢⓐⓖⓔⓜ ⓐⓤⓣⓞⓜⓐⓣⓘⓒⓐ\n乃5 - divulgações");
                        yield client.sendContactVcard(message.from, "558688410678@c.us");
                        /**
                         * link de convite para entrar no meu Grupo Geral
                         * povando o grupo automaticamente
                         */
                        yield client
                            .sendLinkPreview(message.sender.id, "https://bit.ly/3sMru0z", "Venha participar do nosso grupo de divulgação! \nⒷⓞⓣ ❺ Ⓔⓢⓣⓡⓔⓛⓐⓢ - divulgação\n\nMenssagem automática...")
                            .catch((erro) => __awaiter(this, void 0, void 0, function* () {
                            yield client.sendText(message.sender.id, "Venha participar do nosso grupo de divulgação! \nⒷⓞⓣ ❺ Ⓔⓢⓣⓡⓔⓛⓐⓢ - divulgação\nhttps://bit.ly/3sMru0z");
                            // logger.info(
                            //   "░▒▓█►Usando o sendText -  grupo >>>>",
                            //   message.chat.name
                            // );
                            logger_1.logger.error("Erro: ", erro);
                        }));
                        // logger.info("》》》Tudo indica que SALVOU OS DADOS .::.");
                        return;
                    }
                    else {
                        //TODO -Não é a primeira vez... Não vou gravar nada no DB, pois esse profile já consta lá!
                        if (expr == "/SAIR") {
                            yield lib_prisma_1.default.whatsLeadContact.updateMany({
                                where: {
                                    user: Contato.id.user,
                                },
                                //  select: { user: Contato.id.user },
                                data: {
                                    blackContact: true,
                                },
                            });
                        } // (expr == "/SAIR")
                        yield lib_prisma_1.default.registeredConctat.create({
                            data: {
                                user: Contato.id.user,
                                messagebody: message.type === "video" || message.type === "image"
                                    ? "Video ou Imagem"
                                    : expr,
                                Status: expr != "/SAIR" ? "A" : "S",
                            },
                        });
                        logger_1.logger.info(".:: Um cliente já recorrente, salvando apenas a notificação de presença.");
                        const registeredConctatCount = yield lib_prisma_1.default.registeredConctat.count({
                            where: {
                                user: usuario,
                            },
                        });
                        logger_1.logger.info(`\n.:: Qt. de Interações....: ${registeredConctatCount}
                 \n.:: Data do contato......: ${new Date().toLocaleString()}
                 \n::::::::::::::::::::::::::::::::::::::::::::`);
                        /**
                         * Verifica se a mensagem é uma iteração programada
                         **/
                        (yield allInteractions).forEach((key) => __awaiter(this, void 0, void 0, function* () {
                            if (key.positionOrder == JSON.stringify(registeredConctatCount)) {
                                const returnText = key.text;
                                logger_1.logger.info(`\n::CHAMADA PARA AÇÃO COM (n) INTERAÇÕES::\n::Texto enviado ao usuário..: ${returnText}`);
                                if (returnText != "") {
                                    yield client.sendText(message.from, returnText);
                                    // returnText ? returnText : "..."
                                }
                            }
                        }));
                        // return;
                    }
                }
                catch (error) {
                    logger_1.logger.info((0, color_1.default)(`📌 Ocorreu um Erro: ${error}, tente novamente!`, "red"), (0, color_1.default)("[REINICIANDO O BOT]", "yellow"));
                    return client.restartService();
                    // if (isVerbose) {
                    //   if (message.type === "video" || message.type === "image") {
                    //     logger.info("\n.:: Video ou Imagem Postada...");
                    //     logger.info(".:: Por: ", message.chat.contact.pushname);
                    //     logger.info(".:: É grupo: ", message.isGroupMsg);
                    //   }
                    //   return;
                    // }
                } // catch
            } //SE não for grupo, não roda o codigo acima
            /**
             * Anuncia nos grupos
             * Se o Ultimo comando for uma atualizaco ele passa essa rotina para
             * não quebrar e regerar os arrays em sues novos endereços na memória.
             * */
            if (expr !== "!!UPDATEDB") {
                // await advertiseHERE({ clientInstance: client, message });
                try {
                    let whoWas = message.from;
                    // let testMode = false;
                    const start = new Date().getTime();
                    let myChatNow = yield client.getChatById(message.from);
                    if (message.isGroupMsg && !myChatNow.isAnnounceGrpRestrict) {
                        if (initData_1.allCampaignsInTheGroups) {
                            let AutoPost = Math.floor(Math.random() * Object.keys(initData_1.allCampaignsInTheGroups).length);
                            let caminhoDoArquivo = initData_1.allCampaignsInTheGroups[AutoPost].ImageFilePath;
                            let nomeDoArquivo = initData_1.allCampaignsInTheGroups[AutoPost].ImageFileName;
                            let oPost = initData_1.allCampaignsInTheGroups[AutoPost].Post;
                            let oDocfile = initData_1.allCampaignsInTheGroups[AutoPost].DocFilePath;
                            let oDocName = initData_1.allCampaignsInTheGroups[AutoPost].DocFileName;
                            // let aTag = allCampaignsInTheGroups[AutoPost].tag
                            if (exports.isVerbose) {
                                //criando as tag para totalização de entregas
                                // logger.info(`**********************`);
                                logger_1.logger.info(`❶ AutoPost: ${AutoPost}`);
                                // logger.info("tamanho: ", Object.keys(allCampaignsInTheGroups).length);
                                // logger.info(
                                //   "(2) allCampaignsInTheGroups: ",
                                //   JSON.stringify(allCampaignsInTheGroups, null, 2) //dica de prettei
                                // );
                                console.dir(`🆃🅰🅶: ${initData_1.allCampaignsInTheGroups[AutoPost].tag}`);
                                logger_1.logger.info(`░▒▓█►grupo >>>> ${message.chat.name}`);
                                // logger.info(`**********************`);
                            }
                            if (!initData_1.campaignBalance[initData_1.allCampaignsInTheGroups[AutoPost].tag]) {
                                initData_1.campaignBalance[initData_1.allCampaignsInTheGroups[AutoPost].tag] = 0;
                                if (initData_1.allCampaignsInTheGroups[AutoPost].messageLink) {
                                    yield client
                                        .sendLinkPreview(whoWas, initData_1.allCampaignsInTheGroups[AutoPost].channelLink, oPost)
                                        .catch((erro) => __awaiter(this, void 0, void 0, function* () {
                                        yield client
                                            .sendText(whoWas, oPost)
                                            .catch((erro) => {
                                            logger_1.logger.error("Error when sending: (l2315)", JSON.stringify(erro, null, ' ')); //return object error
                                        });
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
                                }
                            }
                            if (!initData_1.InteractingGroup[whoWas]) {
                                initData_1.InteractingGroup[whoWas] = 1;
                            }
                            else {
                                initData_1.InteractingGroup[whoWas] += 1;
                                if (initData_1.InteractingGroup[whoWas] === 1 ||
                                    initData_1.InteractingGroup[whoWas] === initData_1.intervalOf) {
                                    logger_1.logger.info((0, color_1.default)(`\n░▒▓█►─═🅴🅽🆅🅸🅰🅽🅳🅾 🅿🅾🆂🆃🅰🅶🅴🅼 🅰🆄🆃🅾🅼🅰🆃🅸🅲🅰 🅿🅰🆁🅰 🅾 🅶🆁🆄🅿🅾═─◄█▓▒░\n*》》》${whoWas} (${(_b = message.chat) === null || _b === void 0 ? void 0 : _b.name}) \nInteração n: ${initData_1.InteractingGroup[whoWas]} de ${initData_1.intervalOf}《《《*`, "green"));
                                    //Só envia na primeira vez que entrar no grupo
                                    if (!initData_1.InteractingGroup[whoWas]) {
                                        yield client
                                            .sendText(message.from, "Olá a todos! \nPostarei aqui minha propaganda, espero não causar nenhum transtorno aos administradores e espero não estar infringindo nenhuma regra do grupo!")
                                            .catch((erro) => {
                                            logger_1.logger.error("Error when sending: (l2357)", JSON.stringify(erro, null, ' ')); //return object error
                                        });
                                    }
                                    try {
                                        console.log((0, color_1.default)(`\n\n░▒▓█►─═Dados que serão enviados 🅰🆄🆃🅾 🅿🅾🆂🆃\n`, "yellow"), (0, color_1.default)(`.:. 🆃🅰🅶: ${initData_1.allCampaignsInTheGroups[AutoPost].tag}\n`, "yellow"));
                                        const channel = JSON.stringify(initData_1.allCampaignsInTheGroups[AutoPost].channelLink);
                                        const post = oPost;
                                        try {
                                            // //Enviando o Link com o Posta padrão
                                            if (caminhoDoArquivo) {
                                                yield client.sendImage(whoWas, caminhoDoArquivo, nomeDoArquivo).then((result) => {
                                                    console.log((0, color_1.default)(`\nResult: ${result}`, "magenta")); //return object success
                                                }).catch((erro) => __awaiter(this, void 0, void 0, function* () {
                                                    logger_1.logger.error(`Error when sending: l(2389) ${JSON.stringify(erro, null, 2)}`); //return object error
                                                    console.error((0, color_1.default)(`Error when sending: l(2389) ${JSON.stringify(erro, null, 2)}`, "magenta")); //return object error
                                                    // logger.info(
                                                    //   color(`ImagemPath: ${caminhoDoArquivo}`, "yellow"),
                                                    //   // color(`Name: ${nomeDoArquivo}`, "blue"),
                                                    //   // color(`Post: ${oPost}`, "yellow")
                                                    // )
                                                    yield client
                                                        .sendText(whoWas, oPost)
                                                        .catch((erro) => {
                                                        logger_1.logger.error("Error when sending: (l22403)", JSON.stringify(erro, null, ' ')); //return object error
                                                    });
                                                }));
                                            }
                                            // await data.client.sendFile(number, dir + name, 'Video', req.body.caption)
                                            //Enviado Doc, Pdf etc...
                                            if (oDocfile) {
                                                yield client
                                                    .sendFileFromBase64(whoWas, oDocfile, oDocName, oPost
                                                // allCampaignsInTheGroups[AutoPost].DocCaption
                                                )
                                                    .catch((erro) => {
                                                    logger_1.logger.error("Error when sending: (l2404)", JSON.stringify(erro, null, ' ')); //return object error
                                                });
                                            }
                                            // await client.sendLinkPreview(whoWas, channel, post);
                                            //"https://www.youtube.com/watch?v=V1bFr2SWP1I", -> festival de motos
                                            if (initData_1.allCampaignsInTheGroups[AutoPost].messageLink) {
                                                yield client
                                                    .sendLinkPreview(whoWas, initData_1.allCampaignsInTheGroups[AutoPost].channelLink, initData_1.allCampaignsInTheGroups[AutoPost].Post)
                                                    .catch((erro) => __awaiter(this, void 0, void 0, function* () {
                                                    yield client.sendText(whoWas, post);
                                                    logger_1.logger.info("░▒▓█►Usando o sendText -  grupo >>>>", message.chat.name);
                                                    logger_1.logger.error("Error when sending: (l2422)", JSON.stringify(erro, null, ' ')); //return object error
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
                                                // await client
                                                //   .sendButtons(
                                                //     message.from,
                                                //     "Venha para o próximo nível!",
                                                //     buttons,
                                                //     "Você pode participar de um novo grupo, clicando no botão abaixo"
                                                //   )
                                                //   .then((result) => {
                                                //     logger.info("Result: ", result); //return object success
                                                //   })
                                                //   .catch((erro) => {
                                                //     logger.error("Error when sending: ", JSON.stringify(erro, null, ' ')); //return object error
                                                //   });
                                            }
                                            // //Enviando Audio se tiver no final de todas as outras.
                                            if (initData_1.allCampaignsInTheGroups[AutoPost].AudioFilePath) {
                                                yield client
                                                    .sendVoice(whoWas, initData_1.allCampaignsInTheGroups[AutoPost].AudioFilePath)
                                                    .catch((erro) => {
                                                    logger_1.logger.error("Error when sending: (l2461)", JSON.stringify(erro, null, ' ')); //return object error
                                                });
                                            }
                                            //Para saber Nome do grupo onde foi postado
                                        }
                                        catch (error) {
                                            console.dir(error);
                                        }
                                        initData_1.campaignBalance[initData_1.allCampaignsInTheGroups[AutoPost].tag] += 1;
                                    }
                                    catch (err) {
                                        logger_1.logger.error(`erro ao enviar mensagem ao grupo ${initData_1.InteractingGroup[whoWas]} o erro foi(l2476): ${err}`);
                                    }
                                    initData_1.InteractingGroup[whoWas] = 0;
                                    (0, sleep_1.sleep)(3000);
                                    // InteractingGroup[whoWas] = 0;
                                    //TODO - Depois criar uma colection para armazenar os grupos naqual estão sendo postados e a quantidade de vezes que foi postado
                                    try {
                                        // await prisma.$connect();
                                        const [campaignBalanceSave] = yield lib_prisma_1.default.$transaction([
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
                                    }
                                    catch (error) {
                                        logger_1.logger.error((0, color_1.default)(`[ERROR(l2504)] ${error}`, "red"));
                                    }
                                    // finally {
                                    //   await prisma.$disconnect();
                                    // }
                                }
                                //só para ganrantir que ficará zerado.
                                if (initData_1.InteractingGroup[whoWas] > initData_1.intervalOf) {
                                    initData_1.InteractingGroup[whoWas] = 0;
                                }
                            }
                            if (exports.isVerbose) {
                                const object2 = Object.fromEntries(Object.entries(initData_1.InteractingGroup).map(([key, val]) => [key, val]));
                                // \n
                                //   ${object2.}
                                logger_1.logger.info((0, color_1.default)(`░▒▓█►─═🅾🆂 🅶🆁🆄🅿🅾🆂 🅴 🆂🆄🅰🆂 🅸🅽🆃🅴🆁🅰🅲🅾🅴🆂═─◄█▓▒░\n
                    Grupos em movimento: ${Object.keys(initData_1.InteractingGroup).length}
                                  \n ********************** `, "magenta"));
                                if (initData_1.allCampaignsInTheGroups) {
                                    logger_1.logger.info((0, color_1.default)(`\n\n░▒▓█►─═[b̲̅α̲̅l̲̅α̲̅и̲̅ç̲̅σ̲̅ ̲̅d̲̅є̲̅ ̲̅c̲̅α̲̅м̲̅ρ̲̅α̲̅и̲̅н̲̅α̲̅] ═─◄█▓▒░`, "magenta"));
                                    // const [error, result] = await to(
                                    yield initData_1.allCampaignsInTheGroups.map((gp) => __awaiter(this, void 0, void 0, function* () {
                                        if (initData_1.campaignBalance[gp.tag]) {
                                            console.log((0, color_1.default)(`\n${gp.tag}.:.`, "cyan"), (0, color_1.default)(`${initData_1.campaignBalance[gp.tag]}`, "yellow"));
                                        }
                                    }));
                                    // logger.info(color(`********************** `, "yellow"));
                                }
                            }
                            else {
                                /** Só exibirá a lista do Balanço em N ciclos */
                                if (exports.cycle === exports.numberOfCycles) {
                                    logger_1.logger.info((0, color_1.default)(`\n ********************** `, "yellow"), (0, color_1.default)(`\n.:: Quantidade de grupos em movimento: `, "yellow"), (0, color_1.default)(`${Object.keys(initData_1.InteractingGroup).length}`, "yellow"));
                                    if (initData_1.allCampaignsInTheGroups) {
                                        logger_1.logger.info((0, color_1.default)(`\n\n░▒▓█►─═[b̲̅α̲̅l̲̅α̲̅и̲̅ç̲̅σ̲̅ ̲̅d̲̅є̲̅ ̲̅c̲̅α̲̅м̲̅ρ̲̅α̲̅и̲̅н̲̅α̲̅] ═─◄█▓▒░`, "magenta"));
                                        // const [error, result] = await to(
                                        yield initData_1.allCampaignsInTheGroups.map((gp) => __awaiter(this, void 0, void 0, function* () {
                                            if (initData_1.campaignBalance[gp.tag]) {
                                                console.log((0, color_1.default)(`\n░▒▓█►─═${gp.tag}.:.`, "magenta"), (0, color_1.default)(`${initData_1.campaignBalance[gp.tag]}̅] ═─◄█▓`, "yellow"));
                                            }
                                        }));
                                        // color(`********************** `, "yellow");
                                    }
                                }
                                (exports.cycle < exports.numberOfCycles) ? exports.numberOfCycles = 0 : exports.numberOfCycles++;
                            }
                        } //if readonly
                        // }
                        if (initData_1.InteractingGroup[whoWas] >= initData_1.intervalOf) {
                            initData_1.InteractingGroup[whoWas] = 0;
                        }
                    } // *》》》FIM DO ANUNCIE AQUI《《《*
                    const elapsed = new Date().getTime() - start;
                    const momento = new Date().toLocaleString();
                    return logger_1.logger.info(
                    // color(`\n----`, "crimson"),
                    (0, color_1.default)(`\nLevou ${elapsed}ms`, "yellow"), (0, color_1.default)(`\nMomento ${momento}`, "lime"));
                }
                catch (error) {
                    return logger_1.logger.error((0, color_1.default)(`[ERROR] - advertiseHERE: grupos em Movimento, ${error}`, "red"));
                }
            }
        }));
        // .catch((error) => {
        //   logger.info(
        //     color(`📌 Ocorreu um Erro: ${ error }, tente novamente!`, "red"),
        //     color("[REINICIANDO O BOT]", "yellow")
        //   );
        //   client.restartService();
        // });
    });
} //gerandoListaPeloWhatsapp
exports.B5Main = B5Main;
