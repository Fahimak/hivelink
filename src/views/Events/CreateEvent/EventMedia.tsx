import { CircularProgress } from "@mui/material";
import { EventsItem } from "api/models/Hive/events";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { editEvent, uploadEventVideo } from "api/routes/Events/events";
import { uploadToS3 } from "api/routes/Hive/client";
import FileDrop from "components/FileDrop";
import ImageDropzone from "components/ImageDropzone";
import IslandLayout from "components/IslandLayout/IslandLayout";
import LineBreak from "components/LineBreak";
import { format, parseISO } from "date-fns";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { populateFormData } from "utils/populateForm";
import revalidateTags from "utils/revalidate";

interface Props {
  currentEvent: EventsItem;
  hiveDetails: HiveDetails;
}

const EventMedia = ({ currentEvent, hiveDetails }: Props) => {
  const hiveUuid = hiveDetails.communityUuid;

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [contentType, setContentType] = useState<string>("");

  const [uploadUrl, setUploadUrl] = useState("");

  const [bannerUrl, setBannerUrl] = useState(currentEvent.eventBanner || "");
  const [fileUrl, setFileUrl] = useState(currentEvent.eventThumbnail || "");
  const [mobileUrl, setMobileUrl] = useState("");

  useEffect(() => {
    setBannerUrl(currentEvent.eventBanner);
    setFileUrl(currentEvent.eventThumbnail);
  }, [currentEvent]);

  const [urlChanged, setUrlChanged] = useState(false);
  const [bannerUrlChanged, setBannerUrlChanged] = useState(false);

  const [imageUploaded, setImageUploaded] = useState(false);
  const [bannerUploaded, setBannerUploaded] = useState(false);

  const setLogoFile = (url: string) => {
    setFileUrl(url);
    !!url ? setUrlChanged(true) : setUrlChanged(false);
  };

  const setMobileLogoFile = (url: string) => {
    setMobileUrl(url);
    !!url ? setUrlChanged(true) : setUrlChanged(false);
  };

  const setBannerFile = (url: string) => {
    setBannerUrl(url);
    !!url ? setBannerUrlChanged(true) : setBannerUrlChanged(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  const [changeIntro, setChangeIntro] = useState(false);

  const handleChangeIntro = () => {
    setChangeIntro((prevState) => !prevState);
    setUploadedFile(null);
  };

  const router = useRouter();

  //   useEffect(() => {
  //     if (!!currentEvent) {
  //       dispatch(setBannerUrlChanged(false));
  //       dispatch(setUrlChanged(false));
  //       dispatch(setBannerUploaded(false));
  //     } else {
  //       navigate("/events");
  //     }
  //     //eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const { toastError, toastSuccess } = useTriggerAlert();

  const handleFinish = async () => {
    setIsLoading(true);

    if (uploadedFile) {
      const uploadResp = await uploadEventVideo({
        eventUuid: currentEvent?.eventUuid || "",
        organizationUuid: hiveUuid,
        contentType: "video/mp4",
      });

      if (uploadResp) {
        const formData = new FormData();

        populateFormData(formData, uploadResp.body.data, uploadedFile);
        const uploaded = await uploadToS3(uploadResp.body.data.url, formData);
        if (uploaded) {
          // toastSuccess("Uploaded Video");
        } else {
          toastError("Failed to upload video");
        }
      }
    }

    const edited = await editEvent({
      eventUuid: currentEvent?.eventUuid || "",
      organizationUuid: hiveUuid,
      eventBanner: bannerUrlChanged ? bannerUrl : "",
      eventThumbnail: urlChanged ? fileUrl : "",
    });

    if (edited) {
      toastSuccess("Edited event media");
      await revalidateTags("events");
      await revalidateTags("event");
    } else {
      toastError("Failed to edit event media");
    }

    router.push(`/events/${currentEvent.eventIdentifier}`);

    setIsLoading(false);
  };

  const handleSkip = () => {
    router.push(`/events/${currentEvent.eventIdentifier}`);
  };

  const formatDate = (timestamp: number | string) => {
    // Convert timestamp to date object and format
    return format(new Date(timestamp), "MMM d, yyyy, h:mm a");
  };

  return (
    <div>
      <div className="ce_about_wrapper">
        <h2 className="font-bold text-xl">{currentEvent?.eventName}</h2>
        <h3 className="event_location_view_wrapper">
          {currentEvent?.eventMedium === "online" ? "Online" : "In-Person"}{" "}
          {" ("}
          {formatDate(currentEvent?.eventStartDate)} {" - "}
          {formatDate(currentEvent?.eventEndDate)} {")"}
        </h3>

        <LineBreak />
        <div className="title_and_limit">
          <h3 className="font-bold my-2">Event Banner</h3>
        </div>
        <ImageDropzone
          bannerUrl={bannerUrl}
          file="banner"
          setBannerFile={setBannerFile}
          bannerUploaded={bannerUrlChanged}
        />
        <LineBreak />
        <div className="title_and_limit">
          <h3 className="font-bold my-2">Event Thumbnail</h3>
        </div>
        <ImageDropzone
          urlSent={fileUrl}
          file="channel"
          setMobileFile={setMobileLogoFile}
          setLogoFile={setLogoFile}
          imageUploaded={urlChanged}
          imageUrl={fileUrl}
        />
        <LineBreak />
        <>
          <div className="intro_video_edit_header">
            <h3 className="font-bold my-2">Event Video</h3>

            {(uploadedFile || currentEvent.eventVideo) && (
              <p onClick={handleChangeIntro} className="link text-sm">
                {`${changeIntro ? "Cancel" : "Change Video"}`}
              </p>
            )}
          </div>

          {changeIntro && !uploadedFile ? (
            <FileDrop
              setVideoFile={setUploadedFile}
              setThumbnail={setThumbnail}
              setContentType={setContentType}
              hiveDetails={hiveDetails}
            />
          ) : uploadedFile ? (
            <div className="intro_video_edit_wrapper">
              <video
                width="270px"
                height="480px"
                src={URL.createObjectURL(uploadedFile)}
                controls
                style={{
                  overflow: "hidden",
                  background: "black",
                }}
              />
            </div>
          ) : currentEvent?.eventVideo ? (
            <div className="intro_video_edit_wrapper">
              <video
                width="270px"
                height="480px"
                src={currentEvent.eventVideo}
                controls
                style={{
                  overflow: "hidden",
                  background: "black",
                }}
              />
            </div>
          ) : (
            <FileDrop
              setVideoFile={setUploadedFile}
              setThumbnail={setThumbnail}
              setContentType={setContentType}
              hiveDetails={hiveDetails}
            />
          )}
        </>
        <LineBreak />
        <>
          {isLoading ? (
            <div className="nextBtn primaryBtn">
              <CircularProgress size={20} color="inherit" />
            </div>
          ) : (
            <>
              {!!bannerUrl || !!fileUrl || !!uploadedFile ? (
                <div onClick={handleFinish} className="nextBtn primaryBtn">
                  Save
                </div>
              ) : (
                <div onClick={handleSkip} className="nextBtn primaryBtn">
                  {" "}
                  Skip
                </div>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default EventMedia;
