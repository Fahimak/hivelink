import { getMentionsList } from "api/routes/Chat/chat";
import { UsersListForMentioning, useChatContext } from "context/chat";
import { useEffect } from "react";

type ReturnType = {
  usersList: UsersListForMentioning[];
};

export const useMentioningUsersList = (chatRoomId: string): ReturnType => {
  const chat = useChatContext();

  const usersList = chat.getMentionsUsersListSelector();

  //   const { getChatRoomMentionsApi } = useChatApi();

  const getMentionUsersList = async () => {
    const data = await getMentionsList(chatRoomId);
    chat.setMentionsUsersList(data);
  };

  useEffect(() => {
    if (chatRoomId) {
      getMentionUsersList();
    }
  }, [chatRoomId]);

  return {
    usersList,
  };
};
