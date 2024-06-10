"use client";
import { CircularProgress } from "@mui/material";
import { StoryViewModel } from "api/models/Analytics/metrics";
import {
  ReactionModel,
  StoryDaywiseAnalytics,
  StoryLocationModel,
  StorySocialCountItem,
} from "api/models/Story/story";
import {
  getDaywiseAnalytics,
  getStoryLocation,
  getStoryReactions,
  getStorySocialCount,
  getStoryViews,
} from "api/routes/Analytics/analytics";
import LineBreak from "components/LineBreak";
import LongText from "components/LongText/LongText";
import HappySVG from "assets/svg/happy_reaction.svg";
import NeuralSVG from "assets/svg/neutral_reaction.svg";
import SadSVG from "assets/svg/sad_reaction.svg";
import NoOfViewsWhiteSVG from "assets/svg/noOfViewsWhite.svg";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { storyStore } from "store/story";
import { fetchStoryReactItem } from "api/routes/Stories/stories";

interface ReducedReactions {
  happy: number;
  neutral: number;
  sad: number;
  total: number;
}

interface Props {
  storyUuid: string;
}

const SegmentAnalytics = ({ storyUuid }: Props) => {
  const storyId = storyStore((state: any) => state.storyId);

  const [isLoading, setisLoading] = useState(true);

  const [storyViews, setStoryViews] = useState<StoryViewModel | undefined>(
    undefined
  );
  const [storyLocations, setStoryLocations] = useState<StoryLocationModel[]>(
    []
  );
  const [totalReactions, setTotalReactions] = useState({
    total: 0,
    happy: 0,
    neutral: 0,
    sad: 0,
  });
  const [socialCount, setSocialCount] = useState<StorySocialCountItem[]>([]);

  const [unknownCount, setUnknownCount] = useState<number>(0);

  const [daywise, setDaywise] = useState<StoryDaywiseAnalytics[]>([]);

  const fetchStoryViews = async () => {
    const resp = await getStoryViews({
      storyUuid: storyUuid,
    });

    if (resp) {
      setStoryViews(resp);
    }
  };

  const fetchStoryReacts = async () => {
    const resp: ReactionModel[] = await getStoryReactions({
      storyUuid: storyUuid,
      storySegmentId: storyId,
    });

    if (resp) {
      resp.map((reaction) => {
        setTotalReactions((prevReactions) => ({
          total: prevReactions.total + reaction.reactionCount,
          happy:
            reaction.reactionId === 3
              ? prevReactions.happy + reaction.reactionCount
              : prevReactions.happy,
          neutral:
            reaction.reactionId === 2
              ? prevReactions.neutral + reaction.reactionCount
              : prevReactions.neutral,
          sad:
            reaction.reactionId === 1
              ? prevReactions.sad + reaction.reactionCount
              : prevReactions.sad,
        }));
      });
    }
  };

  const fetchStoryLocation = async () => {
    const resp = await getStoryLocation({
      storyUuid: storyUuid,
      storySegmentId: storyId,
    });

    if (resp) {
      setStoryLocations(resp);
    }
  };

  const fetchStorySocialCount = async () => {
    const resp = await getStorySocialCount({
      storyUuid: storyUuid,
      storySegmentId: storyId,
    });

    if (resp) {
      setSocialCount(resp);
    }
  };

  const fetchDaywise = async () => {
    const resp = await getDaywiseAnalytics({
      storyUuid: storyUuid,
      fromDate: null,
      toDate: null,
      storySegmentId: storyId,
    });

    if (resp) {
      setDaywise(resp);
    }
  };

  useEffect(() => {
    fetchStoryViews();
    fetchStoryReacts();
    fetchStoryLocation();
    fetchStorySocialCount();
    setisLoading(false);
  }, [storyUuid, storyId]);

  useEffect(() => {
    fetchDaywise();
    setisLoading(false);
  }, [storyUuid, storyId]);

  const [scrollUp, setScrollUp] = useState(false);

  const handleScroll = () => {
    setScrollUp(true);
  };

  return (
    <div
      onScroll={handleScroll}
      className={`segment_analytics_wrapper text-white`}
    >
      <div className="story_content_actions white_text">
        <div className="story_content_copy_link">
          <div className="no_of_views_wrapper">
            <Image alt="svg" src={NoOfViewsWhiteSVG} />

            <p>{storyViews?.count}</p>
          </div>
        </div>
        <div className="w_full story_options_spacing">
          <hr></hr>
        </div>
        <div className="story_reactions_wrapper">
          <div className="story_reaction_wrapper text_xs">
            <Image alt="svg" src={HappySVG} />

            <p>{totalReactions.happy}</p>
          </div>
          <div className="story_reaction_wrapper text_xs">
            <Image alt="svg" src={NeuralSVG} />

            <p>{totalReactions.neutral}</p>
          </div>
          <div className="story_reaction_wrapper text_xs">
            <Image alt="svg" src={SadSVG} />

            <p>{totalReactions.sad}</p>
          </div>
        </div>
        <div className="w_full story_options_spacing">
          <hr></hr>
        </div>
        <div className="story_metrics_container">
          <h3 className="">Statistics</h3>
          <div className="story_metrics_wrapper">
            <p>Views</p>
            <p>
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                storyViews?.count
              )}
            </p>
          </div>
          <div className="story_metrics_wrapper">
            <p>Reactions</p>
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              totalReactions.total
            )}{" "}
          </div>
          <div className="story_metrics_wrapper">
            <p>Interactions</p>
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              storyViews?.countInteractions
            )}{" "}
          </div>
          {!!storyLocations && storyLocations.length > 0 && (
            <div className="w_full story_options_spacing">
              <hr></hr>
            </div>
          )}
          {!!storyLocations && storyLocations.length > 0 && (
            <h3 className="">Location</h3>
          )}
          {!!storyLocations &&
            storyLocations.length > 0 &&
            storyLocations.map((location, idx) => {
              return (
                <div key={`location, ${idx}`} className="story_metrics_wrapper">
                  <LongText
                    title={
                      !!location.location && location.location.length > 1
                        ? location.location[0].toUpperCase() +
                          location.location.slice(1).toLowerCase()
                        : "Unknown"
                    }
                    cutoff={18}
                  />
                  {isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <p className="text-white">{location.locationCount}</p>
                  )}{" "}
                </div>
              );
            })}
          {!!socialCount && socialCount.length > 0 && (
            <div className="w_full story_options_spacing">
              <hr></hr>
            </div>
          )}
          {!!socialCount && socialCount.length > 0 && (
            <h3 className="">Origin</h3>
          )}
          {!!socialCount &&
            socialCount.length > 0 &&
            socialCount.map((data, idx) => {
              if (data.origin !== "unknown") {
                return (
                  <div key={`origin, ${idx}`} className="story_metrics_wrapper">
                    <p>{data.origin}</p>
                    <p>{data.originCount}</p>
                  </div>
                );
              } else {
                return (
                  <div
                    key={`unknown, ${idx}`}
                    className="story_metrics_wrapper"
                  >
                    <p>Unknown</p>
                    <p>{unknownCount}</p>
                  </div>
                );
              }
            })}
          {!!daywise.length && (
            <div className="w_full story_options_spacing">
              <hr></hr>
            </div>
          )}
          {!!daywise.length && <h3>Day Wise Analytics</h3>}
          {/* <DaywiseDateSelector /> */}
          {!!daywise && (
            <div className="day_wise_segment_viewer">
              {daywise.map((data, idx) => {
                return (
                  <div key={`daywise, ${idx}`} className="">
                    <div className="story_metrics_wrapper">
                      <p>Date</p>

                      <p>{format(data.interactionDate, "MMMM dd, yyyy")}</p>
                    </div>
                    <div className="story_metrics_wrapper">
                      <p>Views</p>
                      <p>{data.count}</p>
                    </div>
                    <div className="story_metrics_wrapper">
                      <p>Interactions</p>
                      <p>{data.countInteractions}</p>
                    </div>
                    <LineBreak />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SegmentAnalytics;
function getDayWiseAnalytics(arg0: {
  storyUuid: string;
  fromDate: null;
  toDate: null;
}) {
  throw new Error("Function not implemented.");
}
