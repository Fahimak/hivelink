import React from "react";

import IconButton from "components/common/IconButton";
import PlayIcon from "components/common/svg/PlayCircle";
import PauseIcon from "components/common/svg/PauseCircle";
import PlayerProgress from "components/common/PlayerProgress";
import PlayerCount from "components/common/PlayerCount";
import { useAudio } from "hooks/useAudio";

interface Props {
  voiceUrl: string;
  isOwnerVoice: boolean;
}

const VoiceMessages: React.FC<Props> = ({ voiceUrl, isOwnerVoice }) => {
  const { play, pause, progress, progressPercent, audioState, duration } =
    useAudio(voiceUrl);

  const isPlay = audioState === "play";

  const handleClickControl = () => {
    isPlay ? pause() : play();
  };

  const classNameCount = isOwnerVoice ? "owner_count" : "";

  return (
    <span className="voice_message_container">
      <IconButton
        className="voice_message_control_button"
        onClick={handleClickControl}
      >
        {isPlay ? (
          <PauseIcon color={isOwnerVoice ? "#FFFFFF" : "#0A292E"} />
        ) : (
          <PlayIcon color={isOwnerVoice ? "#0E606D" : "#0A292E"} />
        )}
      </IconButton>
      <PlayerProgress value={progressPercent} isTransition={isPlay} />
      <PlayerCount
        value={duration - progress}
        className={`voice_message_count ${classNameCount}`}
        classNameText={"count_text"}
      />
    </span>
  );
};

export default VoiceMessages;
