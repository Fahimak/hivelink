"use client";
import { Dialog, SelectChangeEvent } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import BackButton from "components/BackButton";
import ImageDropzone from "components/ImageDropzone";
import IslandLayout from "components/IslandLayout";
import LineBreak from "components/LineBreak";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import React, { useState, useEffect } from "react";
import ChannelSettings from "./ChannelSettings";
import { createChannel } from "api/routes/Channels/channels";
import { useRouter } from "next/navigation";
import revalidateTags from "utils/revalidate";
import Loading from "app/loading";

interface Props {
  hiveDetails: HiveDetails;
}

const CreateChannel = ({ hiveDetails }: Props) => {
  const { toastError, toastSuccess, toastInfo } = useTriggerAlert();

  const [amount, setAmount] = useState("");

  const [isPaid, setIsPaid] = useState(false);
  const [isAds, setIsAds] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [fileUrl, setFileUrl] = useState("");
  const [mobileUrl, setMobileUrl] = useState("");

  const [urlChanged, setUrlChanged] = useState(false);

  const setLogoFile = (url: string) => {
    setFileUrl(url);
    !!url ? setUrlChanged(true) : setUrlChanged(false);
  };

  const setMobileLogoFile = (url: string) => {
    setMobileUrl(url);
    !!url ? setUrlChanged(true) : setUrlChanged(false);
  };

  const [createChannelForm, setCreateChannelForm] = useState({
    channelName: "",
    channelDescription: "",
  });

  const [linkTag, setLinkTag] = useState("");

  const handleLinkChange = (value: SelectChangeEvent) => {
    setLinkTag(value.target.value);
  };

  const [customTag, setCustomTag] = useState("");

  const handleCustomTag = (e: any) => {
    setCustomTag(e.target.value.slice(0, 30));
  };

  const router = useRouter();

  //   useEffect(() => {
  //     if (isDone) {
  //       dispatch(
  //         getChannelList({
  //           hiveId: hiveDetails?.communityId!,
  //           isMemberView: isMember,
  //         })
  //       );
  //       navigate("/home");
  //       dispatch(setIsDone(false));
  //     }
  //   }, [isDone]);

  const handleCreateChannel = async () => {
    setIsLoading(true);

    const created = await createChannel({
      channelName: createChannelForm.channelName,
      category: "",
      channelTier:
        isPrivate && +amount > 0
          ? "PRIVATE_PAID"
          : +amount > 0
          ? "PAID"
          : isPrivate
          ? "INVITE"
          : "FREE",
      uploadFlag: false,
      amount: isPaid ? +amount : 0,
      paymentType: "FREE",
      organizationId: hiveDetails?.communityId || 1,
      description: createChannelForm.channelDescription,
      channelType: "VIDEO",
      channelLogo: mobileUrl,
      channelWebLogo: fileUrl,
      channelBanner: "",
      duration: videoDuration,
      advFrequency: 5,
      advertisement: isAds,
      orderByDesc: true,
      ctaName: linkTag === "custom" ? customTag : linkTag,
      channelTabs: [
        {
          tabType: "attribute1",
          tabName: "",
          activeFlag: false,
        },
        {
          tabType: "attribute2",
          tabName: "",
          activeFlag: false,
        },
        {
          tabType: "attribute3",
          tabName: "Description",
          activeFlag: true,
        },
        {
          tabType: "attribute4",
          tabName: "",
          activeFlag: false,
        },
        {
          tabType: "attribute5",
          tabName: "",
          activeFlag: false,
        },
      ],
    });

    if (created) {
      await revalidateTags("channels");
      router.back();
      toastSuccess("Created channel!");
    } else {
      toastError("Failed to create channel");
    }

    setIsLoading(true);
  };

  const handleChannelForm = (e: React.ChangeEvent<any>, limit: number) => {
    setCreateChannelForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value.slice(0, limit),
    }));
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient ? (
        <IslandLayout>
          <div className="create_channel_container">
            <BackButton />
            <h1 className="font-bold text-3xl">Create new channel</h1>
            <div>
              <div className="title_and_limit">
                <h4 className="font-bold">Channel Name*</h4>
                <div className="character_limit text-sm">
                  {createChannelForm.channelName.length}/18
                </div>
              </div>
              <LineBreak />
              <input
                name="channelName"
                value={createChannelForm.channelName}
                onChange={(e) => handleChannelForm(e, 18)}
                className="input_border text_padding input_width_full"
                placeholder="Eg: Introduction"
              />
            </div>
            <div>
              <div className="title_and_limit">
                <h4 className="font-bold">Channel Description</h4>
                <div className="character_limit text-sm">
                  {createChannelForm.channelDescription.length}/280
                </div>{" "}
              </div>
              <LineBreak />
              <textarea
                name="channelDescription"
                value={createChannelForm.channelDescription}
                onChange={(e) => handleChannelForm(e, 280)}
                className="input_border text_padding input_width_full who_are_we_section_text"
                placeholder="A few words about the channel"
              />
            </div>
            <div>
              <h4 className="font-bold">Channel Image</h4>
              <LineBreak />
              <ImageDropzone
                file="channel"
                setMobileFile={setMobileLogoFile}
                setLogoFile={setLogoFile}
                imageUploaded={urlChanged}
                imageUrl={fileUrl}
              />
            </div>
            <div>
              <h4 className="font-bold">Channel Settings</h4>
              <LineBreak />
              <ChannelSettings
                linkTag={linkTag}
                handleLinkChange={handleLinkChange}
                handleCustomTag={handleCustomTag}
                customTag={customTag}
                isAds={isAds}
                setIsAds={setIsAds}
                amount={amount}
                setAmount={setAmount}
                isPrivate={isPrivate}
                setIsPrivate={setIsPrivate}
                videoDuration={videoDuration}
                setVideoDuration={setVideoDuration}
                isPaid={isPaid}
                setIsPaid={setIsPaid}
              />
            </div>
            <div className="flex-end">
              <div className="create_channel_btns">
                <div onClick={() => router.back()} className="secondaryBtn">
                  Cancel
                </div>
                {createChannelForm.channelName ? (
                  <div onClick={handleCreateChannel} className="primaryBtn">
                    Create
                  </div>
                ) : (
                  <div className="disabledBtn">Create</div>
                )}
              </div>
            </div>
          </div>
          <Dialog open={isLoading}>
            <div className="loader_padding">
              <CircularProgress size={30} color="inherit" />
            </div>
          </Dialog>
        </IslandLayout>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CreateChannel;
