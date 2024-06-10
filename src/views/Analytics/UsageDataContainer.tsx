"use client";
import LinearProgress from "@mui/material/LinearProgress";
import { UsageRespModel } from "api/models/Analytics/metrics";
import AnalyticsCapsule from "components/AnalyticsCapsule";
import LineBreak from "components/LineBreak";
import React, { useEffect } from "react";

interface Props {
  usageData: UsageRespModel;
}

const convertBytes = (bytes: number): string => {
  const inGb = bytes / 1000000000;
  if (inGb < 1) return (inGb * 1000).toFixed(2) + " MB";
  return inGb.toFixed(2) + " GB";
};

const checkProgress = (used: number): number => {
  return (used / 50000000000) * 100;
};

const UsageDataContainer = ({ usageData }: Props) => {
  //   useEffect(() => {
  //     hiveDetails &&
  //       getUsageData({
  //         organizationId: hiveDetails?.communityId,
  //       });
  //   }, [hiveDetails]);

  return (
    <div className="usage_data_container">
      <AnalyticsCapsule>
        <div className="headers_and_value">
          <h5 className="font-bold">Streaming Data</h5>
          {usageData && (
            <div>
              <h2 className="font-bold text-3xl">
                {convertBytes(usageData?.bytesStreamed)}
                {" / 50 GB"}
                <b className="text-sm"> used</b>
              </h2>
              <LineBreak />
              <LinearProgress
                variant="determinate"
                value={checkProgress(usageData?.bytesStreamed)}
                color="primary"
              />
            </div>
          )}{" "}
        </div>
      </AnalyticsCapsule>
      <AnalyticsCapsule>
        <div className="headers_and_value">
          <h5 className="font-bold">Storage Data</h5>
          {usageData && (
            <div>
              <h2 className="font-bold text-3xl">
                {convertBytes(usageData?.bytesStored)}
                {" / 50 GB"}
                <b className="text-sm"> used</b>
              </h2>
              <LineBreak />
              <LinearProgress
                variant="determinate"
                value={checkProgress(usageData?.bytesStored)}
                color="primary"
              />
            </div>
          )}{" "}
        </div>
      </AnalyticsCapsule>
    </div>
  );
};

export default UsageDataContainer;
