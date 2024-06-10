import React, { memo } from "react";
import Text from "components/common/Text";
import ChatMessage from "components/ChatMessage";
import { Message, UserMentionDictionary } from "context/chat";

interface ChatDayBlockProps {
  day: string;
  messages: Message[];
}

const parceMessageWithMentioning = (
  message: string,
  users?: UserMentionDictionary
) => {
  let parcedMessage = message.replaceAll("\\n", `<br />`);

  if (users) {
    Object.entries(users).forEach(([id, user]) => {
      const regex = new RegExp(`@${id}#`, "g");
      const matches = message.match(regex);

      if (matches) {
        parcedMessage = parcedMessage.replaceAll(
          regex,
          `<span class='message_user_mention'>@${user.userName}</span>`
        );
      }
    });
  }
  // if (
  //   (!message.includes(mentioningConstants.startSymbol) &&
  //     !message.includes(mentioningConstants.endSymbol)) ||
  //   !users
  // )
  //   return message;
  // return message
  //   .split(mentioningConstants.splitStringRegExp)
  //   .map((word) => {
  //     const r = mentioningConstants.searchMentionUserInMessageRegExp.test(word);
  //     if (r) {
  //       const id = word.replace(mentioningConstants.searchSymbolsRegExp, "");
  //       const user = users[id];
  //       if (user) {
  //         const replacedWord = word.replace(
  //           mentioningConstants.searchMentionUserInMessageRegExp,
  //           user.userName
  //         );
  //         return user
  //           ? `<span class='message_user_mention'>${mentioningConstants.startSymbol}${replacedWord}</span>`
  //           : word;
  //       }
  //     }
  //     return word;
  //   })
  //   .join(" ");
  return parcedMessage;
};

const ChatDayBlock: React.FC<ChatDayBlockProps> = ({ day, messages }) => {
  return (
    <div className="chat_day_block">
      <Text fontWeight="w500" className="chat_day_block_day">
        {day}
      </Text>
      {messages &&
        messages.length > 0 &&
        messages.map((item) => {
          const parseMessage = parceMessageWithMentioning(
            item.message,
            item.userMentions
          );

          return (
            <ChatMessage
              key={item.id}
              id={item.id}
              isOwner={item.isOwner}
              time={item.formattedTime}
              senderName={item.senderName}
              message={parseMessage}
              type={item.type}
              attachmentUrl={item.attachmentUrl}
              thumbnailUrl={item.thumbnailUrl}
            />
          );
        })}
    </div>
  );
};

export default memo(ChatDayBlock);
