import { TCPServer } from './network/TCPServer';

const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const server = new TCPServer(port);
server.start();
