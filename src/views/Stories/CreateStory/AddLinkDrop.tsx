import { Box, Divider, Menu, MenuItem, Tooltip } from "@mui/material";
import { SegmentItem } from "api/models/Story/story";
import { editSegmentApi } from "api/routes/Stories/stories";
import AddLinkSVG from "assets/svg/copy_link.svg";
import GreenTickSVG from "assets/svg/greenTick.svg";
import { org_uuid } from "constants/constants";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  storyUuid: string;
  storyIdx: number;
  storySegments: SegmentItem[];
  title: string;
  description: string;
  actionLink: string;
  setActionLink: Dispatch<SetStateAction<string>>;
  getStorySegments: any;
}

const AddLinkDrop = ({
  storyUuid,
  storyIdx,
  storySegments,
  title,
  description,
  actionLink,
  setActionLink,
  getStorySegments,
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const hiveUuid = org_uuid;

  const handleSave = async () => {
    await editSegmentApi({
      description: description,
      isActive: false,
      storyUrl: storySegments[storyIdx].storyUrl || "",
      storyUuid: storyUuid,
      title: title,
      isImage: storySegments[storyIdx].type === "image",
      isVideo: storySegments[storyIdx].type === "video",
      colorCode: storySegments[storyIdx].colorCode || "",
      communityUuid: hiveUuid,
      contentType: "",
      isMediaChanged: false,
      storyId: storySegments[storyIdx].id,
      thumbnail: "",
      actionLink: actionLink,
      order: storySegments[storyIdx].segmentOrder,
    });

    getStorySegments();

    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActionLink(e.target.value);
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <div onClick={handleClick}>
          <Image src={AddLinkSVG} alt="add_link" width={20} />
        </div>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 4,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="story_link_wrapper">
          <input
            value={actionLink}
            onChange={handleChange}
            className="story_link_item"
            placeholder="Enter link here"
          />
          <div onClick={handleSave} className="pointer">
            <Image src={GreenTickSVG} alt="tick_svg" />
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default AddLinkDrop;
