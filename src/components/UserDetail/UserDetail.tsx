import { CircularProgress } from "@mui/material";
import EditIconSVG from "assets/svg/edit_icon.svg";
import GreenTickSVG from "assets/svg/greenTick.svg";
import RedCrossSVG from "assets/svg/redCross.svg";
import React, { useState } from "react";
import ProfileEmail from "./components/ProfileEmail";
import ProfilePhone from "./components/ProfilePhone";
import { ProfileItem } from "api/models/profile";
import { changeUserInfo } from "api/routes/Profile/profile";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import revalidateTags from "utils/revalidate";
import Image from "next/image";

interface Props {
  profile: ProfileItem;
}

const UserDetail = ({ profile }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const [isLoading, setisLoading] = useState(false);

  const [userName, setUserName] = useState(profile?.userName || "");

  const { toastError, toastSuccess } = useTriggerAlert();

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSave = async () => {
    const changed = await changeUserInfo({ userName: userName });

    if (changed) {
      await revalidateTags("profile");
      toastSuccess("Updated username");
    } else {
      toastError("Failed to update username");
    }

    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <div className="profile_user_detail_container">
      <img
        className="profile_logo"
        src={
          profile?.profilePhoto ||
          "https://veehivestage-images.s3.us-east-2.amazonaws.com/profileImage/defaultAvatar.png"
        }
        alt="profile"
      />
      <div
        onClick={handleEditClick}
        className="title_and_limit account_padding pointer"
      >
        <h4>Account</h4>
        <Image src={EditIconSVG} alt="svg" />
      </div>
      {isLoading ? (
        <div className="progress_side_padding">
          <CircularProgress size={15} color="inherit" />
        </div>
      ) : (
        <div className="profile_menu_content_wrapper">
          {isEditing ? (
            <div className="link_edit_save_wrapper social_link_edit_input_wrapper_underline">
              <input
                name="userName"
                value={userName}
                onChange={handleEdit}
                className="social_link_edit_input"
                placeholder="Enter URL"
              />
              <div className="sle_confirm_btns">
                <div className="pointer" onClick={handleSave}>
                  <Image src={GreenTickSVG} alt="svg" />
                </div>
                <div className="pointer" onClick={handleEditClick}>
                  <Image src={RedCrossSVG} alt="svg" />
                </div>
              </div>
            </div>
          ) : (
            <p>@{profile?.userName}</p>
          )}
          <ProfileEmail profile={profile} />
          <ProfilePhone profile={profile} />
        </div>
      )}
    </div>
  );
};

export default UserDetail;
