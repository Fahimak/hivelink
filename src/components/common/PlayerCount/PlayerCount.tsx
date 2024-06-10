import React from "react";

import Text from "components/common/Text";

import { getTimeStringFromSecond } from "utils";

interface Props {
  value: number;
  className?: string;
  classNameText?: string;
}

const PlayerCount: React.FC<Props> = ({
  value,
  className = "",
  classNameText = "",
}) => {
  return (
    <div className={`time_count ${className}`}>
      <Text className={`time_count_text ${classNameText}`}>
        {getTimeStringFromSecond(value)}
      </Text>
    </div>
  );
};

export default PlayerCount;
