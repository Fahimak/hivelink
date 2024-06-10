import React, { Dispatch, SetStateAction } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LineBreak from "components/LineBreak/LineBreak";
import dayjs from "dayjs";

const yesterday = dayjs().subtract(1, "day");

interface Props {
  fromDate: Date | null;
  toDate: Date | null;
  setFromDate: Dispatch<SetStateAction<Date | null>>;
  setToDate: Dispatch<SetStateAction<Date | null>>;
}

const EventsDateTimePicker = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}: Props) => {
  const handleChange = (d: any, val: string) => {
    val === "from"
      ? setFromDate(d?.toDate() || dayjs().startOf("day").toDate())
      : setToDate(d?.toDate() || dayjs().endOf("day").toDate());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="events_date_time_picker">
        <div>
          <h4 className="font-bold">From*</h4>
          <LineBreak />
          <DateTimePicker
            onChange={(d) => handleChange(d, "from")}
            defaultValue={dayjs(fromDate) || yesterday}
            value={dayjs(fromDate)}
            views={["year", "month", "day", "hours", "minutes"]}
          />
        </div>
        <div>
          <h4 className="font-bold">To*</h4>
          <LineBreak />

          <DateTimePicker
            onChange={(d) => handleChange(d, "to")}
            defaultValue={dayjs(toDate) || yesterday}
            value={dayjs(toDate)}
            views={["year", "month", "day", "hours", "minutes"]}
            disablePast
          />
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default EventsDateTimePicker;
