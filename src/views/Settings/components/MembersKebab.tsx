import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import ConfirmationModal from "components/ConfirmationModal";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { addSuperAdmin, removeHiveMember } from "api/routes/Hive/hive";
import revalidateTags from "utils/revalidate";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import { org_uuid } from "constants/constants";
import { removeChannelMember } from "api/routes/Channels/channels";

const ITEM_HEIGHT = 48;

interface Props {
  userId: number;
  channelId?: number;
  hiveMember?: boolean;
  isSuper?: boolean;
  userName?: string;
  hiveDetails: HiveDetails;
  refreshData: any;
}

export default function MembersKebab({
  userId,
  channelId,
  hiveMember,
  isSuper,
  userName,
  hiveDetails,
  refreshData,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { toastError, toastSuccess } = useTriggerAlert();

  const handleRemove = async () => {
    if (channelId) {
      const removed = await removeChannelMember({
        userId: userId,
        channelId: channelId,
      });

      if (removed) {
        toastSuccess("Removed user");
        revalidateTags("member");
        refreshData();
      } else {
        toastError("Failed to Remove user");
      }
    } else {
      const removed = await removeHiveMember({
        userId: userId,
        hiveId: hiveDetails?.communityId || 1,
      });

      if (removed) {
        toastSuccess("Removed user");
        revalidateTags("member");
        refreshData();
      } else {
        toastError("Failed to Remove user");
      }
    }
    handleRemoveConfirmClose();
  };

  const hiveUuid = org_uuid;

  const handleSuperAdmin = async () => {
    const added = await addSuperAdmin({
      organizationUuid: hiveUuid,
      userId: userId,
    });

    if (added) {
      toastSuccess("Added super admin");
      revalidateTags("members");
      refreshData();
    } else {
      toastError("Failed to add super admin");
    }

    handleConfirmClose();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);

  const handleConfirmClose = () => {
    handleClose();
    setIsOpen(false);
  };

  const handleConfirmOpen = () => {
    setIsOpen(true);
  };

  const handleRemoveConfirmClose = () => {
    handleClose();
    setIsRemoveOpen(false);
  };

  const handleRemoveConfirmOpen = () => {
    setIsRemoveOpen(true);
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
        <MenuItem onClick={handleRemoveConfirmOpen}>
          <p className="text-sm">Remove</p>
        </MenuItem>
        {hiveMember && !isSuper && (
          <MenuItem onClick={handleConfirmOpen}>
            <p className="text-sm">Make Superadmin</p>
          </MenuItem>
        )}

        {isOpen && (
          <ConfirmationModal
            isOpen={isOpen}
            onReject={handleConfirmClose}
            onConfirm={handleSuperAdmin}
            headline="Super admin access"
            description={`Are you sure you want to give Super Admin access to ${userName}?`}
            confirmMessage="Yes"
            rejectMessage="No"
          />
        )}

        {isRemoveOpen && (
          <ConfirmationModal
            isOpen={isRemoveOpen}
            onReject={handleRemoveConfirmClose}
            onConfirm={handleRemove}
            headline="Remove user from hive"
            description={`Are you sure you want to remove ${userName} from your hive?`}
            confirmMessage="Yes"
            rejectMessage="No"
          />
        )}
      </Menu>
    </div>
  );
}
