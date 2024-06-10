import { createContext, useContext, FC, useMemo } from "react";

import Chat from "./Chat";
import { ChatItem, UsersListForMentioning } from "context/chat";

interface ChatProps {
  sendMessage: (params: SendMessageParams) => Promise<void>;
  chatList: ChatItem[];
  chatRoomId?: string;
  handlePagginationUpdate?: () => void;
  loading?: boolean;
  loadingAttachment?: boolean;
  usersList?: UsersListForMentioning[];
  isShowSearchControls?: boolean;
  detectSearchSymbol?: (m: string) => void;
  closeSearchControls?: () => void;
  searchMentionMessagesCount?: number;
}

interface ChatContextValues {
  handlePagginationUpdate?: () => void;
  chatRoomId?: string;
  sendMessage: (params: SendMessageParams) => Promise<void>;
}

interface ChatSearchMentioningMessageContext {
  isShowSearchControls?: boolean;
  detectSearchSymbol?: (m: string) => void;
  closeSearchControls?: () => void;
  searchMentionMessagesCount?: number;
}

const ChatListContext = createContext<ChatItem[]>([]);
const ChatContext = createContext<ChatContextValues>({} as ChatContextValues);
const ChatUserMentionigContext = createContext<UsersListForMentioning[]>([]);
const ChatSearchMentioningMessagesContext =
  createContext<ChatSearchMentioningMessageContext>(
    {} as ChatSearchMentioningMessageContext
  );

const ChatLoadingContext = createContext<boolean>(false);
const ChatLoadingAttachmentContext = createContext<boolean>(false);

const ContextContainer: FC<ChatProps> = ({
  chatList,
  usersList = [],
  loading = false,
  handlePagginationUpdate,
  sendMessage,
  chatRoomId,
  detectSearchSymbol,
  isShowSearchControls,
  closeSearchControls,
  searchMentionMessagesCount,
  loadingAttachment = false,
}) => {
  const ChatContextValues = useMemo(
    () => ({
      handlePagginationUpdate,
      chatRoomId,
      sendMessage,
    }),
    [chatRoomId, handlePagginationUpdate, sendMessage]
  );

  const ChatSearchMentioningMessagesContextValues = useMemo(
    () => ({
      isShowSearchControls,
      searchMentionMessagesCount,
      detectSearchSymbol,
      closeSearchControls,
    }),
    [
      closeSearchControls,
      detectSearchSymbol,
      isShowSearchControls,
      searchMentionMessagesCount,
    ]
  );

  return (
    <ChatContext.Provider value={ChatContextValues}>
      <ChatUserMentionigContext.Provider value={usersList}>
        <ChatListContext.Provider value={chatList}>
          <ChatSearchMentioningMessagesContext.Provider
            value={ChatSearchMentioningMessagesContextValues}
          >
            <ChatLoadingContext.Provider value={loading}>
              <ChatLoadingAttachmentContext.Provider value={loadingAttachment}>
                <Chat roomId={chatRoomId || ""} />
              </ChatLoadingAttachmentContext.Provider>
            </ChatLoadingContext.Provider>
          </ChatSearchMentioningMessagesContext.Provider>
        </ChatListContext.Provider>
      </ChatUserMentionigContext.Provider>
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
export const useUserMentioningContext = () =>
  useContext(ChatUserMentionigContext);
export const useSearchMentionMessageContext = () =>
  useContext(ChatSearchMentioningMessagesContext);
export const useChatListContext = () => useContext(ChatListContext);
export const useChatLoadingContext = () => useContext(ChatLoadingContext);
export const useChatLoadingAttachmentContext = () =>
  useContext(ChatLoadingAttachmentContext);

export default ContextContainer;
