"use client";
import { VisitorsModel } from "api/models/Analytics/ctaModel";
import { fetchVisitorsData } from "api/routes/Analytics/analytics";
import AnalyticsCapsule from "components/AnalyticsCapsule";
import { org_uuid } from "constants/constants";
import { format, formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryStack, VictoryAxis } from "victory";

type FormatterProps = {
  value: number;
  unit: string;
  suffix: string;
};

interface Props {
  visitorsData: VisitorsModel[];
  fromDate: Date | null;
  toDate: Date | null;
}

const VisitorsData = ({ visitorsData, fromDate, toDate }: Props) => {
  const [data, setData] = useState(visitorsData);

  const getData = async () => {
    const resp = await fetchVisitorsData({
      organizationUuid: org_uuid,
      fromDate: fromDate,
      toDate: toDate,
    });

    if (resp) {
      setData(resp);
    }
  };

  useEffect(() => {
    getData();
  }, [org_uuid, fromDate, toDate]);

  return (
    <AnalyticsCapsule>
      <div className="tags visitors_graph_limit">
        <h3 className="font-bold text-lg">
          Usage date from:{" "}
          {formatDistanceToNow(new Date(fromDate || new Date()), {
            addSuffix: true,
          })}
        </h3>

        <VictoryChart domainPadding={10}>
          <VictoryAxis
            tickFormat={(date: number) => format(new Date(date), "MMM d")}
            style={{
              tickLabels: { fontSize: 8 },
            }}
            tickCount={3}
          />
          <VictoryAxis
            dependentAxis
            style={{
              tickLabels: { fontSize: 8 },
            }}
            tickCount={7}
          />
          <VictoryStack>
            <VictoryBar
              cornerRadius={3}
              style={{ data: { fill: "#000", width: "10" } }}
              data={data}
              x="date"
              y="newUsers"
            />
            <VictoryBar
              cornerRadius={3}
              style={{ data: { fill: "#41C667", width: "10" } }}
              data={data}
              x="date"
              y="existingUsers"
            />
          </VictoryStack>
        </VictoryChart>
      </div>
    </AnalyticsCapsule>
  );
};

export default VisitorsData;
