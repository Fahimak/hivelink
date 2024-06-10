import React from "react";
import MainMenu from "components/MainMenu";
import { RawComponents } from "api/models/Hive/hiveComponents";
import { ChannelListModel } from "api/models/Hive/hiveChannels";

type Props = {
  hiveComponents: RawComponents[];
  channelList: ChannelListModel[];
};

const LeftElements = ({ hiveComponents, channelList }: Props) => {
  return (
    <div className="LeftElements">
      <MainMenu hiveComponents={hiveComponents} channelList={channelList} />
    </div>
  );
};

export default LeftElements;
