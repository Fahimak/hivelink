import ChatRoomItem from "./ChatRoomItem";
import { ChatRoomItemModel } from "api/models/Chat/chat";

interface Props {
  // title: string;
  dataList: ChatRoomItemModel[];
  roomId?: string;
}

const ChatroomsListSections: React.FC<Props> = ({ dataList }) => {
  return (
    <div className="chatrooms_section">
      {/* <span className="chatrooms_subtitle_container">
        <Text className="chatrooms_subtitle">{title}</Text>
      </span> */}
      {!!dataList &&
        dataList.map((item, idx) => {
          return (
            <div key={idx}>
              <ChatRoomItem key={idx} chatRoomItem={item} />
              {/* {idx < dataList.length && <hr />} */}
            </div>
          );
        })}
    </div>
  );
};

export default ChatroomsListSections;
