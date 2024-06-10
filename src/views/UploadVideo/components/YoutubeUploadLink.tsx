import { TextField } from "@mui/material";
import LineBreak from "components/LineBreak";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  url: string;
  setYoutubeUrl: Dispatch<SetStateAction<string>>;
}

const YoutubeUploadLink = ({ url, setYoutubeUrl }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value);
  };

  return (
    <div className="yt-link_upload_desc">
      <h2 className="font-bold text-2xl">Youtube Video Integration</h2>
      <LineBreak />
      <p>
        Welcome to your new hub for sharing and viewing YouTube videos! To get
        started, simply type in your YouTube video link here. By doing so, you
        will be able to view and manage your favorite YouTube videos right from
        our app. This effortless process makes it easy for you to organize,
        access, and share your content. So why wait? Upload your YouTube video
        link now and dive into a streamlined video viewing experience!
      </p>
      <LineBreak />
      <div className="youtube_upload_link_conatiner">
        <TextField
          className="yt_text_length"
          id="standard-basic"
          label="Youtube Link"
          variant="outlined"
          name="youtubeUrl"
          onChange={handleChange}
          value={url}
        />
      </div>
    </div>
  );
};

export default YoutubeUploadLink;
