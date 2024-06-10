import React from "react";

import ChatLayout from "components/ChatLayout";
import AncholForPaggination from "components/common/AncholForPaggination";
import ChatEmptySection from "./components/ChatEmptySection";
import ChatTextField from "./components/ChatTextField";
import ChatDayBlock from "./components/ChatDayBlock";
import LoadingSection from "./components/LoadingSection";
import SearchMeControls from "./components/SearchMeControls";
import { useScrollPagination } from "hooks/useScrollPagination";
import {
  useChatContext,
  useChatListContext,
  useChatLoadingContext,
  useSearchMentionMessageContext,
} from "./context";

interface Props {
  roomId: string;
}

const Chat = ({ roomId }: Props) => {
  const { handlePagginationUpdate } = useChatContext();
  const loading = useChatLoadingContext();
  const chatList = useChatListContext() || [];

  const { isShowSearchControls, searchMentionMessagesCount } =
    useSearchMentionMessageContext();

  const scrollAncholRef = useScrollPagination(
    handlePagginationUpdate,
    !!chatList.length
  );

  return (
    <div className="chat_container no_scroll">
      {!chatList?.length ? (
        loading ? (
          <LoadingSection />
        ) : (
          <ChatEmptySection />
        )
      ) : (
        <ChatLayout>
          {chatList.map((day, idx) => {
            return (
              <ChatDayBlock key={idx} day={day.date} messages={day.messages} />
            );
          })}
          <AncholForPaggination ref={scrollAncholRef} />
        </ChatLayout>
      )}

      <div className="chat_text_field_container no_scroll">
        {isShowSearchControls ? (
          <SearchMeControls foundIds={searchMentionMessagesCount ?? 0} />
        ) : (
          <ChatTextField roomId={roomId} />
        )}
      </div>
    </div>
  );
};

export default React.memo(Chat);
