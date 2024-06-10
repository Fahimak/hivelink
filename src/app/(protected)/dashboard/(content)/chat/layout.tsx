import { HiveDetails } from "api/models/Hive/hiveDetails";
import { fetchChatRooms } from "api/routes/Chat/chat";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import Loading from "app/loading";
import IslandLayout from "components/IslandLayout";
import Loader from "components/common/Loader";
import { org_uuid } from "constants/constants";
import { ChatContextProvider } from "context/chat";
import { ChatRoomsContextProvider } from "context/chatroom";
import { Suspense } from "react";
import ChatSocketInitiation from "views/Chats/ChatSocketInit";
import ChatsPage from "views/Chats/ChatsPage";

async function getData() {
  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details from home");
  }

  const chatRooms = await fetchChatRooms(hiveDetails?.communityId || 1); // The return value is *not* serialized

  if (!chatRooms) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch data");
  }

  return chatRooms;
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chatRooms = await getData();

  return (
    <ChatContextProvider>
      <ChatRoomsContextProvider>
        <Suspense fallback={<Loading />}>
          <div className="chats_body_container">
            <div className="col-span-2">
              <IslandLayout>
                <ChatsPage chatRooms={chatRooms} />
              </IslandLayout>
              <ChatSocketInitiation />
            </div>
            <Suspense fallback={<Loader />}>
              <div className="col-span-3">{children}</div>
            </Suspense>
          </div>
        </Suspense>
      </ChatRoomsContextProvider>
    </ChatContextProvider>
  );
}
