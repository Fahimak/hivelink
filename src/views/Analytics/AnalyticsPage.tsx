"use client";
import LineBreak from "components/LineBreak";
import DateSelector from "components/DateSelector";
import UsageDataContainer from "./UsageDataContainer";
import MetricsContainer from "./MetricsContainer";
import VisitorsData from "./VisitorsData";
import ProductCount from "./ProductCount";
import { useEffect, useState } from "react";
import { UsageRespModel } from "api/models/Analytics/metrics";
import { ProductCountItem, VisitorsModel } from "api/models/Analytics/ctaModel";
import Loading from "app/loading";

interface Props {
  usageData: UsageRespModel;
  videoCount: number;
  usersCount: number;
  channelsCount: number;
  visitorsData: VisitorsModel[];
  productsCount: ProductCountItem[];
}

const AnalyticsPage = ({
  usageData,
  videoCount,
  usersCount,
  channelsCount,
  visitorsData,
  productsCount,
}: Props) => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className="p-4">
          <h2 className="font-bold text-2xl">Analytics</h2>
          <DateSelector
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
          <LineBreak />
          <UsageDataContainer usageData={usageData} />
          <LineBreak />
          <MetricsContainer
            videoCount={videoCount}
            usersCount={usersCount}
            channelsCount={channelsCount}
          />
          <LineBreak />

          <div className="graph_and_details">
            <VisitorsData
              visitorsData={visitorsData}
              fromDate={fromDate}
              toDate={toDate}
            />
            <ProductCount productsCount={productsCount} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AnalyticsPage;
