"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const SOCKET_URL =
  "wss://veehiveservice.uaenorth.cloudapp.azure.com/chat/app/socket";

interface UseSocketReturn {
  isConnected: boolean;
  socket: any;
}

export const useSocket = (): UseSocketReturn => {
  const socket = useRef(
    io(SOCKET_URL, {
      autoConnect: false,
      transports: ["websocket"],
      reconnectionDelay: 10000,
    })
  ).current;

  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setIsConnected(socket.connected);
    });
    socket.on("disconnect", () => {
      setIsConnected(socket.connected);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.close();
    };
  }, [socket]);

  return {
    isConnected,
    socket,
  };
};
