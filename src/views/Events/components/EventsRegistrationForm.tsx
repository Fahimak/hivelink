import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { AttendeeFormDetailsReq, EventsModel } from "api/models/Hive/events";
import React, { Dispatch, SetStateAction, useState } from "react";
import AttendeePhone from "./AttendeePhone";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import LineBreak from "components/LineBreak";

interface Props {
  attendeeFormDetails: AttendeeFormDetailsReq[];
  setAttendeeFormDetails: Dispatch<SetStateAction<AttendeeFormDetailsReq[]>>;
  handleFinalFormSubmit: any;
  eventResp: EventsModel;
}

const EventRegistrationForm = ({
  attendeeFormDetails,
  setAttendeeFormDetails,
  handleFinalFormSubmit,
  eventResp,
}: Props) => {
  const handleChange = (idx: number, field: string, value: string) => {
    const updatedDetails = [...attendeeFormDetails];
    updatedDetails[idx] = {
      ...updatedDetails[idx],
      fieldValue: value,
    };
    setAttendeeFormDetails(updatedDetails);
  };

  const form = eventResp?.formDetails;

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = () => {
    const newErrors: string[] = [];
    form &&
      form.forEach((data, idx) => {
        if (data.type === "radio" || data.type === "dropdown") {
          if (
            attendeeFormDetails[idx].options.length === 1 &&
            attendeeFormDetails[idx].options[0] === "Other" &&
            data.isMandatory &&
            !attendeeFormDetails[idx].fieldValue
          ) {
            newErrors.push(`${data.fieldName} is required`);
          }
        } else {
          if (data.isMandatory && !attendeeFormDetails[idx].fieldValue) {
            newErrors.push(`${data.fieldName} is required`);
          }
        }
      });
    setErrors(newErrors);

    if (newErrors.length === 0) {
      // Proceed with registration logic
      //   dispatch(setEventFormDetails(attendeeFormDetails)); CHECK WHAT IS THIS USED FOR
      handleFinalFormSubmit();
    }
  };

  const handleOptionChange = (e: string, idx: number, optionIdx: number) => {
    const updatedDetails = [...attendeeFormDetails];
    updatedDetails[idx] = {
      ...updatedDetails[idx],
      options: [e],
    };
    setAttendeeFormDetails(updatedDetails);
  };

  return (
    <div className="attendee_form_container_popup">
      <h3>Please fill in your details for registration</h3>
      <FormControl fullWidth>
        {!!attendeeFormDetails &&
          attendeeFormDetails.length > 0 &&
          !!form &&
          form.length > 0 &&
          form.map((data, idx) => {
            return (
              <div
                key={data.fieldName}
                className="attendee_detail_form_content_wrapper"
              >
                {data.type === "radio" ? (
                  <FormControl fullWidth>
                    <FormLabel
                      required={data.isMandatory}
                      id="demo-radio-buttons-group-label"
                    >
                      {data.fieldName}
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      {form[idx].options.map((option, optionIdx) => {
                        return (
                          <FormControlLabel
                            key={option}
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(option, idx, optionIdx)
                            }
                            control={<Radio />}
                            label={option}
                          />
                        );
                      })}
                    </RadioGroup>
                    {!!attendeeFormDetails[idx].options &&
                      attendeeFormDetails[idx].options.length === 1 &&
                      attendeeFormDetails[idx].options[0] === "Other" && (
                        <TextField
                          fullWidth
                          id="standard-basic"
                          label="Please Specify"
                          required={data.isMandatory}
                          variant="standard"
                          name={data.fieldName}
                          value={attendeeFormDetails[idx].fieldValue}
                          onChange={(e) =>
                            handleChange(idx, e.target.name, e.target.value)
                          }
                        />
                      )}
                  </FormControl>
                ) : data.type === "phone" ? (
                  <div>
                    <p className="tags">
                      {data.fieldName}
                      {data.isMandatory && "*"}
                    </p>
                    <AttendeePhone handleChange={handleChange} idx={idx} />
                  </div>
                ) : data.type === "longDescription" ? (
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label={data.fieldName}
                    required={data.isMandatory}
                    name={data.fieldName}
                    value={attendeeFormDetails[idx].fieldValue}
                    multiline={true}
                    minRows={4}
                    onChange={(e) =>
                      handleChange(idx, e.target.name, e.target.value)
                    }
                  />
                ) : data.type === "dropdown" ? (
                  <FormControl fullWidth>
                    <FormLabel
                      required={data.isMandatory}
                      id="demo-radio-buttons-group-label"
                    >
                      {data.fieldName}
                    </FormLabel>
                    <Select
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      variant="standard"
                      label={data.fieldName}
                    >
                      {form[idx].options.map((option, optionIdx) => {
                        return (
                          <MenuItem
                            onClick={(e) =>
                              handleOptionChange(option, idx, optionIdx)
                            }
                            key={option}
                            value={option}
                          >
                            {option}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {!!attendeeFormDetails[idx].options &&
                      attendeeFormDetails[idx].options.length === 1 &&
                      attendeeFormDetails[idx].options[0] === "Other" && (
                        <TextField
                          fullWidth
                          id="standard-basic"
                          label="Please Specify"
                          required={data.isMandatory}
                          variant="standard"
                          name={data.fieldName}
                          value={attendeeFormDetails[idx].fieldValue}
                          onChange={(e) =>
                            handleChange(idx, e.target.name, e.target.value)
                          }
                        />
                      )}
                  </FormControl>
                ) : data.type === "date" ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <p className="tags">
                      {data.fieldName}
                      {data.isMandatory && "*"}
                    </p>
                    <LineBreak />
                    <DatePicker
                      format="DD/MM/YYYY"
                      className=""
                      value={attendeeFormDetails[idx].fieldValue}
                      name={data.fieldName}
                      onChange={(value: any) => {
                        !!value &&
                          handleChange(idx, data.fieldName, value?.toDate());
                      }}
                    />
                  </LocalizationProvider>
                ) : (
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label={data.fieldName}
                    required={data.isMandatory}
                    variant="standard"
                    name={data.fieldName}
                    value={attendeeFormDetails[idx].fieldValue}
                    onChange={(e) =>
                      handleChange(idx, e.target.name, e.target.value)
                    }
                  />
                )}
                {errors.includes(`${data.fieldName} is required`) && (
                  <FormHelperText error>
                    {`*${data.fieldName} is required`}
                  </FormHelperText>
                )}
              </div>
            );
          })}
        <button onClick={handleSubmit} className="primaryBtn my-registerBtn">
          Register
        </button>
      </FormControl>
    </div>
  );
};

export default EventRegistrationForm;
