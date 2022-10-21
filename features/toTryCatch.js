"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Função para
 * substituir o try|catch
 */
const to = (promise) => promise.then((result) => [null, result]).catch((error) => [error]);
exports.default = to;
//# sourceMappingURL=toTryCatch.js.map