import { CircularProgress } from "@mui/material";
import BackButton from "components/BackButton";
import LineBreak from "components/LineBreak";
import React, { useEffect, useState } from "react";
import ImageDropzone from "components/ImageDropzone";
// import FileDrop from "components/FileDrop";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { editHiveDetails, fetchIntroPresinedUrl } from "api/routes/Hive/hive";
import { uploadToS3 } from "api/routes/Hive/client";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import revalidateTags from "utils/revalidate";
import FileDrop from "components/FileDrop";
import { populateFormData } from "utils/populateForm";
import { org_uuid } from "constants/constants";
import { getCookie } from "cookies-next";

interface Props {
  hiveDetails: HiveDetails;
}

const HiveMedia = ({ hiveDetails }: Props) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [contentType, setContentType] = useState<string>("");

  const [uploadUrl, setUploadUrl] = useState("");

  const [bannerUrl, setBannerUrl] = useState(hiveDetails.communityBanner);
  const [fileUrl, setFileUrl] = useState(hiveDetails.communityLogo);
  const [mobileUrl, setMobileUrl] = useState("");

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

  //   TODO : Ready to upload to ec2

  //   useEffect(() => {
  //     hiveDetails &&
  //       dispatch(
  //         readyToUpload({
  //           organizationUuid: hiveDetails?.communityUuid,
  //         })
  //       );
  //   }, [dispatch, hiveDetails]);

  // IF EDITED
  //   useEffect(() => {
  //     if (isEdited) {
  //       toastSuccess("Hive Details Saved");

  //       dispatch(setHiveEdited(false));

  //       dispatch(
  //         getHiveDetails({
  //           communitySubDomain: localStorage.getItem("subDomain"),
  //           // organizationUuid: process.env.REACT_APP_ORG_UUID,
  //         })
  //       );
  //     }
  //   }, [isEdited, dispatch]);

  const handleUploadedFile = async () => {
    const resp = await fetchIntroPresinedUrl({
      type: "INTROVIDEO",
      communityId: hiveDetails.communityId,
    });

    if (resp) {
      setIsLoading(true);

      const formData = new FormData();
      const data = resp.preSigned.data;

      setUploadUrl(resp.sourceUrl);

      populateFormData(formData, data, uploadedFile!);

      const uploaded = await uploadToS3(data?.url, formData);
      if (uploaded) {
        // await revalidateTags("hive");
        // toastSuccess("Uploaded Video");
      } else {
        // toastError("Failed to upload video");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (uploadedFile) {
      hiveDetails && handleUploadedFile();
    }
  }, [uploadedFile]);

  useEffect(() => {
    setBannerUrlChanged(false);
    setUrlChanged(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { toastError, toastSuccess } = useTriggerAlert();

  const handleSave = async () => {
    setIsLoading(true);

    const edited = await editHiveDetails({
      communityName: "",
      communityTier: "",
      communityLogo: mobileUrl,
      communityBanner: bannerUrl,
      marketPlace: "",
      longDescription: "",
      communityUuid: org_uuid,
      communitySubDomain: getCookie("subDomain")!,
      communityId: hiveDetails?.communityId!,
      communityBio: "",
      description: "",
      communityBioFlag: false,
      communityNameFlag: false,
      descriptionFlag: false,
      communityTierFlag: false,
      marketPlaceFlag: false,
      communityLogoFlag: urlChanged,
      communityBannerFlag: bannerUrlChanged,
      longDescriptionFlag: false,
      communityWebLogo: fileUrl,
      communityWebLogoFlag: urlChanged,
      introVideo: uploadUrl ? uploadUrl : "",
      introVideoFlag: !!uploadedFile,
      communitySubDomainFlag: false,
      showSuggested: true,
      showSuggestedFlag: false,
      chatSupportEnabled: false,
      chatSupportEnabledFlag: false,
      customDomain: "",
      customDomainFlag: false,
      introVideoThumbnail: "",
      introVideoThumbnailType: "",
      introVideoThumbnailFlag: false,
    });

    if (edited) {
      toastSuccess("Edited hive media");
      await revalidateTags("hive");
    } else {
      toastError("Failed to edit hive media");
    }
    setUploadedFile(null);
    setChangeIntro(false);
    setIsLoading(false);
  };

  const [changeIntro, setChangeIntro] = useState(false);

  const handleChangeIntro = () => {
    setChangeIntro((prevState) => !prevState);
    setUploadedFile(null);
  };

  const removeHiveLogo = async () => {
    setIsLoading(true);

    editHiveDetails({
      communityName: "",
      communityTier: "",
      communityLogo: "",
      communityBanner: "",
      marketPlace: "",
      longDescription: "",
      communityUuid: org_uuid,
      communitySubDomain: getCookie("subDomain")!,
      communityId: hiveDetails?.communityId!,
      communityBio: "",
      description: "",
      communityBioFlag: false,
      communityNameFlag: false,
      descriptionFlag: false,
      communityTierFlag: false,
      marketPlaceFlag: false,
      communityLogoFlag: true,
      communityBannerFlag: false,
      longDescriptionFlag: false,
      communityWebLogo: "",
      communityWebLogoFlag: true,
      introVideo: "",
      introVideoFlag: false,
      communitySubDomainFlag: false,
      showSuggested: true,
      showSuggestedFlag: false,
      chatSupportEnabled: false,
      chatSupportEnabledFlag: false,
      customDomain: "",
      customDomainFlag: false,
      introVideoThumbnail: "",
      introVideoThumbnailType: "",
      introVideoThumbnailFlag: false,
    });

    await revalidateTags("hive");

    setUploadedFile(null);

    setIsLoading(false);
  };

  const removeHiveBanner = async () => {
    setIsLoading(true);

    editHiveDetails({
      communityName: "",
      communityTier: "",
      communityLogo: "",
      communityBanner: "",
      marketPlace: "",
      longDescription: "",
      communityUuid: org_uuid,
      communitySubDomain: getCookie("subDomain")!,
      communityId: hiveDetails?.communityId!,
      communityBio: "",
      description: "",
      communityBioFlag: false,
      communityNameFlag: false,
      descriptionFlag: false,
      communityTierFlag: false,
      marketPlaceFlag: false,
      communityLogoFlag: false,
      communityBannerFlag: true,
      longDescriptionFlag: false,
      communityWebLogo: "",
      communityWebLogoFlag: false,
      introVideo: "",
      introVideoFlag: false,
      communitySubDomainFlag: false,
      showSuggested: true,
      showSuggestedFlag: false,
      chatSupportEnabled: false,
      chatSupportEnabledFlag: false,
      customDomain: "",
      customDomainFlag: false,
      introVideoThumbnail: "",
      introVideoThumbnailType: "",
      introVideoThumbnailFlag: false,
    });
    setUploadedFile(null);
    await revalidateTags("hive");

    setIsLoading(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="ce_about_wrapper">
      <div className="about_container">
        <LineBreak />
        <div className="title_and_limit">
          <h3 className="font-bold text-lg">Hive Banner</h3>
          <p onClick={removeHiveBanner} className="link text-sm">
            Remove Image
          </p>
        </div>
        {hiveDetails && (
          <ImageDropzone
            bannerUrl={bannerUrl}
            file="banner"
            setBannerFile={setBannerFile}
            setMobileFile={setMobileLogoFile}
            setLogoFile={setLogoFile}
            bannerUploaded={bannerUrlChanged}
            imageUploaded={urlChanged}
            imageUrl={fileUrl}
          />
        )}
        <div className="title_and_limit">
          <h3 className="font-bold text-lg">Hive Logo</h3>
          <p onClick={removeHiveLogo} className="link text-sm">
            Remove Image
          </p>
        </div>
        <ImageDropzone
          urlSent={fileUrl}
          file="logo"
          setBannerFile={setBannerFile}
          setMobileFile={setMobileLogoFile}
          setLogoFile={setLogoFile}
          bannerUploaded={bannerUrlChanged}
          imageUploaded={urlChanged}
          imageUrl={fileUrl}
        />

        <>
          <div className="intro_video_edit_header">
            <h3 className="font-bold text-lg">Introduction Video</h3>
            {!!hiveDetails?.introVideo && (
              <p onClick={handleChangeIntro} className="link text-sm">
                {`${changeIntro ? "Cancel" : "Change Video"}`}
              </p>
            )}
          </div>
          {!!!hiveDetails?.introVideo ? (
            <>
              {uploadedFile ? (
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
              ) : (
                <FileDrop
                  setVideoFile={setUploadedFile}
                  setThumbnail={setThumbnail}
                  setContentType={setContentType}
                  hiveDetails={hiveDetails}
                />
              )}
            </>
          ) : (
            <>
              {changeIntro ? (
                <>
                  {uploadedFile ? (
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
                  ) : (
                    <FileDrop
                      setVideoFile={setUploadedFile}
                      setThumbnail={setThumbnail}
                      setContentType={setContentType}
                      hiveDetails={hiveDetails}
                    />
                  )}
                </>
              ) : (
                <div className="intro_video_edit_wrapper">
                  <video
                    width="270px"
                    height="480px"
                    src={hiveDetails?.introVideo}
                    controls
                    style={{
                      overflow: "hidden",
                      background: "black",
                    }}
                  />
                </div>
              )}
            </>
          )}
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
    </div>
  );
};

export default HiveMedia;
