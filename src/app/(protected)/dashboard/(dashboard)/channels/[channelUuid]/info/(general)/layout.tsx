import Loading from "app/loading";
import ChannelTabs from "components/ChannelTabs";
import IslandLayout from "components/IslandLayout";
import React, { Suspense } from "react";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { channelUuid: string };
}) {
  return (
    <Suspense fallback={<Loading />}>
      <IslandLayout>
        <ChannelTabs channelUuid={params.channelUuid} />
        {children}
      </IslandLayout>
    </Suspense>
  );
}
