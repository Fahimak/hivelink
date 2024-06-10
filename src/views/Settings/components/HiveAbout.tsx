import { CircularProgress } from "@mui/material";
import BackButton from "components/BackButton";
import LineBreak from "components/LineBreak";
import Switch from "@mui/joy/Switch";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import {
  ContactInfoModel,
  HiveDetails,
  SocialLinksItem,
} from "api/models/Hive/hiveDetails";
import { useState } from "react";
import { editHiveDetails, saveContactInfo } from "api/routes/Hive/hive";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import revalidateTags from "utils/revalidate";
import { org_uuid } from "constants/constants";
import { getCookie } from "cookies-next";

interface Props {
  hiveDetails: HiveDetails;
  contactInfo: ContactInfoModel;
  socialLinks: SocialLinksItem[];
}

const HiveAbout = ({ hiveDetails, contactInfo, socialLinks }: Props) => {
  const [editHiveForm, setEditHiveForm] = useState({
    hiveName: hiveDetails.communityName,
    hiveDescription: hiveDetails.longDescription,
    hiveAddress: contactInfo.address,
    hiveEmail: contactInfo.email,
    showSuggested: hiveDetails.showSuggested,
    isPrivate: hiveDetails.marketPlace === "PRIVATE",
    showChatBot: hiveDetails.chatSupportEnabled,
  });

  const { toastError, toastSuccess } = useTriggerAlert();

  const handleError = () => {
    toastError("Hive name should be of atleast 3 characters");
  };

  const handleContextError = () => {
    toastError("Set a detailed context of your hive for your Ai bot");
  };

  const handleHiveForm = (e: any, limit: number) => {
    setEditHiveForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked || e.target.value.slice(0, limit),
    }));
  };

  const handleSuggested = (bool: boolean) => {
    setEditHiveForm((prevState) => ({
      ...prevState,
      showSuggested: bool,
    }));
  };

  const handlePrivate = (bool: boolean) => {
    setEditHiveForm((prevState) => ({
      ...prevState,
      isPrivate: bool,
    }));
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    if (hiveDetails) {
      const edited = await editHiveDetails({
        communityName: editHiveForm.hiveName!,
        communityTier: "",
        communityLogo: "",
        communityBanner: "",
        marketPlace: editHiveForm.isPrivate ? "PRIVATE" : "COMMUNITY",
        longDescription: editHiveForm.hiveDescription!,
        communityUuid: org_uuid,
        communitySubDomain: getCookie("subDomain")!,
        communityId: hiveDetails?.communityId!,
        communityBio: "",
        description: "",
        communityBioFlag: false,
        communityNameFlag: true,
        descriptionFlag: false,
        communityTierFlag: false,
        marketPlaceFlag: true,
        communityLogoFlag: false,
        communityBannerFlag: false,
        longDescriptionFlag: true,
        communityWebLogo: "",
        communityWebLogoFlag: false,
        introVideo: "",
        introVideoFlag: false,
        communitySubDomainFlag: false,
        showSuggested: editHiveForm.showSuggested,
        showSuggestedFlag: true,
        chatSupportEnabled: hiveDetails.chatSupportEnabled,
        chatSupportEnabledFlag: false,
        customDomain: "",
        customDomainFlag: false,
        introVideoThumbnail: "",
        introVideoThumbnailType: "",
        introVideoThumbnailFlag: false,
      });

      if (!!edited) {
        await revalidateTags("hive");

        toastSuccess("Edited Hive Details!");
      } else {
        toastError("Failed to edit hive details");
      }
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          editHiveForm.hiveEmail
        )
      ) {
        editHiveForm.hiveEmail = "";
      }
      const contact = await saveContactInfo({
        organizationUuid: org_uuid,
        email: editHiveForm.hiveEmail || "",
        address: editHiveForm.hiveAddress || "",
      });
      if (!!!contact) {
        toastError("Failed to edit hive contact details");
      } else {
        await revalidateTags("contactInfo");
      }
    }
    setIsLoading(false);
  };

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <CssVarsProvider>
          <div className="about_container">
            <LineBreak />
            <div>
              <div className="title_and_limit">
                <h4 className="font-bold">Hive Name</h4>
                {editHiveForm.hiveName && (
                  <div className="character_limit text-sm">
                    {editHiveForm.hiveName.length}/18
                  </div>
                )}
              </div>{" "}
              <LineBreak />
              <input
                name="hiveName"
                value={editHiveForm.hiveName!}
                onChange={(e) => handleHiveForm(e, 18)}
                className="input_border text_padding input_width_full"
                placeholder="Eg: Introduction"
              />
            </div>
            <div>
              <div className="title_and_limit">
                <h4 className="font-bold">Who are we</h4>
                {editHiveForm.hiveDescription && (
                  <div className="character_limit text-sm">
                    {editHiveForm.hiveDescription.length}/280
                  </div>
                )}
              </div>{" "}
              <LineBreak />
              <textarea
                name="hiveDescription"
                value={editHiveForm.hiveDescription!}
                onChange={(e) => handleHiveForm(e, 280)}
                className="input_border text_padding input_width_full who_are_we_section_text"
                placeholder="A few words about the channel"
              />
            </div>
            <div>
              <h4 className="font-bold">Contact Us</h4>
              <LineBreak />
              <div className="input_border text_padding input_width_full input_container_w_border">
                <input
                  name="hiveAddress"
                  value={editHiveForm.hiveAddress}
                  onChange={(e) => handleHiveForm(e, 80)}
                  className="input_width_full input_within_border"
                  placeholder="Eg: Hive city, Country"
                />
                <div className="character_limit text-sm char_limit_input">
                  {editHiveForm.hiveAddress.length}/80
                </div>{" "}
              </div>
              <p className="small_helper_text">
                Enter your address that you want to show in the contact us
                section.
              </p>
              <LineBreak />
              <div className="input_border text_padding input_width_full input_container_w_border">
                <input
                  name="hiveEmail"
                  type="email"
                  value={editHiveForm.hiveEmail}
                  onChange={(e) => handleHiveForm(e, 28)}
                  className="input_width_full input_within_border"
                  placeholder="Eg: hive@hive_email.com"
                />
                <div className="character_limit text-sm char_limit_input">
                  {editHiveForm.hiveEmail.length}/28
                </div>{" "}
              </div>
              <p className="small_helper_text">
                Enter your email that you want to be contact with.
              </p>
            </div>
            {/* <SocialLinkEdit
            editHiveForm={editHiveForm}
            handleHiveForm={handleHiveForm}
          /> */}
            <div className="hive_setting_switch_container">
              <div className="hive_setting_switch_wrapper">
                <Switch
                  checked={editHiveForm.isPrivate}
                  onChange={(event) => handlePrivate(event.target.checked)}
                />
                <p>Set hive visibility to private</p>
              </div>
              <div className="hive_setting_switch_wrapper">
                <Switch
                  checked={editHiveForm.showSuggested}
                  onChange={(event) => handleSuggested(event.target.checked)}
                />
                <p>Show suggested hives</p>
              </div>
            </div>
            {/* {hive.showChatbot && (
            <div>
              <LineBreak />
              <div className="title_and_limit">
                <h4>Set context*</h4>
                {editHiveForm.hiveDescription && (
                  <div className="character_limit text-sm">
                    {hiveContext.length}/3000
                  </div>
                )}
              </div>{" "}
              <LineBreak />
              <p>
                Elaborate on your hive's characteristics, functionalities, and
                capabilities to enable our AI to construct a brand twin for your
                hive.
              </p>
              <LineBreak />
              <textarea
                name="hiveContext"
                value={hiveContext}
                onChange={handleContextChange}
                className="input_border text_padding input_width_full who_are_we_section_text"
                placeholder="An extensive description about your hive"
              />
              <LineBreak />
              <h4>Products</h4>
              <LineBreak />
              <HiveProducts />
            </div>
          )} */}
          </div>
        </CssVarsProvider>
      </StyledEngineProvider>
      <>
        {isLoading ? (
          <div className="nextBtn primaryBtn">
            <CircularProgress size={20} color="inherit" />
          </div>
        ) : (
          <>
            {editHiveForm.showChatBot ? (
              <>
                {editHiveForm.hiveName && editHiveForm.hiveName.length > 2 ? (
                  <div onClick={handleSave} className="nextBtn primaryBtn">
                    Save
                  </div>
                ) : (
                  <div
                    onClick={handleContextError}
                    className="nextBtn disabledBtn"
                  >
                    Save
                  </div>
                )}
              </>
            ) : (
              <>
                {editHiveForm.hiveName && editHiveForm.hiveName.length > 2 ? (
                  <div onClick={handleSave} className="nextBtn primaryBtn">
                    Save
                  </div>
                ) : (
                  <div onClick={handleError} className="nextBtn disabledBtn">
                    Save
                  </div>
                )}
              </>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default HiveAbout;
