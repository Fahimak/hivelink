import IslandLayout from "components/IslandLayout";
import ChatRoomDetailInit from "views/Chats/ChatRoomDetail/ChatRoomDetailInit";
// import ChatSocketInitiation from "views/Chats/ChatSocketInit";

export default async function Page({ params }: { params: { roomId: string } }) {
  return (
    <IslandLayout>
      <ChatRoomDetailInit params={params} />
    </IslandLayout>
  );
}
