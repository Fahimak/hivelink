import React, { memo } from "react";
import sanitizeHtml from "sanitize-html";

import Text from "components/common/Text";
import VoiceMessages from "./VoiceMessages";
import Attachment from "./Attachment";

import { AppColors } from "theme";
import { getInitialsOfPerson } from "utils";
// import ChatKebab from "components/ChatKebab";

interface ChatMessageProps {
  id?: string;
  isOwner?: boolean;
  time?: string;
  message?: string;
  senderName?: string;
  type?: MessageType;
  attachmentUrl?: string;
  thumbnailUrl?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  id,
  isOwner = false,
  time,
  senderName,
  message = "",
  type = "text",
  attachmentUrl = "",
  thumbnailUrl = "",
}) => {
  const classNameOwner = isOwner ? "owner_message" : "not_owner_message";

  const senderColor = AppColors[getInitialsOfPerson(senderName)];

  return (
    <div className={`chat_message_container ${classNameOwner}`}>
      <Text className="chat_message_time" fontWeight="w400">
        {time}
      </Text>
      <div className="chat_message_text_container">
        {/* {isOwner && <ChatKebab id={id || ""} />} */}
        {!isOwner && (
          <Text
            className="sender_name"
            fontWeight="w500"
            style={{
              color: senderColor,
            }}
          >
            {senderName}
          </Text>
        )}
        <span className="chat_message_text_wrap">
          {type === "voice" && (
            <VoiceMessages voiceUrl={attachmentUrl} isOwnerVoice={isOwner} />
          )}
          {type === "attachment" && attachmentUrl && (
            <Attachment
              attachmentUrl={attachmentUrl}
              thumbnailUrl={thumbnailUrl}
            />
          )}
          <Text
            fontWeight="w400"
            className="chat_message_text"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(message, {
                allowedTags: ["span", "br", "a"],
                allowedClasses: { span: ["message_user_mention"] },
              }),
            }}
          />
        </span>
      </div>
    </div>
  );
};

export default memo(ChatMessage);
