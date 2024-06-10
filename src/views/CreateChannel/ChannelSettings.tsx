import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Switch from "@mui/joy/Switch";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";

import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import LineBreak from "components/LineBreak";
import { useTriggerAlert } from "hooks/useTriggerAlert";

interface Props {
  linkTag: string;
  handleLinkChange: any;
  handleCustomTag: any;
  customTag: string;
  isAds: boolean;
  setIsAds: Dispatch<SetStateAction<boolean>>;
  isPaid: boolean;
  setIsPaid: Dispatch<SetStateAction<boolean>>;
  isPrivate: boolean;
  setIsPrivate: Dispatch<SetStateAction<boolean>>;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  videoDuration: number;
  setVideoDuration: Dispatch<SetStateAction<number>>;
}

const ChannelSettings = ({
  linkTag,
  handleLinkChange,
  handleCustomTag,
  customTag,
  isAds,
  setIsAds,
  isPaid,
  setIsPaid,
  isPrivate,
  setIsPrivate,
  amount,
  setAmount,
  videoDuration,
  setVideoDuration,
}: Props) => {
  const { toastInfo } = useTriggerAlert();

  return (
    <>
      <StyledEngineProvider injectFirst>
        <CssVarsProvider>
          <div className="channel_duration_container">
            <p className="font-bold">Video Duration Limit</p>
            <div className="video_limit_btns">
              <button
                onClick={() => setVideoDuration(60)}
                className={`${
                  videoDuration === 60 ? "primaryBtn" : "secondaryBtn"
                }`}
              >
                1 min
              </button>
              <button
                onClick={() => setVideoDuration(180)}
                className={`${
                  videoDuration === 180 ? "primaryBtn" : "secondaryBtn"
                }`}
              >
                3 mins
              </button>
              <button
                onClick={() => setVideoDuration(300)}
                className={`${
                  videoDuration === 300 ? "primaryBtn" : "secondaryBtn"
                }`}
              >
                5 mins
              </button>
              <button
                onClick={() => setVideoDuration(600)}
                className={`${
                  videoDuration === 600 ? "primaryBtn" : "secondaryBtn"
                }`}
              >
                10 mins
              </button>
            </div>
          </div>
          <div className="channel_setting_container">
            <Switch
              checked={isPrivate}
              onChange={(event) => setIsPrivate(event.target.checked)}
            />
            <p>Set channel visibility to private</p>
          </div>
          <div className="channel_setting_container">
            <Switch
              checked={isAds}
              onChange={(event) => setIsAds(event.target.checked)}
            />
            <p>Enable Advertisements</p>
          </div>
          <div className="channel_paid_container">
            <div className="switch_display">
              <Switch
                checked={isPaid}
                onChange={(event) => setIsPaid(event.target.checked)}
              />
              <p>Paid</p>
            </div>
            {isPaid && (
              <div className="channel_amount_wrapper">
                <input
                  className="outline-none"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => {
                    if (+e.target.value > 499) {
                      toastInfo("Please enter amount less than 500");
                    }
                    /^\d*(\.\d{0,2})?$/.test(e.target.value) &&
                      (+e.target.value < 500 || e.target.value === "") &&
                      setAmount(e.target.value);
                  }}
                />
                <h5 className="">USD</h5>
              </div>
            )}
          </div>
        </CssVarsProvider>
      </StyledEngineProvider>
      <>
        <h4 className="cta_shop_margins">Shoppable Link CTA Name</h4>
        <LineBreak />
        <div className="link_flex_display">
          <FormControl className="half_width ">
            <InputLabel id="demo-simple-select-label">CTA Name</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={linkTag}
              label="CTA Name"
              onChange={handleLinkChange}
            >
              <MenuItem value="Buy Now">
                <p>Buy Now</p>
              </MenuItem>
              <MenuItem value="View Product">
                <p>View Product</p>
              </MenuItem>
              <MenuItem value="custom">
                <p>Custom</p>
              </MenuItem>
              {/* <MenuItem value={linkTag}> */}
            </Select>
          </FormControl>
          {linkTag === "custom" && (
            <TextField
              placeholder="Click Here"
              className="half_width"
              name="customTag"
              onChange={handleCustomTag}
              value={customTag}
              id="outlined-basic"
              label="Custom CTA Name"
              variant="outlined"
            />
          )}
        </div>
      </>
    </>
  );
};

export default ChannelSettings;
