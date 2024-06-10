import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import { AttendeeFormDetails } from "api/models/Hive/events";
import LineBreak from "components/LineBreak/LineBreak";
import CloseBlackSmSVG from "assets/svg/close_black.svg";
import PlusSignSVG from "assets/svg/plus_sign.svg";
import Image from "next/image";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  attendeeFormDetails: AttendeeFormDetails[];
  setAttendeeFormDetails: Dispatch<SetStateAction<AttendeeFormDetails[]>>;
}

const AttendeeForm = ({
  attendeeFormDetails,
  setAttendeeFormDetails,
}: Props) => {
  const { toastInfo } = useTriggerAlert();

  const addQuestion = () => {
    setAttendeeFormDetails((prevDetails) => [
      ...prevDetails,
      {
        fieldName: "",
        isMandatory: false,
        type: "text",
        options: [],
      },
    ]);
  };

  const handleChange = (
    idx: number,
    field: keyof AttendeeFormDetails,
    value: any
  ) => {
    const updatedDetails = [...attendeeFormDetails];
    updatedDetails[idx] = {
      ...updatedDetails[idx],
      [field]: value,
      options: value === "radio" ? [""] : updatedDetails[idx].options,
    };
    setAttendeeFormDetails(updatedDetails);
  };

  const handleDelete = (idx: number) => {
    const updatedDetails = [...attendeeFormDetails];
    updatedDetails.splice(idx, 1);
    setAttendeeFormDetails(updatedDetails);
  };

  const handleOptionsChange = (e: string, idx: number, optionIdx: number) => {
    const updatedDetails = [...attendeeFormDetails];
    updatedDetails[idx].options[optionIdx] = e;
    setAttendeeFormDetails(updatedDetails);
  };

  const handleAddOption = (idx: number) => {
    const updatedDetails = [...attendeeFormDetails];

    if (updatedDetails[idx].options.includes("Other")) {
      // If "Other" is present in the options array
      const otherIndex = updatedDetails[idx].options.indexOf("Other");
      updatedDetails[idx].options.splice(otherIndex, 0, ""); // Add an empty string before "Other"
    } else {
      // If "Other" is not present, add an empty string at the second last position
      const lastIndex = updatedDetails[idx].options.length - 1;
      updatedDetails[idx].options.push("");
    }

    setAttendeeFormDetails(updatedDetails);
  };

  const handleAddOther = (idx: number) => {
    // Ensure that idx is within the valid range
    if (idx >= 0 && idx < attendeeFormDetails.length) {
      // Create a deep copy of the attendeeFormDetails array
      const updatedDetails = [...attendeeFormDetails];

      if (!updatedDetails[idx].options.includes("Other")) {
        // Create a new object for the specific attendeeFormDetails item at id
        const updatedItem = {
          ...updatedDetails[idx],
          options: [...updatedDetails[idx].options, "Other"], // Add 'Other' string
        };

        // Update the updatedDetails array with the new object at idx
        updatedDetails[idx] = updatedItem;
      } else {
        toastInfo("Other Option is aldready present");
      }

      // Update the state with the updated array
      setAttendeeFormDetails(updatedDetails);
    }
  };

  const handleRemoveOption = (idx: number, optionIdx: number) => {
    // Ensure that idx is within the valid range
    if (idx >= 0 && idx < attendeeFormDetails.length) {
      const updatedDetails = [...attendeeFormDetails];
      const options = updatedDetails[idx].options;

      // Check if there are more than one options to prevent removing the last one
      if (options.length > 1 && optionIdx >= 0 && optionIdx < options.length) {
        const updatedOptions = [...options];
        updatedOptions.splice(optionIdx, 1);

        // Create a new object for the specific attendeeFormDetails item at idx
        const updatedItem = {
          ...updatedDetails[idx],
          options: updatedOptions,
        };

        // Update the updatedDetails array with the new object at idx
        updatedDetails[idx] = updatedItem;

        // Update the state with the updated array
        setAttendeeFormDetails(updatedDetails);
      } else {
        toastInfo("Minimum 1 option is required");
      }
    }
  };

  return (
    <div className="attendee_form_container">
      <h3 className="font-bold">Attendee Information for Event Registration</h3>
      <p>Create a custom form for event registration (optional)</p>
      <LineBreak />
      {!!attendeeFormDetails &&
        attendeeFormDetails.length > 0 &&
        attendeeFormDetails.map((data, idx) => {
          return (
            <div key={idx} className="attendee_detail_content_wrapper">
              <div
                onClick={() => handleDelete(idx)}
                className="attendee_question_delete_svg pointer"
              >
                <Image alt="svg" src={CloseBlackSmSVG} />
              </div>
              <>
                <TextField
                  className=""
                  id="standard-basic"
                  label="Question"
                  variant="standard"
                  value={data.fieldName}
                  onChange={(e) =>
                    handleChange(idx, "fieldName", e.target.value)
                  }
                />
                <FormControl variant="standard">
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={(e) => handleChange(idx, "type", e.target.value)}
                    label="Type"
                    value={attendeeFormDetails[idx].type}
                    variant="standard"
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="phone">Phone Number</MenuItem>
                    <MenuItem value="radio">Radio Button</MenuItem>
                    <MenuItem value="dropdown">Drop Down</MenuItem>
                    <MenuItem value="longDescription">
                      Long Description
                    </MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                  </Select>
                </FormControl>
                {(attendeeFormDetails[idx].type === "radio" ||
                  attendeeFormDetails[idx].type === "dropdown") && (
                  <div>
                    <h3>Options</h3>
                    {attendeeFormDetails[idx].options.map((data, optionIdx) => {
                      return (
                        <div
                          key={optionIdx}
                          className="flex items-center justify-between my-2"
                        >
                          <TextField
                            fullWidth
                            className=""
                            id="standard-basic"
                            label="Option Name"
                            variant="standard"
                            value={data}
                            onChange={(e) =>
                              handleOptionsChange(
                                e.target.value,
                                idx,
                                optionIdx
                              )
                            }
                          />
                          <div
                            onClick={() => handleRemoveOption(idx, optionIdx)}
                            className="pointer"
                          >
                            <Image alt="svg" src={CloseBlackSmSVG} />
                          </div>
                        </div>
                      );
                    })}
                    <div className="">
                      <p
                        onClick={() => handleAddOption(idx)}
                        className="my-2 text-sm pointer link"
                      >
                        Add Option
                      </p>
                      <p
                        onClick={() => handleAddOther(idx)}
                        className="my-2 text-sm pointer link"
                      >
                        Add Other
                      </p>
                    </div>
                  </div>
                )}
              </>
              <FormControlLabel
                className="flex-end"
                control={
                  <Switch
                    size="small"
                    checked={data.isMandatory}
                    onChange={(e) =>
                      handleChange(idx, "isMandatory", e.target.checked)
                    }
                  />
                }
                label={<p className="text-sm">Required</p>}
              />
            </div>
          );
        })}
      <div className="add_event_question">
        <Tooltip title="Add Question" placement="top">
          <p onClick={addQuestion}>
            <Image alt="svg" src={PlusSignSVG} />
          </p>
        </Tooltip>
      </div>
    </div>
  );
};

export default AttendeeForm;
