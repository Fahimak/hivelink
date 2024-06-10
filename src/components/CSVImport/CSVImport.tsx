import Papa from "papaparse";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CircularProgress } from "@mui/material";
import { useTriggerAlert } from "hooks/useTriggerAlert";

interface Props {
  selectedTab: number;
  emails: string[];
  setPhoneNos: Dispatch<SetStateAction<string[]>>;
  phoneNos: string[];
  setEmails?: Dispatch<SetStateAction<string[]>>;
  setCSVErrorMessage: Dispatch<SetStateAction<string>>;
  setCSVSuccessMessage: Dispatch<SetStateAction<string>>;
  setImportCount: Dispatch<SetStateAction<number>>;
}

const CSVImport = ({
  selectedTab,
  emails,
  phoneNos,
  setEmails,
  setPhoneNos,
  setCSVErrorMessage,
  setCSVSuccessMessage,
  setImportCount,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [count, setCount] = useState(0);

  const { toastInfo } = useTriggerAlert();

  const csvImportHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    if (
      event.target.files &&
      event.target.files[0] &&
      event.target.files![0].type === "text/csv"
    ) {
      setIsLoading(true);
      setCSVErrorMessage("");
      Papa.parse(event.target.files![0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results: any) {
          let data = results.data;
          // if (data.length < 101) {
          if (selectedTab === 0) {
            try {
              data.map((row: any, index: number) => {
                if (row.email) {
                  if (setEmails !== undefined) {
                    const tempEmails = [...emails];
                    tempEmails.push(row.email);
                    emails.push(row.email);
                    setEmails(tempEmails);
                  } else {
                    emails.push(row.email);
                  }
                  setCSVSuccessMessage(
                    `Added ${data.length} emails for Invitation, Please proceed or add more.`
                  );
                  setCSVErrorMessage("");
                  if (index < 1) {
                    setImportCount((prevState) => prevState + data.length);
                  }
                } else {
                  setCSVErrorMessage(
                    `Make sure your .csv file has an "email" column`
                  );
                  setCSVSuccessMessage("");
                }
              });
            } catch {
              setCSVErrorMessage(
                `Make sure your .csv file has an "email" column header under which all user email id's are given`
              );
              setCSVSuccessMessage("");
            }
          } else {
            try {
              data.map((row: any, index: number) => {
                if (row.mobileNo) {
                  const number = /^-?\d+$/;
                  if (row.mobileNo.startsWith("+")) {
                    if (number.test(row.mobileNo.slice(1))) {
                      if (row.mobileNo.length > 9 && row.mobileNo.length < 15) {
                        const tempPhoneNos = [...phoneNos];

                        tempPhoneNos.push(row.mobileNo);
                        phoneNos = [...tempPhoneNos];
                        setPhoneNos(tempPhoneNos);
                        setCount((prevState) => prevState + 1);

                        // dispatch(
                        //   updatePhoneUsers({
                        //     mobileNo: row.mobileNo,
                        //     userOrigin: row.userOrigin || "",
                        //     userName: row.userName || "",
                        //   })
                        // );

                        setCSVSuccessMessage(
                          `Added ${data.length} phone numbers for Invitation, Please proceed or add more.`
                        );
                        setCSVErrorMessage("");
                      } else {
                        toastInfo("Number length should be 10");
                      }
                    } else {
                      toastInfo("only numbers allowed");
                    }
                  } else {
                    toastInfo("Number should start with '+'");
                  }

                  if (index < 1) {
                    setImportCount((prevState) => prevState + data.length);
                  }
                } else {
                  setCSVErrorMessage(
                    `Make sure your .csv file has an "mobileNo" column`
                  );
                  setCSVSuccessMessage("");
                }
              });
            } catch {
              setCSVErrorMessage(
                `Make sure your .csv file has an "mobileNo" column header under which all user mobile numbers are given`
              );
              setCSVSuccessMessage("");
            }
          }
        },
        //   else {
        //     toastWarn(
        //       "Whoops, Thats a lot to take in, please upload max 100 rows at a time"
        //     );
        //   }
        // },
      });
    } else {
      setCSVSuccessMessage("");
      setCSVErrorMessage(`INVALID FILE TYPE! Please upload .csv File`);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col">
      {/* File Uploader */}
      <input
        id="fileElem"
        onChange={csvImportHandler}
        type="file"
        name="file"
        accept=".csv"
        className="invisible"
        // style={{ display: "block", margin: "10px auto" }}
      />
      <div className="import_csv_btn">
        {isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <label className="primaryBtn half_width" htmlFor="fileElem">
            Import .csv file
          </label>
        )}
      </div>
    </div>
  );
};

export default CSVImport;
