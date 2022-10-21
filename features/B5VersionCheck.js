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
exports.B5VersionCheck = void 0;
const axios_1 = __importDefault(require("axios"));
const color_1 = __importDefault(require("./color"));
const yoo_hoo_1 = require("yoo-hoo");
/**
 * B5VersionCheck: Verifica a versão do botReports
 * @returns Se há atualização, retorna a versão atual
 */
const B5VersionCheck = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const b5version = require("../../package.json");
        /** vamos ver a versão? */
        const getversion = yield axios_1.default.get("https://raw.githubusercontent.com/Losangelo/B5/main/package.json");
        if (b5version.version !== getversion.data.version) {
            console.log((0, color_1.default)("\n[UPDATE]", "crimson"), (0, color_1.default)(`Uma nova versão bo 乃5 foi lançada [${getversion.data.version}], atualize para obter melhorias e correções! → ${b5version.homepage}`, "gold"));
        }
        console.log((0, color_1.default)("\n[SUPORTE ou CONTRATAÇÃO]", "yellow"), (0, color_1.default)(`https://bit.ly/3siAr1A\n`, "lime"), (0, color_1.default)(`\n[乃5 ${b5version.version} - BETA]`, "white"), (0, color_1.default)("Estamos prontos para começar!\n", "lime"));
        console.log((0, color_1.default)('\nWelcome to', "yellow"), (0, color_1.default)("B5", "white"), (0, color_1.default)("Bot", "yellow"), (0, color_1.default)("\n\n", "white"));
        (0, yoo_hoo_1.yo)('Bot-B5', {
            color: 'rainbow',
            spacing: 1,
        });
        console.log(`\n\n`);
    }
    catch (error) {
        console.log((0, color_1.default)(`[ERRO - B5VersionCheck] ${error}`, "red"));
    }
});
exports.B5VersionCheck = B5VersionCheck;
//# sourceMappingURL=B5VersionCheck.js.map