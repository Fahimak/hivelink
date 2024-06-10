"use client";
import LineBreak from "components/LineBreak";
import { VideoListItem } from "api/models/Videos/videoList";
import FeedItem from "./components/FeedItem";
import Link from "next/link";
import SadBigSVG from "../../components/common/svg/SadBigSVG";
import { useEffect, useRef, useState } from "react";

interface Props {
  feedVideos: VideoListItem[];
  loadMore(): void;
}

const FeedPage = ({ feedVideos, loadMore }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [activeEpisode, setActiveEpisode] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container &&
      canLoadMore &&
      container.scrollTop + container.clientHeight >=
        container.scrollHeight - 600
    ) {
      loadMore();
      setCanLoadMore(false);
    }
  };

  useEffect(() => {
    setCanLoadMore(true);
  }, [feedVideos]);

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [canLoadMore]);
  return (
    <>
      {!!feedVideos && feedVideos.length > 0 && (
        <div
          ref={containerRef}
          // style={{ height: "100vh", overflowY: "auto" }}
        >
          {feedVideos.map((item, index) => {
            return (
              <div key={index}>
                <FeedItem
                  feedItem={item}
                  activeEpisode={activeEpisode}
                  setActiveEpisode={setActiveEpisode}
                  isMuted={isMuted}
                  setIsMuted={setIsMuted}
                />
                {index < feedVideos.length - 1 && <hr className="padding"></hr>}
              </div>
            );
          })}
        </div>
      )}

      {!!feedVideos && feedVideos.length < 1 && (
        <div>
          <div className="coming_soon text-center">
            <SadBigSVG />
            <LineBreak />
            <h2>
              Whoops! It looks like our videos took a day off. Care to fill in
              the spot?{" "}
            </h2>
          </div>
          <h4 className="coming_soon_content"></h4>
          <LineBreak />
          <div className="flex justify-center">
            <Link href="/home" className="primaryBtn">
              Go To Home
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedPage;
