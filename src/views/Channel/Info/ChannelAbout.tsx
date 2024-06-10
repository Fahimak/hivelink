"use client";
import { CircularProgress } from "@mui/material";
import { ChannelItemModel } from "api/models/Channels/channels";
import { editChannelDetails } from "api/routes/Channels/channels";
import ImageDropzone from "components/ImageDropzone";
import IslandLayout from "components/IslandLayout";
import LineBreak from "components/LineBreak";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import { useState } from "react";
import revalidateTags from "utils/revalidate";

interface Props {
  channel: ChannelItemModel;
}

const ChannelAbout = ({ channel }: Props) => {
  const channelObj = channel.objChannel;
  const channelProps = channel.objChannelProperties;

  const [fileUrl, setFileUrl] = useState(channel.objChannelProperties.logo);
  const [mobileUrl, setMobileUrl] = useState("");

  const [urlChanged, setUrlChanged] = useState(false);

  const [editChannelForm, setEditChannelForm] = useState({
    channelName: channelObj?.channelName || "",
    channelDescription: channelObj?.description || "",
  });

  const setLogoFile = (url: string) => {
    setFileUrl(url);
    !!url ? setUrlChanged(true) : setUrlChanged(false);
  };

  const setMobileLogoFile = (url: string) => {
    setMobileUrl(url);
    !!url ? setUrlChanged(true) : setUrlChanged(false);
  };

  const handleChannelForm = (e: React.ChangeEvent<any>, limit: number) => {
    setEditChannelForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value.slice(0, limit),
    }));
  };

  const [isLoading, setIsLoading] = useState(false);

  const { toastError, toastSuccess } = useTriggerAlert();

  const handleSave = async () => {
    setIsLoading(true);

    const edited = await editChannelDetails({
      channelName: editChannelForm.channelName!,
      category: "CHANNEL",
      channelLogo: mobileUrl,
      channelWebLogo: fileUrl,
      channelTier: "Invite",
      uploadFlag: false,
      amount: 0,
      description: editChannelForm.channelDescription!,
      maxVideoLength: 0,
      channelId: channelObj?.id!,
      channelNameFlag: true,
      categoryFlag: false,
      channelTierFlag: false,
      amountFlag: false,
      descriptionFlag: true,
      maxVideoLengthFlag: false,
      channelLogoFlag: urlChanged,
      channelWebLogoFlag: urlChanged,
      orderByDesc: false,
      adsRequired: false,
      ctaName: "",
      ctaNameFlag: false,
    });

    if (edited) {
      await revalidateTags("channel");
      toastSuccess("Channel Edited");
    } else {
      toastError("Failed to edit channel");
    }
    setIsLoading(false);
  };

  const removeChannelLogo = async () => {
    setIsLoading(true);
    const removed = await editChannelDetails({
      channelName: editChannelForm.channelName!,
      category: "CHANNEL",
      channelLogo: "",
      channelWebLogo: "",
      channelTier: "Invite",
      uploadFlag: false,
      amount: 0,
      description: editChannelForm.channelDescription!,
      maxVideoLength: 0,
      channelId: channelObj?.id!,
      channelNameFlag: false,
      categoryFlag: false,
      channelTierFlag: false,
      amountFlag: false,
      descriptionFlag: false,
      maxVideoLengthFlag: false,
      channelLogoFlag: true,
      channelWebLogoFlag: true,
      orderByDesc: false,
      adsRequired: false,
      ctaName: "",
      ctaNameFlag: false,
    });

    if (removed) {
      await revalidateTags("channel");
      toastSuccess("Channel Logo Removed");
    } else {
      toastError("Failed to remove channel logo");
    }
    setIsLoading(false);
  };

  return (
    <div className="p-4">
      {channelObj && (
        <div className="about_container">
          <LineBreak />
          <div className="w_full">
            <div className="title_and_limit">
              <h4 className="font-bold">Channel Name*</h4>
              {editChannelForm.channelName && (
                <div className="character_limit text-sm">
                  {editChannelForm.channelName.length}/18
                </div>
              )}
            </div>
            <LineBreak />
            {channelProps?.defaultChannel ? (
              <input
                readOnly
                name="channelName"
                value={editChannelForm.channelName}
                onChange={(e) => handleChannelForm(e, 18)}
                className="input_border text_padding input_width_full"
                placeholder="Eg: Introduction"
              />
            ) : (
              <input
                name="channelName"
                value={editChannelForm.channelName}
                onChange={(e) => handleChannelForm(e, 18)}
                className="input_border text_padding input_width_full"
                placeholder="Eg: Introduction"
              />
            )}
          </div>
          <div>
            <div className="title_and_limit">
              <h4 className="font-bold">Channel Description</h4>
              {editChannelForm.channelDescription && (
                <div className="character_limit text-sm">
                  {editChannelForm.channelDescription.length}/280
                </div>
              )}
            </div>
            <LineBreak />
            <textarea
              name="channelDescription"
              value={editChannelForm.channelDescription.slice()}
              onChange={(e) => handleChannelForm(e, 280)}
              className="input_border text_padding input_width_full who_are_we_section_text"
              placeholder="A few words about the channel"
            />
          </div>
          <div className="title_and_limit">
            <h4 className="font-bold">Channel Logo</h4>
            <p onClick={removeChannelLogo} className="link text-sm">
              Remove Image
            </p>
          </div>
          <IslandLayout>
            <ImageDropzone
              urlSent={channel.objChannelProperties.logo}
              file="channel"
              setMobileFile={setMobileLogoFile}
              setLogoFile={setLogoFile}
              imageUploaded={urlChanged}
              imageUrl={fileUrl}
            />
          </IslandLayout>
        </div>
      )}
      <>
        {isLoading ? (
          <div className="nextBtn primaryBtn">
            <CircularProgress size={20} color="inherit" />
          </div>
        ) : (
          <>
            {editChannelForm.channelName &&
            editChannelForm.channelName.length > 3 ? (
              <div onClick={handleSave} className="nextBtn primaryBtn">
                Save
              </div>
            ) : (
              <div className="disabledBtn nextBtn">Save</div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default ChannelAbout;
