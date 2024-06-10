/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, memo } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import PlayerProgress from "components/common/PlayerProgress";
import PlayerCount from "components/common/PlayerCount";
import IconButton from "components/common/IconButton";
import TrashIcon from "components/common/svg/TrashIcon";
import SendMessage from "components/common/svg/SendMessage";
import RecordPause from "components/common/svg/RecordPause";
import Microphone from "components/common/svg/Microphone";
import RecordIcon from "components/common/svg/RecordIcon";
import PlayCircle from "components/common/svg/PlayCircle";
import PauseCircle from "components/common/svg/PauseCircle";
import { useRecorderOwn, MAX_SECOND } from "hooks/useRecorderOwn";
import { useAudio } from "hooks/useAudio";

interface Props {
  cancelRecord: () => void;
  sendVoice: (file: File) => void;
}

function makeProgressValue(maxValue: number, value: number): number {
  if (maxValue) {
    return Math.floor((100 / maxValue) * value);
  }
  return 0;
}

const RecordControls: React.FC<Props> = ({ cancelRecord, sendVoice }) => {
  const {
    isRecording,
    recordedUrl,
    pauseRecording,
    resumeRecording,
    recordedFile,
    stopRecordering,
    secondsRecorded,
    isIniting,
  } = useRecorderOwn();

  const { pause, play, audioState, duration, progressPercent, progress, stop } =
    useAudio(recordedUrl);

  const playRecordedVoice = async () => {
    play();
  };

  const pauseRecordedVoice = () => {
    pause();
  };

  const handleClickTrash = () => {
    stopRecordering();
    cancelRecord();
  };

  const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    audioState === "play" ? pauseRecordedVoice() : playRecordedVoice();
  };

  const handleClickSend = () => {
    if (recordedFile) {
      sendVoice(recordedFile);
      cancelRecord();
    }
  };

  useEffect(() => {
    if (isRecording && (audioState === "play" || audioState === "pause")) {
      stop();
    }
  }, [isRecording, audioState]);

  const linearProgressValue = isRecording
    ? makeProgressValue(MAX_SECOND, secondsRecorded)
    : progressPercent;

  return (
    <div className="record_control_container">
      <div className="record_control_wrap">
        <div className="record_control_top_section">
          <IconButton
            className="play_button"
            onClick={handleToggleClick}
            disabled={isRecording}
          >
            {isRecording ? (
              <RecordIcon />
            ) : audioState === "play" ? (
              <PauseCircle />
            ) : (
              <PlayCircle />
            )}
          </IconButton>
          <PlayerProgress
            value={linearProgressValue}
            isTransition={isRecording || audioState === "play"}
          />
          <PlayerCount
            className="record_count"
            value={
              isRecording
                ? MAX_SECOND - secondsRecorded
                : (duration ? duration : secondsRecorded) - progress
            }
          />
        </div>
        <div className="record_control_bottom_section">
          <IconButton
            className="record_control_button"
            onClick={handleClickTrash}
          >
            <TrashIcon />
          </IconButton>
          <IconButton
            className="record_control_button"
            onClick={isRecording ? pauseRecording : resumeRecording}
            disabled={isIniting}
          >
            {isIniting && (
              <CircularProgress
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            )}
            {!isIniting && (isRecording ? <RecordPause /> : <Microphone />)}
          </IconButton>
          <IconButton
            className="record_control_button"
            onClick={handleClickSend}
            disabled={!recordedFile || isRecording}
          >
            <SendMessage />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default memo(RecordControls);
