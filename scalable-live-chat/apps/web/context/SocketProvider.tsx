"use client"
import React, { useCallback } from 'react';
import { createContext } from 'vm';
import { io } from "socket.io-client";

interface SocketProviderProps{
    children?:React.ReactNode;
}

interface ISocketContext{
    sendMessage:(msg:string)=>any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

const SocketProvider: React.FC<SocketProviderProps> = ({children}) => {
    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg)=>{
        console.log("Send Message", msg);
    },[])
    return (
        <SocketContext.Provider value={{sendMessage}}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;