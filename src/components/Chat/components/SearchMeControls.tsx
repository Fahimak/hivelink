import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import IconButton from "components/common/IconButton";
import Text from "components/common/Text";
import { useSearchMentionMessageContext } from "../context";

interface Props {
  next?: any;
  back?: any;
  foundIds: number;
}

const SearchMeControls: React.FC<Props> = ({ foundIds }) => {
  const { closeSearchControls } = useSearchMentionMessageContext();

  const handleCloseClick = () => {
    if (typeof closeSearchControls === "function") {
      closeSearchControls();
    }
  };

  return (
    <div className="search_me_controls_wrap">
      <div className="search_me_container">
        <div className="navigation_controls_section">
          <IconButton className="navigation_button" disabled={!foundIds}>
            <KeyboardArrowUpRoundedIcon fontSize="inherit" />
          </IconButton>
          <IconButton className="navigation_button" disabled={!foundIds}>
            <KeyboardArrowDownRoundedIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div className="matches_content_section">
          <Text className="matches_content">
            {foundIds ? `${foundIds} matches` : "No messages found"}
          </Text>
        </div>
        <div className="close_button_section">
          <IconButton className="close_button" onClick={handleCloseClick}>
            <CloseRoundedIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default SearchMeControls;
