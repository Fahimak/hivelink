import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Dialog } from "@mui/material";
import LineBreak from "components/LineBreak/LineBreak";

interface ConfirmatioModalProps {
  onReject: () => void;
  onConfirm: any;
  headline: string;
  description: string;
  rejectMessage: string;
  confirmMessage: string;
  isOpen: boolean;
  param?: any;
}

const ConfirmationModal: React.FC<ConfirmatioModalProps> = ({
  isOpen,
  onReject,
  onConfirm,
  headline,
  description,
  rejectMessage,
  confirmMessage,
  param,
}) => {
  return (
    <Dialog
      onClose={onReject}
      open={isOpen}
      className="ak_confirmation_modal_container"
    >
      {/* <IconButton className="confirmation_popup_close" onClick={onReject}> */}
      <CloseRoundedIcon
        className="confirmation_popup_close pointer"
        onClick={onReject}
        fontSize="medium"
      />
      {/* </IconButton> */}
      <div className="ak_confirmation_modal_wrapper">
        <h3 className="text-xl font-bold">{headline}</h3>
        <LineBreak />
        <p className="modal_description">{description}</p>
        <LineBreak />
        <div className="flex items-center w_full gap_5 btnSpacing">
          <div className="primaryBtn half_width" onClick={onReject}>
            {rejectMessage}
          </div>
          <div
            className="secondaryBtn half_width"
            onClick={() => {
              param ? onConfirm(param) : onConfirm();
            }}
          >
            {confirmMessage}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmationModal;
