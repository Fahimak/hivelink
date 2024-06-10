"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AxiosProgressEvent } from "axios";
import { useChatContext } from "context/chat";
import { useChatRoomsContext } from "context/chatroom";
import { useMentioningUsersList } from "./useMentioningUsersList";
import { useSearchMe } from "./useSearchMe";
import Chat from "components/Chat";
import BackButton from "components/BackButton";
import { org_uuid } from "constants/constants";
import {
  getProfileIdCookie,
  getProfileUuidCookie,
  getUsernameCookie,
} from "utils/clientCookies";
import {
  getChatMessages,
  sendAttachmentApi,
  sendChatMessages,
  sendVoiceApi,
} from "api/routes/Chat/chat";
import Avatar from "components/common/Avatar";

type AvailableFormDataKeys =
  | "chatRoomId"
  | "message"
  | "userName"
  | "organizationUuid"
  | "file"
  | "fileName"
  | "type"
  | "mentionUsersIds";
interface TypedFormData extends FormData {
  append(
    name: AvailableFormDataKeys,
    value: string | Blob,
    fileName?: string
  ): void;
}

interface Props {
  roomId: string;
}

const ChatRoomPage = ({ roomId }: Props) => {
  const chat = useChatContext();
  const chatRoom = useChatRoomsContext();

  const [isLoading, setIsLoading] = useState(false);

  // const roomName = chatRoom;
  const userId = +(getProfileIdCookie || 0);
  const userName = getUsernameCookie || "";
  const organizationUuid = org_uuid;
  const isLoadingAttachment = chat.isFetchingSendMessage;

  const { usersList } = useMentioningUsersList(roomId);
  const {
    isShowSearchControls,
    closeSearchControls,
    chatListWithMention,
    detectSearchSymbol,
    chatListWithMentionLength,
  } = useSearchMe(roomId, userId);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  //   const { sendAttachmentApi, sendVoiceApi, sendChatMessageApi } = useChatApi();

  const handleSendMessage = useCallback(
    async ({
      content = "",
      file,
      type = "attachment",
      cb,
      abortSignal,
      mentionUsersIds = [],
    }: SendMessageParams<AxiosProgressEvent, AbortSignal>) => {
      if (roomId && userId) {
        if (file) {
          const formData = new FormData() as TypedFormData;
          formData.append("chatRoomId", roomId);
          formData.append("message", content);
          formData.append("userName", userName);
          formData.append("organizationUuid", organizationUuid);
          formData.append("file", file as File);
          formData.append("fileName", file.name);
          if (type === "voice") {
            formData.append("type", "voice");
            await sendVoiceApi(formData);
            getChatroomMessages();
          }
          if (type === "attachment") {
            formData.append("type", "attachment");
            formData.append("mentionUsersIds", JSON.stringify(mentionUsersIds));
            await sendAttachmentApi(formData);
            getChatroomMessages();
          }
        } else {
          await sendChatMessages(
            roomId,
            content,
            userId,
            userName,
            mentionUsersIds
          );
        }
      }
    },
    [organizationUuid, roomId, userId, userName]
  );

  const page = useRef<number>(0);
  const hasAllLoaded = useRef<boolean>(false);
  const profileId = getProfileUuidCookie || "";

  const getChatroomMessages = async () => {
    setIsLoading(true);
    const data = await getChatMessages(roomId, profileId, page.current);
    chat.setChatList(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (roomId && profileId && !page.current) {
      getChatroomMessages();
    }
    return () => {
      page.current = 0;
    };
  }, [roomId, profileId]);

  const chatMessagesLenght = chat.chatList.length;

  const chatList = chat.getChatListSelector(chat.chatList);

  const loadMoreMessageList = useCallback(() => {
    if (chatMessagesLenght < 30 - 1 || isLoading) return;
    if (profileId && !hasAllLoaded.current) {
      getChatMessages(roomId, profileId, page.current + 1).then((res) => {
        if (res.length) {
          page.current = page.current + 1;
        } else {
          hasAllLoaded.current = true;
        }
      });
    }
  }, [chatMessagesLenght]);

  useEffect(() => {
    chat.setChatPageNo(page.current);
    chat.setChatRoomId(roomId);
  }, [page, roomId]);

  // useEffect(() => {
  //   // Scroll to the bottom of the chat container on initial load and when chatList changes
  //   if (chatContainerRef.current) {
  //     chatContainerRef.current.scrollTop = 1000;
  //   }
  // }, [chatList]);

  // const path = usePathname();

  return (
    <div className={`no_scroll chat_room_wrapper`} ref={chatContainerRef}>
      <div className="chat_room_container no_scroll relative">
        {chatRoom.chatRoomDetail.chatRoomName && (
          <div className="chatroom_back_btn flex justify-between items-center p-2 shadow">
            <div className="flex items-center gap-x-4">
              <div className="visible_only_mobile">
                <BackButton to="dashboard/chat" />
              </div>
              <p className="text-xl font-semibold text-gray-800">
                {chatRoom.chatRoomDetail.chatRoomName}
              </p>
            </div>
            <Avatar
              className="chat_room_logo_container"
              src={""}
              alt={`${chatRoom.chatRoomDetail.chatRoomName} chatroom logo`}
            >
              {chatRoom.chatRoomDetail.chatRoomName.at(0)?.toUpperCase()}
            </Avatar>{" "}
          </div>
        )}
        <Chat
          handlePagginationUpdate={loadMoreMessageList}
          sendMessage={handleSendMessage}
          loading={isLoading}
          chatList={
            isShowSearchControls && chatListWithMention.length
              ? chatListWithMention
              : chatList
          }
          usersList={usersList}
          loadingAttachment={isLoadingAttachment}
          isShowSearchControls={isShowSearchControls}
          detectSearchSymbol={detectSearchSymbol}
          closeSearchControls={closeSearchControls}
          searchMentionMessagesCount={chatListWithMentionLength}
          chatRoomId={roomId}
        />
      </div>
    </div>
  );
};

export default ChatRoomPage;
