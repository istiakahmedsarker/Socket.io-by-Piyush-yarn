import http from "http";
import SocketService from "./services/socket";

async function init() {
    const socketService = new SocketService();
    const httpServer = http.createServer();
    const PORT = process.env.PORT || 8000;

    socketService.io.attach(httpServer);

    socketService.initListeners(); // Corrected line

    httpServer.listen(PORT, () => console.log(`HTTP server listening on ${PORT}`));
}

init();
