import { fetchChannelUuidsForBuild } from "api/routes/Channels/channels";
import Loading from "app/loading";
import { org_uuid } from "constants/constants";
import React, { Suspense } from "react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const channelUuids: string[] = await fetchChannelUuidsForBuild({
    organizationUuid: org_uuid,
  });

  return channelUuids.map((channelUuid: string) => {
    return {
      channelUuid,
    };
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
