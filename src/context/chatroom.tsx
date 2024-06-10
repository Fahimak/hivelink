"use client";
import {
  ChatRoom,
  ChatRoomItemModel,
  ChatRoomsByChannelModel,
} from "api/models/Chat/chat";
import { ProfileItem } from "api/models/profile";
import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";

export interface ChatroomForComponent {
  id: UniqueId;
  title: string;
  description: string;
  logo: Logo;
  isPinned: boolean;
  onlineCount: number;
}
export interface FilteredChatRoomsByPinned {
  pinned: ChatroomForComponent[];
  unpinned: ChatroomForComponent[];
}
export interface Participant {
  foto: Logo;
  name: UserName;
  nikName: UserName;
  id: UserId;
}

export interface ChatRoomCreateValues {
  chatRoomName: string;
  chatRoomBio: string;
}

// Define the context type
export interface ChatRoomsContextProps {
  chantroomsList: ChatRoom[];
  setChantroomsList: Dispatch<SetStateAction<ChatRoom[]>>;
  chatRoomDetail: ChatRoom;
  setChatRoomDetail: Dispatch<SetStateAction<ChatRoom>>;
  isFetchingChatrooms: boolean;
  setIsFetchingChatrooms: Dispatch<SetStateAction<boolean>>;
  chatRoomParticipants: ProfileItem[];
  setChatRoomParticipants: Dispatch<SetStateAction<ProfileItem[]>>;
  createSelectedState: UserId[];
  setCreateSelectedState: Dispatch<SetStateAction<UserId[]>>;
  searchRoomsValue: string;
  setSearchRoomsValue: Dispatch<SetStateAction<string>>;
  channelUsers: {
    profilePhoto: string;
    createdDate: string;
    user: UserName;
    userName: UserName;
    userId: UserId;
    channelId: number;
    status: string;
  }[];
  setChannelUsers: Dispatch<
    SetStateAction<
      {
        profilePhoto: string;
        createdDate: string;
        user: UserName;
        userName: UserName;
        userId: UserId;
        channelId: number;
        status: string;
      }[]
    >
  >;
  createValues: ChatRoomCreateValues;
  setCreateValues: Dispatch<SetStateAction<ChatRoomCreateValues>>;
  chatRoomsByChannels: ChatRoomsByChannelModel[];
  setChatRoomsByChannels: Dispatch<SetStateAction<ChatRoomsByChannelModel[]>>;
  filteredChatroomsByChannels: any[];
  setFilteredChatroomsByChannels: Dispatch<SetStateAction<any[]>>;
  updateChatRoomsList: any;
  // Add more state variables here as needed
  // Example:
  // someOtherState: SomeType;
  // setSomeOtherState: Dispatch<SetStateAction<SomeType>>;
}

const ChatRoomsContext = createContext<ChatRoomsContextProps | undefined>(
  undefined
);

export const ChatRoomsContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [chantroomsList, setChantroomsList] = useState<ChatRoom[]>([]);
  const [chatRoomDetail, setChatRoomDetail] = useState<ChatRoom>(
    {} as ChatRoom
  );
  const [isFetchingChatrooms, setIsFetchingChatrooms] =
    useState<boolean>(false);
  const [chatRoomParticipants, setChatRoomParticipants] = useState<
    ProfileItem[]
  >([]);
  const [createSelectedState, setCreateSelectedState] = useState<UserId[]>([]);
  const [searchRoomsValue, setSearchRoomsValue] = useState<string>("");
  const [channelUsers, setChannelUsers] = useState<
    {
      profilePhoto: string;
      createdDate: string;
      user: UserName;
      userName: UserName;
      userId: UserId;
      channelId: number;
      status: string;
    }[]
  >([]);
  const [createValues, setCreateValues] = useState<ChatRoomCreateValues>({
    chatRoomName: "",
    chatRoomBio: "",
  });
  const [chatRoomsByChannels, setChatRoomsByChannels] = useState<
    ChatRoomsByChannelModel[]
  >([]);
  const [filteredChatroomsByChannels, setFilteredChatroomsByChannels] =
    useState<any[]>([]);
  // Add more state variables and their corresponding setter functions here as needed
  // Example:
  // const [someOtherState, setSomeOtherState] = useState<SomeType>(initialValue);

  const updateChatRoomsList = (passedChatRoom: ChatRoomItemModel) => {
    chatRoomsByChannels.map((chatrooms) => {
      chatrooms.chatRoomList.map((chatroom) => {
        if (chatroom._id === passedChatRoom._id) {
          chatroom.unreadMessageCount = 0;
          return 1;
        }
      });
    });
  };

  return (
    <ChatRoomsContext.Provider
      value={{
        chantroomsList,
        setChantroomsList,
        chatRoomDetail,
        setChatRoomDetail,
        isFetchingChatrooms,
        setIsFetchingChatrooms,
        chatRoomParticipants,
        setChatRoomParticipants,
        createSelectedState,
        setCreateSelectedState,
        searchRoomsValue,
        setSearchRoomsValue,
        channelUsers,
        setChannelUsers,
        createValues,
        setCreateValues,
        chatRoomsByChannels,
        setChatRoomsByChannels,
        filteredChatroomsByChannels,
        setFilteredChatroomsByChannels,
        updateChatRoomsList,
        // Add more state variables here as needed
        // Example:
        // someOtherState,
        // setSomeOtherState,
      }}
    >
      {children}
    </ChatRoomsContext.Provider>
  );
};

export const useChatRoomsContext = () => {
  const context = useContext(ChatRoomsContext);
  if (!context) {
    throw new Error(
      "useChatRoomsContext must be used within a ChatRoomsContextProvider"
    );
  }
  return context;
};
