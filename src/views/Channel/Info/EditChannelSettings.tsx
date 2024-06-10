"use client";
import React, { useEffect, useState } from "react";
import Switch from "@mui/joy/Switch";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import IslandLayout from "components/IslandLayout";
import LineBreak from "components/LineBreak";
import { ChannelItemModel } from "api/models/Channels/channels";
import { editChannelDetails } from "api/routes/Channels/channels";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import revalidateTags from "utils/revalidate";
import Loading from "app/loading";

interface Props {
  channel: ChannelItemModel;
}

const EditChannelSettings = ({ channel }: Props) => {
  const channelObj = channel.objChannel;
  const channelProps = channel.objChannelProperties;

  const { toastError, toastSuccess, toastInfo } = useTriggerAlert();

  const [amount, setAmount] = useState(
    channel.objChannelPayment.amount.toString()
  );

  const [isPaid, setIsPaid] = useState(channel.objChannelPayment.amount > 0);
  const [isAds, setIsAds] = useState(false);
  const [isPrivate, setIsPrivate] = useState(
    channel.objChannelProperties.channelTier === "INVITE" ||
      channelProps?.channelTier === "PRIVATE_PAID"
  );
  const [videoDuration, setVideoDuration] = useState(
    channel.objChannelProperties.seconds
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);

    const edited = await editChannelDetails({
      channelName: "",
      category: "CHANNEL",
      channelLogo: "",
      channelWebLogo: "",
      channelTier:
        isPrivate && +amount > 0
          ? "PRIVATE_PAID"
          : isPaid && +amount > 0
          ? "PAID"
          : isPrivate
          ? "INVITE"
          : "FREE",
      uploadFlag: false,
      amount: isPaid ? +amount : 0,
      description: "",
      maxVideoLength: videoDuration,
      channelId: channelObj?.id!,
      channelNameFlag: false,
      categoryFlag: false,
      channelTierFlag: true,
      amountFlag: true,
      descriptionFlag: false,
      maxVideoLengthFlag: true,
      channelLogoFlag: false,
      channelWebLogoFlag: false,
      orderByDesc: channelProps?.orderby === "DESC",
      adsRequired: isAds,
      ctaName: linkTag === "custom" ? customTag : linkTag,
      ctaNameFlag: true,
    });
    if (edited) {
      await revalidateTags("channel");
      toastSuccess("Channel Edited");
    } else {
      toastError("Failed to edit channel");
    }

    setIsLoading(false);
  };

  const [linkTag, setLinkTag] = useState(channelProps?.ctaName || "");

  const handleLinkChange = (value: SelectChangeEvent) => {
    setLinkTag(value.target.value);
  };

  const [customTag, setCustomTag] = useState(
    channel.objChannelProperties.ctaName
  );

  const handleCustomTag = (e: any) => {
    setCustomTag(e.target.value.slice(0, 30));
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className="p-4">
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
              {!channelProps?.defaultChannel && (
                <div className="channel_setting_container">
                  <Switch
                    checked={isPrivate}
                    onChange={(event) => setIsPrivate(event.target.checked)}
                  />
                  <p>Set channel visibility to private</p>
                </div>
              )}
              <div className="channel_setting_container">
                <Switch
                  checked={isAds}
                  onChange={(event) => setIsAds(event.target.checked)}
                />
                <p>Enable Advertisements</p>
              </div>
              {!channelProps?.defaultChannel && (
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
                          if (+e.target.value > 999) {
                            toastInfo("Please enter amount less than 1000");
                          }
                          /^\d*(\.\d{0,2})?$/.test(e.target.value) &&
                            +e.target.value < 1000 &&
                            setAmount(e.target.value);
                        }}
                      />
                      <h5 className="">USD</h5>
                    </div>
                  )}
                </div>
              )}
            </CssVarsProvider>
          </StyledEngineProvider>
          <>
            <h4 className="cta_shop_margins font-bold">
              Shoppable Link CTA Name
            </h4>

            <LineBreak />
            <div className="link_flex_display">
              <FormControl className="half_width ">
                <InputLabel id="demo-simple-select-label">CTA Name</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={linkTag}
                  defaultValue="Buy Now"
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
          <>
            {isLoading ? (
              <div className="nextBtn primaryBtn">
                <CircularProgress size={20} color="inherit" />
              </div>
            ) : (
              <div onClick={handleSave} className="nextBtn primaryBtn">
                Save
              </div>
            )}
          </>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EditChannelSettings;
