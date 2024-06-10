import LineBreak from "components/LineBreak/LineBreak";
import React, { ChangeEvent, useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { CountryData } from "react-phone-input-2";

interface Props {
  handleChange: any;
  idx: number;
}

const AttendeePhone = ({ handleChange, idx }: Props) => {
  const [enterPhone, setEnterPhone] = useState(false);

  const handleAddPhone = () => {
    setEnterPhone(true);
  };

  const handleClosePhone = () => {
    setEnterPhone(false);
  };

  const [phone, setPhone] = useState("");

  const [country, setCountry] = useState("");

  const handlePhoneChange = (value: string, country: CountryData) => {
    handleChange(idx, "phone", `+${value}`);
    setPhone(value);
    setCountry(country.countryCode?.toUpperCase() || "");
  };

  const handleSavePhone = () => {
    handleClosePhone();
    setCountry("");
    setPhone("");
  };

  return (
    <div>
      <div>
        <LineBreak />
        <div className="link_edit_save_wrapper">
          <PhoneInput
            country={(
              localStorage.getItem("countryCode") || "ae"
            ).toLowerCase()} // Set the default country
            value={phone}
            onChange={handlePhoneChange}
            inputStyle={{
              width: "100%",
              outline: "none",
              fontFamily: "IBM Plex Sans Condensed",
              fontStyle: "normal",
              fontSize: "14px",
            }}
            dropdownStyle={{
              width: "200px",
              maxHeight: "200px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendeePhone;
