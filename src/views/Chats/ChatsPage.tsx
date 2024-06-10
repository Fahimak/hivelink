"use client";
import { ChatRoomsByChannelModel } from "api/models/Chat/chat";
// import LineBreak from "components/LineBreak";
import React from "react";
import ChatRoomsListSections from "./components/ChatRoomsListSections";
import BackButton from "components/BackButton";
import { usePathname } from "next/navigation";

type Props = {
  chatRooms: ChatRoomsByChannelModel[];
};

const ChatsPage = ({ chatRooms }: Props) => {
  const path = usePathname();

  return (
    <div
      className={`${
        path.includes(`/dashboard/chat/`)
          ? "disable_chatroomspage_container"
          : ""
      }`}
    >
      <div className="chatrooms_page_container">
        <div className="visible_only_desktop">
          <BackButton to="/dashboard/feed" />
        </div>
        {!!chatRooms &&
          chatRooms.map((channel, idx) => {
            return (
              <div className="chat_rooms_by_channels" key={idx}>
                {channel.chatRoomList && channel.chatRoomList.length > 0 && (
                  <div>
                    {/* <h3>{channel.channelName}</h3> */}
                    <ChatRoomsListSections dataList={channel.chatRoomList} />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChatsPage;
