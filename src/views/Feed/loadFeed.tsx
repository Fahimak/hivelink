"use client";
import { VideoListItem } from "api/models/Videos/videoList";
import { Suspense, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchServerFeed } from "api/routes/Feed/feed";
import FeedPage from "./FeedPage";
import { CircularProgress } from "@mui/material";
import MoreLoader from "components/MoreLoader";
// import { org_uuid } from "constants/constants";

interface Props {
  passedFeedVideos: VideoListItem[];
}

export function LoadMore({ passedFeedVideos }: Props) {
  const [feedVideos, setFeedVideos] =
    useState<VideoListItem[]>(passedFeedVideos);
  const [page, setPage] = useState(1);

  const { ref, inView } = useInView();
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const [newList, setNewList] = useState(feedVideos);

  const loadMoreData = async () => {
    // Once the page 8 is reached repeat the process all over again.
    // await delay(2000);
    const nextPage = (page % 10) + 1;
    const newProducts = (await fetchServerFeed(nextPage)) ?? [];
    setNewList(newProducts || []);
    if (newProducts?.length > 0) {
      setFeedVideos((prevProducts: VideoListItem[]) => [
        ...prevProducts,
        ...newProducts,
      ]);
    }

    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreData();
    }
  }, [inView]);

  return (
    <Suspense>
      {!!feedVideos && (
        <FeedPage feedVideos={feedVideos} loadMore={loadMoreData} />
      )}
      <div className="feed_loader" ref={ref}>
        {newList && newList.length > 0 && <MoreLoader />}
      </div>
    </Suspense>
  );
}
