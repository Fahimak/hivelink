import { ChatItem, useChatContext } from "context/chat";
import { useEffect, useState, useCallback } from "react";

type ReturnType = {
  isShowSearchControls: boolean;
  chatListWithMention: ChatItem[];
  detectSearchSymbol: (message: string) => void;
  closeSearchControls: () => void;
  chatListWithMentionLength: number;
};

const regexpTrigger = /^\/me$/g;

const isNeedFound = (chatMessage: string): boolean => {
  return !!chatMessage.match(regexpTrigger);
};

export const useSearchMe = (
  chatRoomId: string,
  userId: UserId | null
): ReturnType => {
  const chat = useChatContext();

  const chatListWithMention = chat.getChatListWithMentionSelector();
  const chatListWithMentionLength = chatListWithMention.length;
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const detectSearchSymbol = useCallback((chatMessage: string) => {
    setIsSearch(isNeedFound(chatMessage));
  }, []);

  const closeSearchControls = useCallback(() => {
    setIsSearch(false);
  }, []);

  useEffect(() => {
    if (chatRoomId && userId && isSearch) {
      //   dispatch(getChatMessagesWithUserMentions({ chatRoomId, userId }));
    }
  }, [chatRoomId, isSearch, userId]);

  useEffect(() => {
    if (!isSearch && chatListWithMention.length) {
      //   dispatch(clearChatListWithMentioning());
    }
  }, [chatListWithMention, isSearch]);

  return {
    isShowSearchControls: isSearch,
    chatListWithMention,
    detectSearchSymbol,
    closeSearchControls,
    chatListWithMentionLength,
  };
};
