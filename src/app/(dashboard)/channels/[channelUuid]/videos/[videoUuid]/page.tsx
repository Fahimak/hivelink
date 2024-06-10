import { VideoListItem } from "api/models/Videos/videoList";
import { fetchChannelNoAuthData } from "api/routes/Channels/channels";
import {
  fetchVideoDetails,
  fetchVideoUuidsForBuild,
} from "api/routes/Videos/videos";
import { Metadata } from "next";
import Head from "next/head";
import { Suspense } from "react";
import VideoView from "views/Channel/Video";

export const revalidate = 1000;

export async function generateStaticParams({
  params,
}: {
  params: { channelUuid: string };
}) {
  const videoList = await fetchVideoUuidsForBuild({
    channelID: params.channelUuid,
  });

  return videoList.map((videoUuid) => {
    return {
      videoUuid,
    };
  });
}

async function getVideo(uuid: string, channelUuid: string) {
  const videoResp: VideoListItem = await fetchVideoDetails({
    channelID: channelUuid,
    videoId: uuid,
  });

  return videoResp;
}

async function getChannel(channelUuid: string) {
  const channel = await fetchChannelNoAuthData(channelUuid);

  return channel;
}

type Props = {
  params: { channelUuid: string; videoUuid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.videoUuid;

  // fetch data
  const video = await getVideo(params.videoUuid, params.channelUuid);

  if (video) {
    return {
      title: video.name || video.videoTitle || "Veehive.ai",
      description: video.description,
      openGraph: {
        images: [video.thumbnail, video.previewImage],
      },
    };
  } else {
    return {};
  }
}

export default async function Page({
  params,
}: {
  params: { videoUuid: string; channelUuid: string };
}) {
  const video = await getVideo(params.videoUuid, params.channelUuid);
  const channel = await getChannel(params.channelUuid);

  return (
    <Suspense fallback={<></>}>
      {!!video && !!channel && (
        <VideoView channel={channel} currentVideo={video} />
      )}
    </Suspense>
  );
}
