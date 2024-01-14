import { Server } from "socket.io";

class SocketService{
    private _io: Server;
    constructor(){
        console.log("Init SocketService");
        this._io = new Server();
    }

    public initListeners(){
        const io = this.io;
        io.on('connect',socket =>{
            console.log(`New Socket Connected to ${socket.id}`);
            socket.on('event:message', async({message}:{message:string})=>{
                console.log("New Message received",message)
            })
        })
    }
    get io(){
        return this._io;
    }
}

export default SocketService;