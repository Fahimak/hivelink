import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import TrashIcon from "components/common/svg/TrashIcon";
import Text from "components/common/Text";
import { Dialog } from "@mui/material";
import LineBreak from "components/LineBreak/LineBreak";

interface LoginConfirmationProps {
  title: string;
  isOpen: boolean;
  close: () => void;
}

const MemberLoginConfirm: React.FC<LoginConfirmationProps> = ({
  title,
  isOpen,
  close,
}) => {
  return (
    <Dialog
      onClose={close}
      open={isOpen}
      className="ak_confirmation_modal_container"
    >
      {/* <IconButton className="confirmation_popup_close" onClick={onReject}> */}
      <CloseRoundedIcon
        className="confirmation_popup_close pointer"
        onClick={close}
        fontSize="medium"
      />
      {/* </IconButton> */}
      <div className="ak_confirmation_modal_wrapper">
        <h3 className="font-bold text-xl">Success!</h3>
        <LineBreak />
        <Text fontWeight="w400" className="modal_description">
          {title === "sponsor"
            ? "We are thrilled to have you on board as a sponsor. Our team will be in contact with you soon to provide further details and discuss how we can best collaborate"
            : title === "pitch"
            ? "Congratulations on the successful registration of your startup! As part of the next steps, we kindly request you to upload your pitch video."
            : "Thank you for choosing to join us, We're pleased to confirm your successful registration."}
        </Text>
        <LineBreak />
        <div className="flex items-center justify-center w_full gap_5 btnSpacing">
          <div className="primaryBtn half_width" onClick={close}>
            Ok
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default MemberLoginConfirm;
