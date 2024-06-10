"use client";
import {
  MessageDataResponse,
  ChatBotRespModel,
  UserMentionItem,
  UsersListForMentioningResp,
} from "api/models/Chat/chat";
import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";
import { parseISO, format } from "date-fns";
import { ChatRoomsContextProvider } from "./chatroom";
import { getProfileIdCookie } from "utils/clientCookies";

export type UsersListForMentioning = {
  name: string;
  avatar: string;
  id: UserId;
};

export type UserMentionDictionary = Dictionary<UserMentionItem>;

export interface Message {
  isOwner: boolean;
  senderName: UserName;
  time: string;
  formattedTime: string;
  message: string;
  id: string;
  type: MessageType;
  attachmentUrl: string;
  thumbnailUrl: string;
  userMentions?: UserMentionDictionary;
  videoUrl: string;
}

export interface ChatBotMessageItem {
  isOwner: boolean;
  senderName: UserName;
  time: string;
  formattedTime: string;
  message: string;
  id: string;
  type: string;
  videoUrl: string;
}

export interface ChatItem {
  date: string;
  messages: Message[];
}

export interface ChatBotItem {
  date: string;
  messages: ChatBotMessageItem[];
}

export interface ChatContextProps {
  chatList: MessageDataResponse[];
  chatBotList: ChatBotRespModel[];
  isFetching: boolean;
  isFetchingSendMessage: boolean;
  chatListWithMentioning: MessageDataResponse[];
  chatBotIsOpen: boolean;
  chatBotId: string;
  chatPageNo: number;
  chatRoomId: string;
  mentionsUsersList: UsersListForMentioningResp[];
  clearChatMessage: () => void;
  addNewMessage: (message: MessageDataResponse) => void;
  addNewBotMessage: (message: ChatBotRespModel) => void;
  setChatBotIsOpen: (isOpen: boolean) => void;
  clearChatListWithMentioning: () => void;
  setChatRoomId: (roomId: string) => void;
  setChatPageNo: (pageNo: number) => void;
  setIsFetching: any;
  setIsFetchingSendMessage: any;
  getChatListSelector: any;
  getChatBotListSelector: any;
  getChatListWithMentionSelector: any;
  getMentionsUsersListSelector: any;
  setChatList: Dispatch<SetStateAction<MessageDataResponse[]>>;
  setChatBotList: any;
  setChatBotId: any;
  setMentionsUsersList: any;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [chatList, setChatList] = useState<MessageDataResponse[]>([]);
  const [chatBotList, setChatBotList] = useState<ChatBotRespModel[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetchingSendMessage, setIsFetchingSendMessage] =
    useState<boolean>(false);
  const [chatListWithMentioning, setChatListWithMentioning] = useState<
    MessageDataResponse[]
  >([]);
  const [chatBotIsOpen, setChatBotIsOpen] = useState<boolean>(false);
  const [chatBotId, setChatBotId] = useState<string>("");
  const [chatPageNo, setChatPageNo] = useState<number>(0);
  const [chatRoomId, setChatRoomId] = useState<string>("");
  const [mentionsUsersList, setMentionsUsersList] = useState<
    UsersListForMentioningResp[]
  >([]);

  const clearChatMessage = () => {
    setChatList([]);
    setChatListWithMentioning([]);
  };

  const addNewMessage = (message: MessageDataResponse) => {
    setChatList((prevChatList) => [...prevChatList, message]);
  };

  const addNewBotMessage = (message: ChatBotRespModel) => {
    setChatBotList((prevBotList) => [...prevBotList, message]);
  };

  const clearChatListWithMentioning = () => {
    setChatListWithMentioning([]);
  };

  const userId = +(getProfileIdCookie || 0);

  const getChatListSelector = (chatList: MessageDataResponse[]) => {
    const currentUserId = userId;

    return Object.entries(chatList).reduce<ChatItem[]>((res, [key, values]) => {
      res.push({
        date: format(parseISO(values.createdAt), "MMM d, yyyy"),
        messages: chatList.map<Message>((item) => ({
          time: item.createdAt,
          formattedTime: format(parseISO(item.createdAt), "HH:mm"),
          isOwner: currentUserId === item?.userId,
          message: item.message?.message || "",
          senderName: item?.userName || "",
          id: item._id,
          type: item?.type,
          attachmentUrl: item?.attachmentUrl,
          thumbnailUrl: item?.thumbnailUrl || "",
          userMentions: keyBy(item?.userMentions || [], "id"),
          videoUrl: item.videoUrl || "",
        })),
      });
      return res;
    }, []);
  };

  const getChatBotListSelector = () => {
    const currentUserId = userId;

    return Object.entries(chatBotList).reduce<ChatBotItem[]>(
      (res, [key, values]) => {
        res.push({
          date: format(parseISO(values.createdAt), "MMM d, yyyy"),
          messages: chatBotList.map<ChatBotMessageItem>((item) => ({
            time: item.createdAt,
            formattedTime: format(parseISO(item.createdAt), "HH:mm"),
            isOwner: currentUserId === item?.userId,
            message: item.message || "",
            senderName: item?.userName || "",
            id: item._id,
            type: item.type,
            videoUrl: item.videoUrl || "",
          })),
        });
        return res;
      },
      []
    );
  };

  function keyBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T> {
    return arr.reduce((result, item) => {
      const keyValue = item[key];
      result[String(keyValue)] = item;
      return result;
    }, {} as Record<string, T>);
  }

  const getChatListWithMentionSelector = () => {
    const currentUserId = userId;

    return Object.entries(chatListWithMentioning).reduce<ChatItem[]>(
      (res, [key, values]) => {
        res.push({
          date: format(parseISO(values.createdAt), "MMM d, yyyy"),
          messages: chatListWithMentioning.map<Message>((item) => ({
            time: item.createdAt,
            formattedTime: format(parseISO(item.createdAt), "HH:mm"),
            isOwner: currentUserId === item?.userId,
            message: item.message?.message || "",
            senderName: item?.userName || "",
            id: item._id,
            type: item?.type,
            attachmentUrl: item?.attachmentUrl,
            thumbnailUrl: item?.thumbnailUrl || "",
            userMentions: keyBy(item?.userMentions || [], "id"),
            videoUrl: item.videoUrl || "",
          })),
        });
        return res;
      },
      []
    );
  };

  const getMentionsUsersListSelector = () => {
    return mentionsUsersList.map<UsersListForMentioning>((user) => ({
      name: user.userName || "not_name",
      avatar: user.profilePhoto || "",
      id: user.userId,
    }));
  };

  const contextValue: ChatContextProps = {
    chatList,
    chatBotList,
    isFetching,
    isFetchingSendMessage,
    chatListWithMentioning,
    chatBotIsOpen,
    chatBotId,
    chatPageNo,
    chatRoomId,
    mentionsUsersList,
    clearChatMessage,
    addNewMessage,
    addNewBotMessage,
    setChatBotIsOpen,
    clearChatListWithMentioning,
    setChatRoomId,
    setChatPageNo,
    getChatListSelector,
    getChatBotListSelector,
    getChatListWithMentionSelector,
    getMentionsUsersListSelector,
    setIsFetching,
    setIsFetchingSendMessage,
    setChatList,
    setChatBotList,
    setChatBotId,
    setMentionsUsersList,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      <ChatRoomsContextProvider>{children}</ChatRoomsContextProvider>
    </ChatContext.Provider>
  );
};

export const useChatContext = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return context;
};
