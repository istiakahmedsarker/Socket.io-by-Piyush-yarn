import { Server } from "socket.io";
import Redis from 'ioredis'

const pub = new Redis({
    host:'redis-8e9744d-gestiak08-ee37.a.aivencloud.com',
    port:13334,
    username:'default',
    password:'AVNS_agUZ0CFE4jkXOCcw5VE'
})
const sub = new Redis({
    host:'redis-8e9744d-gestiak08-ee37.a.aivencloud.com',
    port:13334,
    username:'default',
    password:'AVNS_agUZ0CFE4jkXOCcw5VE'
})

class SocketService{
    private _io: Server;
    constructor(){
        console.log("Init SocketService");
        this._io = new Server({
            cors:{
                allowedHeaders: ["*"],
                origin: "*"
            }
        });
        
        sub.subscribe('MESSAGES')
    }

    public initListeners(){
        const io = this.io;
        console.log("Init socket listeners...");
        io.on('connect',(socket) =>{
            console.log(`New Socket Connected to `, socket.id);
            socket.on('event:message', async({message}:{message:string})=>{
                console.log("New Message received",message)

                await pub.publish('MESSAGES',JSON.stringify({message}))
            })
        })

    }
    get io(){
        return this._io;
    }
}

export default SocketService;