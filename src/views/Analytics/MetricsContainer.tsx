"use client";
import AnalyticsCapsule from "components/AnalyticsCapsule";
import React, { useEffect } from "react";

interface Props {
  videoCount: number;
  usersCount: number;
  channelsCount: number;
}

const MetricsContainer = ({ videoCount, usersCount, channelsCount }: Props) => {
  return (
    <div className="usage_data_container">
      <AnalyticsCapsule>
        <div className="headers_and_value">
          <h5 className="font-bold">Channels</h5>
          <h2 className="font-bold text-3xl">{channelsCount}</h2>
        </div>
      </AnalyticsCapsule>
      <AnalyticsCapsule>
        <div className="headers_and_value">
          <h5 className="font-bold">Videos</h5>
          <h2 className="font-bold text-3xl">{videoCount}</h2>
        </div>
      </AnalyticsCapsule>
      <AnalyticsCapsule>
        <div className="headers_and_value">
          <h5 className="font-bold">Members</h5>
          <h2 className="font-bold text-3xl">{usersCount}</h2>
        </div>
      </AnalyticsCapsule>
    </div>
  );
};

export default MetricsContainer;
