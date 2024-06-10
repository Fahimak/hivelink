"use client";
import { useEffect, useRef } from "react";
import ChatRoomDetail from "views/Chats/ChatRoomDetail";
import { useChatMessages } from "views/Chats/ChatRoomPage/useChatMessages";

// interface Props {
//   roomId: string;
// }

const ChatRoomDetailInit = ({ params }: { params: { roomId: string } }) => {
  const { chatList } = useChatMessages(params.roomId);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollChatToBottom = () => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container on initial load and when chatList changes
    scrollChatToBottom();
  }, [chatList]);

  return (
    <div className="" ref={chatContainerRef}>
      <ChatRoomDetail roomId={params.roomId} />
    </div>
  );
};

export default ChatRoomDetailInit;
