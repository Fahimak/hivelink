import LineBreak from "components/LineBreak/LineBreak";
import AddContactSVG from "assets/svg/add_contact.svg";
import GreenTickSVG from "assets/svg/greenTick.svg";
import RedCrossSVG from "assets/svg/redCross.svg";
import React, { ChangeEvent, useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { CountryData } from "react-phone-input-2";
import { ProfileItem } from "api/models/profile";
import { updateUserPhone } from "api/routes/Profile/profile";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import revalidateTags from "utils/revalidate";
import Image from "next/image";

interface Props {
  profile: ProfileItem;
}

const ProfilePhone = ({ profile }: Props) => {
  const [enterPhone, setEnterPhone] = useState(false);

  const handleAddPhone = () => {
    setEnterPhone(true);
  };

  const handleClosePhone = () => {
    setEnterPhone(false);
  };

  const [phone, setPhone] = useState("");

  const [country, setCountry] = useState("");

  const handleChange = (value: string, country: CountryData) => {
    setPhone(value);
    setCountry(country.countryCode.toUpperCase());
  };

  const { toastSuccess, toastError } = useTriggerAlert();

  const handleSavePhone = async () => {
    const updated = await updateUserPhone({
      mobileNo: phone,
      countryCode: country,
    });

    if (updated) {
      await revalidateTags("profile");
      toastSuccess("User phone number updated");
    } else {
      toastError("Failed to update phone number");
    }

    handleClosePhone();
    setCountry("");
    setPhone("");
  };

  return (
    <div>
      {!!profile?.phoneNo ? (
        <p>{profile?.phoneNo}</p>
      ) : (
        <div>
          <LineBreak />
          {enterPhone ? (
            <div className="link_edit_save_wrapper">
              {/* <input
                className="social_link_edit_input"
                placeholder="Enter Email"
                name="email"
                value={phone}
                onChange={handleChange}
              /> */}
              <PhoneInput
                country={(
                  localStorage.getItem("countryCode") || ""
                ).toLowerCase()} // Set the default country
                value={phone}
                onChange={handleChange}
                inputStyle={{
                  width: "100%",
                  outline: "none",
                  fontFamily: "IBM Plex Sans Condensed",
                  fontStyle: "normal",
                  fontSize: "14px",
                }}
              />
              <div className="sle_confirm_btns">
                <div onClick={handleSavePhone} className="pointer">
                  <Image src={GreenTickSVG} alt="svg" />
                </div>
                <div onClick={handleClosePhone} className="pointer">
                  <Image src={RedCrossSVG} alt="svg" />
                </div>
              </div>
            </div>
          ) : (
            <>
              <LineBreak />
              <div onClick={handleAddPhone} className="contact_empty_add">
                <Image src={AddContactSVG} alt="svg" />

                <p>Add Phone</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePhone;
