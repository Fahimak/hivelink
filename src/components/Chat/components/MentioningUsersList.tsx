import React, { memo } from "react";

import Avatar from "components/common/Avatar";
import Text from "components/common/Text";
import Button from "components/common/Button";
import { useUserMentioningContext } from "components/Chat/context";
import { mentioningConstants } from "../constants";

interface Props {
  chatTextMessage: string;
  setChatMessage: (v: string) => void;
}

const isMatchSearchUser = (word: string): boolean =>
  !!word.match(mentioningConstants.matchSearchUserForMentionRegExp);

const getMentionSearchName = (value: string): string => {
  const arrayValues = value.split(mentioningConstants.splitStringRegExp);
  const lastWord = arrayValues.at(-1);
  const name =
    arrayValues.find((word) => {
      return (
        word?.trim()?.at(0) === mentioningConstants.startSymbol &&
        lastWord === word &&
        isMatchSearchUser(word)
      );
    }) || "";
  return name.slice(1);
};

const isMention = (textString: string): boolean => {
  if (!textString.includes(mentioningConstants.startSymbol)) return false;
  const arrayString = textString.split(mentioningConstants.splitStringRegExp);
  const lastWord = arrayString.at(-1);

  return arrayString.some(
    (word) =>
      word?.trim()?.at(0) === mentioningConstants.startSymbol &&
      word?.trim()?.at(1) !== mentioningConstants.startSymbol &&
      lastWord === word?.trim() &&
      isMatchSearchUser(word)
  );
};

const MentioningUsersList: React.FC<Props> = ({
  setChatMessage,
  chatTextMessage = "",
}) => {
  const usersList = useUserMentioningContext();

  const filteredList = usersList.filter((user) =>
    user.name
      ?.toLowerCase()
      .includes(getMentionSearchName(chatTextMessage).toLowerCase())
  );

  const searchName = getMentionSearchName(chatTextMessage);
  const isShowMentioningUserList = isMention(chatTextMessage);

  const handleClickMentionUser = (name: string) => () => {
    let newChatTextMessage = chatTextMessage;
    if (searchName) {
      newChatTextMessage = chatTextMessage.replace(searchName, name);
    } else {
      newChatTextMessage = chatTextMessage + name;
    }
    setChatMessage(newChatTextMessage + " ");
  };

  if (!isShowMentioningUserList || !filteredList.length) return null;

  return (
    <div className="mentioning_users_list_wrap">
      <div className="mentioning_users_list_container">
        {filteredList.map((user) => {
          return (
            <Button
              className={`mentioning_users_list_item `}
              key={user.id}
              variant="text"
              onClick={handleClickMentionUser(user.name)}
            >
              <Avatar
                src={user.avatar}
                alt={`${user.name} profile photo`}
                className="mentioning_users_list_item_avatar"
              />
              <Text
                className="mentioning_users_list_item_name"
                fontWeight="w600"
              >
                {user.name}
              </Text>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default memo(MentioningUsersList);
