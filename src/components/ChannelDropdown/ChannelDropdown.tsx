import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ChannelListModel } from "api/models/Hive/hiveChannels";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  channelUuid: string;
  setChannelUuid: Dispatch<SetStateAction<string>>;
  channelList: ChannelListModel[];
}

const ChannelDropdown = ({
  channelList,
  channelUuid,
  setChannelUuid,
}: Props) => {
  const [channel, setChannel] = useState(
    channelUuid || channelList[0].channelUuid || ""
  );

  const handleChange = (channel: SelectChangeEvent) => {
    setChannel(channel.target.value);
    setChannelUuid(channel.target.value);
  };

  return (
    <div className="">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Uploading to</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={channel}
          label="Uploading to"
          onChange={handleChange}
        >
          {channelList.map((channel, idx) => {
            if (channel.channelUuid) {
              return (
                <MenuItem key={idx} value={channel.channelUuid}>
                  {channel.channelName}
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default ChannelDropdown;
