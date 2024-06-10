import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import ConfirmationModal from "components/ConfirmationModal";
import { EventUserItem, EventsItem } from "api/models/Hive/events";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { markAttended } from "api/routes/Events/events";

const ITEM_HEIGHT = 48;

interface Props {
  user: EventUserItem;
  event: EventsItem;
  hiveDetails: HiveDetails;
  apiCall: any;
}

export default function EventPeopleKebab({
  user,
  event,
  hiveDetails,
  apiCall,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const hiveUuid = hiveDetails.communityUuid;

  const handleSuperAdmin = () => {
    !!event &&
      markAttended({
        organizationUuid: hiveUuid,
        profileId: user.profileId,
        eventUuid: event?.eventUuid || "",
      });
    apiCall();
    handleConfirmClose();
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmClose = () => {
    handleClose();
    setIsOpen(false);
  };

  const handleConfirmOpen = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "17ch",
          },
        }}
      >
        <MenuItem onClick={handleConfirmOpen}>
          <p className="text-sm">Mark Attended</p>
        </MenuItem>

        {isOpen && (
          <ConfirmationModal
            isOpen={isOpen}
            onReject={handleConfirmClose}
            onConfirm={handleSuperAdmin}
            headline="Mark as Attended"
            description={`Are you sure you want mark ${user.userName} as attended`}
            confirmMessage="Yes"
            rejectMessage="No"
          />
        )}
      </Menu>
    </div>
  );
}
