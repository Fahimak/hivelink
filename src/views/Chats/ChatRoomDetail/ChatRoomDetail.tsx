import { useEffect } from "react";
import Loader from "components/common/Loader";
import { useChatContext } from "context/chat";
import ChatRoomPage from "../ChatRoomPage/ChatRoomPage";
import { fetchChatRoomDetail } from "api/routes/Chat/chatroom";
import { useChatRoomsContext } from "context/chatroom";

interface Props {
  roomId: string;
}

const ChatRoomDetail = ({ roomId }: Props) => {
  const chat = useChatContext();
  const chatRoom = useChatRoomsContext();

  const getChatRoomDetails = async () => {
    chat.setChatRoomId(roomId);
    const data = await fetchChatRoomDetail(roomId);

    chatRoom.setChatRoomDetail(data);
  };

  useEffect(() => {
    if (roomId) {
      getChatRoomDetails();
    }

    return () => {
      chat.clearChatMessage();
    };
  }, [roomId]);

  // const isFetching = chat.isFetching;

  return (
    <div className="">
      {<ChatRoomPage roomId={roomId} />}
      <LoaderIndicator />
    </div>
  );
};

const LoaderIndicator = () => {
  const chat = useChatContext();
  const isFetching = chat.isFetching;
  return isFetching ? <Loader /> : null;
};

export default ChatRoomDetail;
