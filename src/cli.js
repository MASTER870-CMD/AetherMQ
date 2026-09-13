"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TCPServer_1 = require("./network/TCPServer");
const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const server = new TCPServer_1.TCPServer(port);
server.start();
//# sourceMappingURL=cli.js.map