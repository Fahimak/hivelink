import { getChatMessages } from "api/routes/Chat/chat";
import { ChatItem, useChatContext } from "context/chat";
import { useEffect, useRef, useCallback } from "react";
import { getProfileUuidCookie } from "utils/clientCookies";

const LOAD_LIMIT = 30;

interface UseChatMessagesReturn {
  loadMoreMessageList: () => void;
  chatList: ChatItem[];
  isLoading: boolean;
}

export const useChatMessages = (roomId: string): UseChatMessagesReturn => {
  const chat = useChatContext();

  const page = useRef<number>(0);
  const hasAllLoaded = useRef<boolean>(false);
  const profileId = getProfileUuidCookie || "";

  const chatList = chat.getChatListSelector(chat.chatList);

  const chatMessagesLenght = chat.chatList.length;
  const isLoading = chat.isFetching;

  const loadMoreMessageList = useCallback(() => {
    if (chatMessagesLenght < LOAD_LIMIT - 1 || isLoading) return;
    if (profileId && !hasAllLoaded.current) {
      getChatMessages(roomId, profileId, page.current + 1).then((res) => {
        if (res.length) {
          page.current = page.current + 1;
        } else {
          hasAllLoaded.current = true;
        }
      });
    }
  }, [chatMessagesLenght, isLoading, profileId, roomId]);

  useEffect(() => {
    chat.setChatPageNo(page.current);
    chat.setChatRoomId(roomId);
  }, [page, roomId]);

  return { loadMoreMessageList, chatList, isLoading };
};
