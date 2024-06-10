import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { VideoListItem } from "api/models/Videos/videoList";
import MenuItem from "@mui/material/MenuItem";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import { updateVideoStatus } from "api/routes/Videos/videos";
import revalidateTags from "utils/revalidate";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #f0f0f0",
  borderRadius: 3,
  padding: 2,
  boxShadow: 24,
};

const ITEM_HEIGHT = 48;

interface Props {
  currentVideo: VideoListItem;
  channelUuid: string;
  hiveDetails: HiveDetails;
  handleUpdate: any;
  activeTab: number;
}

const VideoKebab = ({
  currentVideo,
  channelUuid,
  hiveDetails,
  handleUpdate,
  activeTab,
}: Props) => {
  const options = [
    "Edit",
    activeTab === 1 || activeTab === 2 || activeTab === 3
      ? "Approve"
      : "Pending",
    activeTab === 2 ? "Reject" : "Archive",
    "Share",
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { toastError, toastInfo, toastSuccess } = useTriggerAlert();

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (!!text) {
          toastInfo("Copied link to clipboard");
        } else {
          toastInfo(
            "This video isnt available at the moment, please try another one"
          );
        }
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
      });
  };

  const handleClose = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    //   e.currentTarget.innerText === "Edit" && handleEditOpen();

    if (e.currentTarget.innerText === "Approve") {
      const approved = await updateVideoStatus({
        videoId: currentVideo.videoUuid,
        channelUUID: channelUuid!,
        status: "Ready",
        approvalNotes: "Approval of video",
        communityId: hiveDetails?.communityId || 0,
      });
      if (approved) {
        await handleUpdate();
        toastSuccess("Approved video");
      } else {
        toastError("Failed to approve video");
      }
    } else if (e.currentTarget.innerText === "Archive") {
      const archived = await updateVideoStatus({
        videoId: currentVideo.videoUuid,
        channelUUID: channelUuid!,
        status: "ARCHIVED",
        approvalNotes: "Archive video",
        communityId: hiveDetails?.communityId || 0,
      });
      if (archived) {
        await handleUpdate();
        toastSuccess("Archved video");
      } else {
        toastError("Failed to archive video");
      }
    } else if (e.currentTarget.innerText === "Pending") {
      const pending = await updateVideoStatus({
        videoId: currentVideo.videoUuid,
        channelUUID: channelUuid!,
        status: "PENDING",
        approvalNotes: "move video to pending",
        communityId: hiveDetails?.communityId || 0,
      });
      if (pending) {
        await handleUpdate();
        toastSuccess("Moved video to pending");
      } else {
        toastError("Failed to move video to pending");
      }
    } else if (e.currentTarget.innerText === "Reject") {
      const rejected = await updateVideoStatus({
        videoId: currentVideo.videoUuid,
        channelUUID: channelUuid!,
        status: "Rejected",
        approvalNotes: "Rejection of video",
        communityId: hiveDetails?.communityId || 0,
      });

      if (rejected) {
        await handleUpdate();
        toastSuccess("Rejected video");
      } else {
        toastError("Failed to reject video");
      }
    } else if (!!e.currentTarget && e.currentTarget.innerText === "Share")
      handleCopy(`${document.location.href}/videos/${currentVideo.videoUuid}`);
    // if (e.currentTarget.innerText === "Edit") {
    //   navigate(`videos/${currentVideo.videoUuid}/edit`);
    // }
    //   e.currentTarget.innerText === "Delete" && handleReasonsOpen();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon htmlColor="#ffffff" />
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
            maxHeight: ITEM_HEIGHT * 3,
            width: "12ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={(e) => handleClose(e)}>
            <p className="text-sm">{option}</p>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default VideoKebab;
