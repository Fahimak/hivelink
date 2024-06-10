"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import LineBreak from "components/LineBreak";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  date?: string;
  setFromDate: Dispatch<SetStateAction<Date | null>>;
  setToDate: Dispatch<SetStateAction<Date | null>>;
  fromDate: Date | null;
  toDate: Date | null;
}

const DateSelector = ({
  date,
  setFromDate,
  setToDate,
  fromDate,
  toDate,
}: Props) => {
  const [customDate, setCustomDate] = useState(date ? date : "today");

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setCustomDate(event.target.value);
    if (value === "today") {
      setFromDate(dayjs().startOf("day").toDate());
      setToDate(dayjs().endOf("day").toDate());
    }
    if (value === "last2Days") {
      setFromDate(dayjs().subtract(1, "day").startOf("day").toDate());
      setToDate(new Date());
    }
    if (value === "lastWeek") {
      setFromDate(dayjs().subtract(7, "day").toDate());
      setToDate(new Date());
    }
    if (value === "lastMonth") {
      setFromDate(dayjs().subtract(30, "day").toDate());
      setToDate(new Date());
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="custom_select_wrapper">
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel id="date_custome_selector">Date Range</InputLabel>
          <Select
            labelId="date_custome_selector"
            id="date_custom"
            value={customDate}
            onChange={handleChange}
            label="Date Range"
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="last2Days">Last 2 Days</MenuItem>
            <MenuItem value="lastWeek">Last 7 Days</MenuItem>
            <MenuItem value="lastMonth">Last 30 Days</MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
          </Select>
        </FormControl>
      </div>
      {customDate === "custom" && (
        <div className="date_picker_container">
          <div className="w_full">
            <h4>From Date</h4>
            <LineBreak />
            <div className="date_picker_wrapper">
              {/* <DatePicker
            selected={fromDate}
            onChange={(date) => dispatch(setFromDate(date))}
            className="date_picker"
          /> */}
              <DatePicker
                className="date_picker"
                onChange={(value) => {
                  setFromDate(value?.toDate()!);
                }}
                value={dayjs(fromDate)}
              />

              {/* <div className="down_arrow_wrapper">
              <DropDownSVG />
            </div> */}
            </div>
          </div>
          <div className="w_full">
            <h4>To Date</h4>
            <LineBreak />
            <div className="date_picker_wrapper">
              {/* <DatePicker
            selected={toDate}
            onChange={(date) => dispatch(setToDate(date))}
            className="date_picker"
          /> */}
              <DatePicker
                className="date_picker"
                onChange={(value) => setToDate(value?.toDate()!)}
                value={dayjs(toDate)}
              />
              {/* <div className="down_arrow_wrapper">
              <DropDownSVG />
            </div> */}
            </div>
          </div>
        </div>
      )}
    </LocalizationProvider>
  );
};

export default DateSelector;
