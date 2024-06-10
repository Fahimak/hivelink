"use client";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import IslandLayout from "components/IslandLayout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AddContact from "views/Settings/components/AddContact";

type Props = {
  channelUuid: string;
  hiveDetails: HiveDetails;
};

const ChannelInvite = ({ channelUuid, hiveDetails }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  const togglePage = () => {
    router.push(`/channels/${channelUuid}/info/members`);
  };

  return (
    <IslandLayout>
      {isClient && (
        <AddContact
          inviteChannels={[channelUuid]}
          hiveDetails={hiveDetails}
          togglePage={togglePage}
          redirectAfterInvite={`/channels/${channelUuid}/info/members`}
        />
      )}
    </IslandLayout>
  );
};

export default ChannelInvite;
