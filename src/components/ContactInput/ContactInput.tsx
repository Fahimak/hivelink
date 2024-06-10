import { Tab, Tabs } from "@mui/material";
import CSVImport from "components/CSVImport/CSVImport";
import TokenInput from "react-customize-token-input";
import { ReactMultiEmail } from "react-multi-email";
import "./token-input.scss";
import { CSVLink } from "react-csv";
import CSVDownloadSVG from "assets/svg/csv_download.svg";
import { useState } from "react";
import Image from "next/image";

interface Props {
  selectedTab: number;
  phoneNos: string[];
  setPhoneNos: any;
  emails: string[];
  setEmails: any;
  handleChange: any;
  tabs: string[];
}

const csvEmailData = [
  ["firstname", "lastname", "email"],
  ["John", "Doe", "john@doe.com"],
  ["Jane", "Doe", "janedoe@smthing.co"],
  ["veehive", "", "contact@veehive.ai"],
];
const csvPhoneData = [
  ["firstname", "lastname", "mobileNo", "userName", "userOrigin"],
  ["John", "Doe", "+971501234567", "itsjohn", "ACME Corp."],
  ["Jane", "Doe", "+918451942268", "itsjane", "ACME Dev."],
  ["Veehive", "", "+971558843692", "letsveehive", "Veehive FZ LLC."],
];

const ContactInput = ({
  selectedTab,
  phoneNos,
  setPhoneNos,
  emails,
  setEmails,
  handleChange,
  tabs,
}: Props) => {
  const handleGetTokenDisplayLabel = (tokenValue: any, tokenMeta: any) => {
    // Could return any react node
    return <div className="rounded-full">{`${tokenValue}`}</div>;
  };

  const [csvErrorMessage, setCSVErrorMessage] = useState("");
  const [csvSuccessMessage, setCSVSuccessMessage] = useState("");

  const [importCount, setImportCount] = useState(0);

  const handleTokenValueValidate = (e: string) => {
    const number = /^-?\d+$/;
    if (e.startsWith("+")) {
      if (number.test(e.slice(1))) {
        if (e.length > 9 && e.length < 15) {
          return null;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="channel tabs"
        className="tabs-wrapper"
      >
        {tabs.map((tab, idx) => {
          return (
            <Tab
              style={{
                width: "50%",
                height: "20px",
                fontFamily: "IBM Plex Sans Condensed",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "140%",
                textAlign: "center",
                letterSpacing: "0.02em",
                color: "#1C1B1F",
              }}
              key={idx}
              label={tab}
            />
          );
        })}
      </Tabs>
      <div className="csv_import_container_wrapper">
        <CSVImport
          emails={emails}
          setPhoneNos={setPhoneNos}
          selectedTab={selectedTab}
          phoneNos={phoneNos}
          setCSVErrorMessage={setCSVErrorMessage}
          setCSVSuccessMessage={setCSVSuccessMessage}
          setImportCount={setImportCount}
          setEmails={setEmails}
        />

        <CSVLink
          filename={selectedTab === 1 ? "phone_format" : "email_format"}
          data={selectedTab === 1 ? csvPhoneData : csvEmailData}
        >
          <Image src={CSVDownloadSVG} alt="svg" />
        </CSVLink>
      </div>
      <span className="error_message">{csvErrorMessage}</span>
      <span className="success_message">{csvSuccessMessage}</span>
      {selectedTab === 1 ? (
        <div className="react_multi_email_container">
          <TokenInput
            separators={[",", " "]}
            tokenValues={phoneNos}
            onTokenValuesChange={setPhoneNos}
            className=""
            onTokenValueValidate={handleTokenValueValidate}
            onGetTokenDisplayLabel={handleGetTokenDisplayLabel}
            placeholder="ex: +91234567891"
          />
        </div>
      ) : (
        <div className="react_multi_email_container">
          <ReactMultiEmail
            placeholder="ex: john@example.com; jane@example.com;"
            className="text-sm"
            emails={emails}
            onChange={setEmails}
            getLabel={(
              email: string,
              index: number,
              removeEmail: (index: number) => void
            ) => {
              return (
                <div
                  // data-tag
                  key={index}
                  className="multi_email_tag"
                >
                  <p>{email}</p>
                  <span
                    data-tag-handle
                    onClick={() => {
                      removeEmail(index);
                    }}
                    className="cursor-pointer"
                  >
                    ×
                  </span>
                </div>
              );
            }}
          />
        </div>
      )}
    </>
  );
};

export default ContactInput;
