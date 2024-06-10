"use client";
import { ChannelListModel } from "api/models/Hive/hiveChannels";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  channelItem: ChannelListModel;
}

const ChannelItem = ({ channelItem }: Props) => {
  const router = useRouter();

  const handleChannelClick = () => {
    if (channelItem.channelTier === "CREATE") {
      router.push("/dashboard/create-channel");
    } else {
      router.push(`/channels/${channelItem.channelUuid}`);
      // dispatch(setCurrentVideosPage(0));
      // channelState.setActiveChannel(channelItem.channelUuid);
      // dispatch(getChannelDetails(channelItem.channelUuid));
      // dispatch(
      //   getChildComponents({
      //     organizationId: hiveDetails?.communityId!,
      //     parentComponentCode: "Channel",
      //     channelUuid: channelItem.channelUuid,
      //     isMemberView: store.getState().profile.isMemberView,
      //   })
      // );
      // router.push(`/channels/${channelItem.channelUuid}`);
    }
    // dispatch(setVideosTab(0));
  };

  return (
    <div
      onClick={handleChannelClick}
      className={`channel_item cursor-pointer 
      ${
        false // channelState.activeChannelUuid === channelItem.channelUuid
          ? "selected_channel_item"
          : ""
      }
      `}
    >
      <div className="channel_card">
        <img
          className="channel_logo"
          src={
            channelItem.webLogo ||
            "https://veehivestage-images.s3.us-east-2.amazonaws.com/channelImages/defaultChannelLogo.jpg"
          }
          alt=""
        />
        <h4 className="font-semibold text-lg">
          {channelItem.channelName.length > 16
            ? channelItem.channelName.slice(0, 16) + "..."
            : channelItem.channelName}
        </h4>
      </div>
      <div>
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 13L7 7L1 1"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default ChannelItem;
