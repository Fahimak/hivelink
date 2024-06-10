"use client";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ChannelListModel } from "api/models/Hive/hiveChannels";
import BackButton from "components/BackButton";
import LineBreak from "components/LineBreak";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddContact from "./AddContact";
import { HiveDetails } from "api/models/Hive/hiveDetails";

interface Props {
  channels: ChannelListModel[];
  hiveDetails: HiveDetails;
}

const InviteMembers = ({ channels, hiveDetails }: Props) => {
  const [nextPage, setNextPage] = useState(false);

  const togglePage = () => {
    setNextPage((prevState) => !prevState);
  };

  const getApprovedChannelList = (channelList: ChannelListModel[]) => {
    const approvedChannels: ChannelListModel[] = [];
    channelList.map((channel, idx) => {
      if (channel.channelStatus === "APPROVED") {
        channel.checked = false;
        approvedChannels.push(channel);
      }
    });
    return approvedChannels;
  };

  const [channelList, setChannelist] = useState(
    getApprovedChannelList(channels)
  );

  const [inviteChannels, setInviteChannels] = useState<string[]>([]);

  const removeInviteToChannel = (uuid: string) => {
    setInviteChannels((prevState) => prevState.filter((item) => item !== uuid));
  };

  const addInviteToChannel = (uuid: string) => {
    setInviteChannels((prevState) => [...prevState, uuid]);
  };

  const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setInviteChannels([]);
      channelList.map((item) => addInviteToChannel(item.channelUuid));
    } else {
      setInviteChannels([]);
    }
  };

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
    uuid: string
  ) => {
    e.target.checked ? addInviteToChannel(uuid) : removeInviteToChannel(uuid);
  };

  return (
    <>
      {nextPage ? (
        <AddContact
          inviteChannels={inviteChannels}
          hiveDetails={hiveDetails}
          togglePage={togglePage}
          redirectAfterInvite="/dashboard/home/settings"
        />
      ) : (
        <div className="invite_to_channels_container">
          <h3 className="text-lg font-bold">Add users to your channels</h3>
          <LineBreak />
          <div className="back_button_spacing">
            <BackButton to="/dashboard/home/settings" />
          </div>
          <p className="my-5">
            Select channels to which you would like to invite members. All
            members will have access to all public channels.
          </p>

          <div className="flex items-center">
            <Checkbox
              onChange={selectAll}
              size="small"
              checked={inviteChannels.length === channelList.length}
            />
            <h1>Select All</h1>
          </div>
          <div className="channel_selection_wrapper">
            {channelList.map((channel, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  value="bottom"
                  control={
                    <Checkbox
                      onChange={(e) =>
                        handleSelect(e, idx, channel.channelUuid)
                      }
                      size="small"
                      checked={inviteChannels.includes(channel.channelUuid)}
                    />
                  }
                  label={
                    <div>
                      <img
                        key={idx}
                        className="channel_select_logo"
                        src={
                          channel.webLogo ||
                          "https://veehivestage-images.s3.us-east-2.amazonaws.com/channelImages/defaultChannelLogo.jpg"
                        }
                        alt=""
                      />
                      <p className="text-center text-sm">
                        {channel.channelName.length > 10
                          ? channel.channelName.slice(0, 10) + "..."
                          : channel.channelName}
                      </p>
                    </div>
                  }
                  labelPlacement="bottom"
                />
              );
            })}
          </div>
          {inviteChannels.length > 0 ? (
            <div onClick={() => togglePage()} className="nextBtn primaryBtn">
              Next
            </div>
          ) : (
            <div className="nextBtn disabledBtn">Next</div>
          )}
        </div>
      )}
    </>
  );
};

export default InviteMembers;
