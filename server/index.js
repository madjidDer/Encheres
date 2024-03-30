import http from "http";
import RequestController from "./scripts/request-controller.js";
import SocketController from "./scripts/socket-controller.js";
import { Server as ServerIO } from "socket.io";


const server = http.createServer((request, response) =>
  new RequestController(request, response).handleRequest()
);

const port = 8080;
server.listen(port);
console.log(`>>> server running on port ${port} <<<`);
const io = new ServerIO(server);
const socketController = new SocketController(io);
io.on('connection', socket => socketController.registerSocket(socket) );

