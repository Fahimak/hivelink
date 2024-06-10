import { ProfileItem } from "api/models/profile";
import { updateUserEmail } from "api/routes/Profile/profile";
import LineBreak from "components/LineBreak/LineBreak";
import AddContactSVG from "assets/svg/add_contact.svg";
import GreenTickSVG from "assets/svg/greenTick.svg";
import RedCrossSVG from "assets/svg/redCross.svg";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import React, { ChangeEvent, useState } from "react";
import revalidateTags from "utils/revalidate";
import Image from "next/image";

interface Props {
  profile: ProfileItem;
}

const ProfileEmail = ({ profile }: Props) => {
  const [enterEmail, setEnterEmail] = useState(false);

  const { toastError, toastSuccess } = useTriggerAlert();

  const handleAddEmail = () => {
    setEnterEmail(true);
  };

  const handleCloseEmail = () => {
    setEnterEmail(false);
  };

  const [email, setEmail] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSaveEmail = async () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      const updated = await updateUserEmail({
        email: email,
      });

      if (updated) {
        await revalidateTags("profile");
        toastSuccess("Email id updated");
      } else {
        toastError("Failed to update email");
      }

      handleCloseEmail();
      setEmail("");
    } else {
      toastError("Please enter a valid email");
    }
  };

  return (
    <div>
      {!!profile?.email ? (
        <p>{profile?.email}</p>
      ) : (
        <div>
          {enterEmail ? (
            <div className="link_edit_save_wrapper social_link_edit_input_wrapper_underline">
              <input
                className="social_link_edit_input"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <div className="sle_confirm_btns">
                <div onClick={handleSaveEmail} className="pointer">
                  <Image src={GreenTickSVG} alt="svg" />
                </div>
                <div onClick={handleCloseEmail} className="pointer">
                  <Image src={RedCrossSVG} alt="svg" />
                </div>
              </div>
            </div>
          ) : (
            <>
              <LineBreak />
              <div onClick={handleAddEmail} className="contact_empty_add">
                <Image src={AddContactSVG} alt="svg" />

                <p>Add Email</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileEmail;
