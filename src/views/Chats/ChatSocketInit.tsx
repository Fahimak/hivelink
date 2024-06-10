"use client";
import { useChatContext } from "context/chat";
import { useChatsSocket } from "services/socket";

const ChatSocketInitiation = () => {
  const chat = useChatContext();

  const chatRoomId = chat.chatRoomId;

  useChatsSocket(chatRoomId || "");

  return <></>;
};

export default ChatSocketInitiation;
