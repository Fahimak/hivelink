import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useDownloadFile } from "hooks/useDownloadFile";

import AttachmentIcon from "components/common/svg/AttachmentIcon";
import Text from "components/common/Text";
import IconButton from "components/common/IconButton";

import { isImage, parseUrlToFileName } from "utils";

import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  attachmentUrl: string;
  thumbnailUrl?: string;
}

const Attachment: React.FC<Props> = ({ attachmentUrl, thumbnailUrl }) => {
  const { ext, fileName } = parseUrlToFileName(attachmentUrl);
  const [handleClickDownloadFile, progress, isLoading, cancelDownload] =
    useDownloadFile(attachmentUrl, fileName);

  const _isImage = isImage(ext);

  const image = (
    <div className="attachment_image" onClick={handleClickDownloadFile}>
      <LazyLoadImage
        src={attachmentUrl}
        placeholderSrc={thumbnailUrl}
        //className="attachment_image_iname"
        alt="attachment foto"
        //loading="lazy"
        effect="blur"
      />
    </div>
  );

  return _isImage ? (
    image
  ) : (
    <div className="attachment_message" onClick={handleClickDownloadFile}>
      <div className="attachment_message_content_block">
        <div className="attachment_icon_container">
          {isLoading ? (
            <span className="progress_container">
              <CircularProgress
                className="progress_indicator"
                variant="determinate"
                value={progress}
              />
              <Text className="progress_text">{`${progress}%`}</Text>
            </span>
          ) : (
            <AttachmentIcon />
          )}
        </div>
        <Text className="attachment_file_name">{fileName}</Text>
      </div>
      {isLoading && (
        <IconButton className="cancel_download_button" onClick={cancelDownload}>
          <CloseRoundedIcon fontSize="inherit" />
        </IconButton>
      )}
    </div>
  );
};

export default Attachment;
