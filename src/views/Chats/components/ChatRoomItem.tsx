"use client";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import { ChatRoomItemModel } from "api/models/Chat/chat";
import ChevronRight from "@mui/icons-material/ChevronRight";
import LongText from "components/LongText";

interface Props {
  chatRoomItem: ChatRoomItemModel;
  roomId?: string;
}

const ChatRoomItem = ({ chatRoomItem, roomId }: Props) => {
  const removeReadMessages = () => {
    // chat.setChatRoomId(roomId || "");
    // chatRoom.updateChatRoomsList(chatRoomItem);
  };

  return (
    <Link
      onClick={() => removeReadMessages()}
      className={`${
        roomId === String(chatRoomItem._id)
          ? "selected_chatroom_item_container"
          : ""
      } chatroom_item_container`}
      href={"/dashboard/chat/" + String(chatRoomItem._id)}
    >
      <Avatar
        className="chat_room_logo_container"
        src={""}
        alt={`${chatRoomItem.chatRoomName} chatroom logo`}
      >
        {chatRoomItem.chatRoomName.at(0)?.toUpperCase()}
      </Avatar>
      <div className="content_container">
        <h3 className="text-xl font-bold">{chatRoomItem.chatRoomName}</h3>
        {/* <Text className="chatroom_item_title" fontWeight="w700">
          {chatRoomItem.chatRoomName}
        </Text> */}
        <LongText
          textStyle="text-gray-500"
          title={chatRoomItem.chatRoomBio}
          cutoff={52}
        />

        {/* <Text className="chatroom_description" fontWeight="w500">
          {chatRoomItem.chatRoomBio}
        </Text> */}
      </div>
      <ChevronRight />
      {/* {chatRoomItem.unreadMessageCount > 0 &&
        (chatRoomItem.unreadMessageCount > 99 ? (
          <div className="unread_wrapper">100+</div>
        ) : (
          <div className="unread_wrapper">
            {chatRoomItem.unreadMessageCount}
          </div>
        ))} */}
    </Link>
  );
};

export default ChatRoomItem;
