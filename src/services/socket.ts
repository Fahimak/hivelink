"use client";
import { useEffect, useState, useCallback } from "react";

import io from "socket.io-client";
import { MessageSocketResponse } from "api/models/Chat/chat";
import { useChatContext } from "context/chat";
import { getProfileIdCookie } from "utils/clientCookies";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL as string;

interface UseSocketReturn {
  isConnected: boolean;
}

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
  reconnectionDelay: 10000,
});

export const useChatsSocket = (roomId: string): UseSocketReturn => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  const userId = +(getProfileIdCookie || 0); ///1746 the mock id

  const chat = useChatContext();

  const handleGetMessage = useCallback(
    (newMessage: MessageSocketResponse) => {
      chat.addNewMessage(newMessage.message);
      console.log(newMessage);
    },
    [chat]
  );

  useEffect(() => {
    if (!socket.connected) {
      // console.log("chat room connecting");
      socket.connect();
    }

    socket.on("connect", () => {
      // console.log("chat room connected");
      setIsConnected(socket.connected);
    });

    socket.on("disconnect", () => {
      // console.log("chat room disconnected");
      setIsConnected(socket.connected);
    });

    return () => {
      // console.log("chat room disconnect");
      socket.off("connect");
      socket.off("disconnect");
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (isConnected && roomId && userId) {
      //console.log('Subscribe: ', roomId, userId)
      socket.emit("subscribe", {
        chatRoomId: roomId,
        userId: userId,
      });

      socket.on("message", handleGetMessage);
    }

    return () => {
      if (isConnected && roomId && userId) {
        //console.log('Unsubscribe: ', isConnected, roomId, userId)
        socket.off("message");
        socket.emit("unsubscribe", {
          chatRoomId: roomId,
          userId: userId,
        });
      }
    };
  }, [roomId, isConnected, userId, handleGetMessage]);

  return {
    isConnected,
  };
};
