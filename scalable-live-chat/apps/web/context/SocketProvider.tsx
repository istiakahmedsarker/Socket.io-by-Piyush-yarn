"use client"
import React, { useCallback, useEffect } from 'react';
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

    useEffect(()=>{
        const _socket = io('http://localhost:8000')

        return ()=>{
            _socket.disconnect();
        }
    },[])
    return (
        <SocketContext.Provider value={{sendMessage}}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;