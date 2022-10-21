"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
if (process.env.NODE_ENV === "production") {
    prisma = new client_1.PrismaClient();
}
else {
    if (!global.prisma) {
        global.prisma = new client_1.PrismaClient();
    }
    prisma = global.prisma;
}
exports.default = prisma;
// import { PrismaClient } from "@prisma/client";
// declare global {
//   // allow global `var` declarations
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }
// export const prisma = global.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== "production") global.prisma = prisma;
//# sourceMappingURL=lib.prisma.js.map