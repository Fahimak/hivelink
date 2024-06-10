import { fetchChannelUuidsForBuild } from "api/routes/Channels/channels";
import { fetchVideoUuidsForBuild } from "api/routes/Videos/videos";
import { org_uuid, website_url } from "constants/constants";
import { MetadataRoute } from "next";

export async function getData() {
  const channelUuids: string[] = await fetchChannelUuidsForBuild({
    organizationUuid: org_uuid,
  });

  const videoUrls: string[] = [];

  try {
    await Promise.all(
      channelUuids.map(async (uuid) => {
        const videoList = await fetchVideoUuidsForBuild({ channelID: uuid });
        videoList.forEach((video) => {
          videoUrls.push(`${website_url}/channels/${uuid}/videos/${video}`);
        });
      })
    );
  } catch (error) {
    console.error("Error fetching videos for channels", error);
  }

  return { channelUuids, videoUrls };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { channelUuids, videoUrls } = await getData();

  const channels = channelUuids.map((channel) => ({
    url: `${website_url}/channels/${channel}`,
    lastModified: new Date()!,
    priority: 1,
  }));

  const videos = videoUrls.map((video) => ({
    url: `${video}`,
    lastModified: new Date()!,
    priority: 1,
  }));

  return [...channels, ...videos];
}
