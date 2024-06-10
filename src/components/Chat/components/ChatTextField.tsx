import React, {
  useState,
  useCallback,
  memo,
  useEffect,
  KeyboardEvent,
  useRef,
} from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
// import SettingsVoiceOutlinedIcon from "@mui/icons-material/SettingsVoiceOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import Text from "components/common/Text";
import RecordControls from "./RecordControls";
import {
  useUserMentioningContext,
  useSearchMentionMessageContext,
  useChatContext,
  useChatLoadingAttachmentContext,
} from "../context";
// import { mentioningConstants } from "../constants";
import MentioningUsersList from "./MentioningUsersList";
import { useUploadFileProgress } from "hooks/useUploadFIle";
import sendBtnSVG from "assets/svg/send_btn.svg";
import { UsersListForMentioning } from "context/chat";
import Input from "components/common/Input";

const LIMIT_UPLOAD_FILE_IN_BYTE = 20971520;

interface Props {
  roomId: string;
}

// type ResultReduced = {
//   messageArrayWithId: string[];
//   mentionUsersIds: UserId[];
// };

function replaceMentioningUsertInChatMessage1(
  input: string,
  usersList: UsersListForMentioning[]
): { message: string; mentionUsersIds: number[] } {
  const mentionUsersIds: number[] = [];

  let message = input.replaceAll('"', "");

  !!usersList &&
    usersList.forEach((user) => {
      const regex = new RegExp(`@${user.name}`, "g");
      const matches = message.match(regex);

      if (matches) {
        mentionUsersIds.push(user.id);
        message = message.replace(regex, `@${user.id.toString()}#`);
      }
    });

  return { message, mentionUsersIds };
}

// const replaceMentioningUsertInChatMessage = (
//   textMessage: string,
//   userList: UsersListForMentioning[]
// ) => {
//   textMessage = textMessage.replaceAll('"', "");
//   const textMessageToArray = textMessage.split(
//     mentioningConstants.splitStringRegExp
//   );
//   const { mentionUsersIds, messageArrayWithId } =
//     textMessageToArray.reduce<ResultReduced>(
//       (res, word) => {
//         if (word.at(0) === mentioningConstants.startSymbol) {
//           const _filteredWord = word
//             .slice(1)
//             .replace(mentioningConstants.searchSymbolsRegExp, "");
//           const user = userList.find((u) => u.name === _filteredWord);

//           if (user) {
//             res.messageArrayWithId.push(
//               word.replace(
//                 _filteredWord,
//                 `${user.id}${mentioningConstants.endSymbol}`
//               )
//             );
//             res.mentionUsersIds = [
//               ...new Set([...res.mentionUsersIds, user.id]),
//             ];
//             return res;
//           }
//         }
//         res.messageArrayWithId.push(word);
//         return res;
//       },
//       { messageArrayWithId: [], mentionUsersIds: [] }
//     );
//   return { mentionUsersIds, message: messageArrayWithId.join(" ") };
// };

const getNameFromFile = (file: File) => {
  return file.name;
};

const getFileExtFromFile = (file: File) => {
  return file.name?.split(".")?.at(-1);
};

const getSizeFromFile = (file: File) => {
  const BYTE_IN_ONE_KILO_BYTE = 1024;
  const fileSizeByte = file.size;
  const fileSizeKbyte = fileSizeByte / BYTE_IN_ONE_KILO_BYTE;
  const fileSizeMbyte = fileSizeKbyte / BYTE_IN_ONE_KILO_BYTE;
  return fileSizeKbyte?.toFixed(0)?.length > 3
    ? `${fileSizeMbyte.toFixed(2)} Mb`
    : `${fileSizeKbyte.toFixed(2)} Kb`;
};

const isImageFile = (file: File) => {
  return file.type.split("/").at(0) === "image";
};

const ChatTextField = ({ roomId }: Props) => {
  const { sendMessage } = useChatContext();
  const usersList = useUserMentioningContext();
  const { detectSearchSymbol } = useSearchMentionMessageContext();

  const isFetchingSendMessage = useChatLoadingAttachmentContext();

  const [progressUpload, handleUploadPropgress, reset] =
    useUploadFileProgress();

  const [file, setFile] = useState<File | null>(null);
  const [isRecord, setIsRecord] = useState<boolean>(false);
  const [chatTextMessage, setChatMessage] = useState<string>("");
  const [limitFileException, setLimitFileException] = useState<boolean>(false);

  const [urlFile, setUrlFile] = useState<string | null>(null);

  const [signalController, setSignalController] = useState<
    AbortController | undefined
  >(undefined);

  const handleChangeChatValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChatMessage(event.target.value);
    if (typeof detectSearchSymbol === "function") {
      detectSearchSymbol(event.target.value);
    }
  };

  const handleSendMessage = async () => {
    if (
      limitFileException ||
      (chatTextMessage.trim() === "" && file === null && urlFile === null)
    ) {
      return; // Return early if the message is empty
    }

    const stringified = JSON.stringify(chatTextMessage);

    if (typeof sendMessage === "function") {
      const replacedMessagesData = replaceMentioningUsertInChatMessage1(
        stringified,
        usersList
      );

      const controller = new AbortController();
      setSignalController(controller);

      const convertStringToAnchorTag = (inputString: string): string => {
        const urlRegex = /(https?:\/\/[^\s]+)(?!\n)/g;
        const parts = inputString.split(urlRegex);

        const convertedParts = parts.map((part) => {
          if (part.match(urlRegex)) {
            const cleanedURL = part.trim().replace(/\\n/g, "");
            return `<a href="${cleanedURL}" target="_blank">${cleanedURL}</a>`;
          }

          return part;
        });

        return convertedParts.join("");
      };

      const convertedString = convertStringToAnchorTag(
        replacedMessagesData.message
      );

      sendMessage({
        content: convertedString,
        file,
        type: file ? "attachment" : "text",
        cb: handleUploadPropgress,
        abortSignal: controller.signal,
        mentionUsersIds: replacedMessagesData.mentionUsersIds,
      })
        .then(() => {
          setFile(null);
          setChatMessage("");
        })
        .finally(() => {
          reset();
          setSignalController(undefined);
        });
    }
  };

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const sendVoice = (voice: File) => {
    if (typeof sendMessage === "function") {
      sendMessage({ file: voice, type: "voice" });
    }
  };

  const toggleRecord = useCallback(() => {
    setFile(null);
    setIsRecord((prev) => !prev);
  }, []);

  const handleChangeAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files && e.target?.files[0];

    setFile(file);
    e.target.value = "";
  };

  const handleDeleteAttachedFile = () => {
    setFile(null);
  };

  const handleCancelUploadAttachment = () => {
    if (signalController) {
      signalController.abort();
    }
  };

  useEffect(() => {
    if (file) {
      if (file?.size > LIMIT_UPLOAD_FILE_IN_BYTE) {
        setLimitFileException(true);
      } else {
        setLimitFileException(false);
        setUrlFile(URL.createObjectURL(new Blob([file], { type: file.type })));
      }
    } else {
      setLimitFileException(false);
    }
    return () => {
      setUrlFile((pr) => {
        if (pr) {
          URL.revokeObjectURL(pr);
        }
        return null;
      });
    };
  }, [file]);

  const sendIconButton = (
    // chatTextMessage || file ? (
    <div onClick={handleSendMessage} className="attach_button">
      <Image alt="svg" src={sendBtnSVG} />
    </div>
  );
  // ) : (

  //   <IconButton
  //     className="attach_button"
  //     onClick={toggleRecord}
  //     disabled={isFetchingSendMessage}
  //   >
  //     <SettingsVoiceOutlinedIcon fontSize="inherit" />
  //   </IconButton>
  // );

  const attachedFile = file ? (
    <div
      className={`attached_file_container ${
        isFetchingSendMessage ? "uploaded_process" : ""
      }`.trim()}
    >
      <div className="file_info_block">
        <div className="file_info_container">
          {isFetchingSendMessage && (
            <span className="progress_container">
              <CircularProgress
                className="progress_indicator"
                variant="indeterminate"
                // variant="determinate"
                // value={progressUpload}
              />
              <Text className="progress_text">{`${progressUpload}%`}</Text>
            </span>
          )}
          {isImageFile(file) && urlFile ? (
            <div className="file_info_image">
              <img
                src={urlFile}
                alt="attached pic"
                className="attached_preview_file"
              />
            </div>
          ) : (
            <div className="ext_block">
              {!isFetchingSendMessage && (
                <Text className="file_ext_text">
                  {getFileExtFromFile(file!)}
                </Text>
              )}
            </div>
          )}
        </div>
        <div className="file_info">
          <Text className="file_name_text">{getNameFromFile(file!)}</Text>
          <Text
            className={`file_size_text ${
              limitFileException ? "limit_except" : ""
            }`.trim()}
          >
            {getSizeFromFile(file!)}
            {limitFileException && (
              <Text className="exception_message">
                {" "}
                (File size should not be more 20MB!)
              </Text>
            )}
          </Text>
        </div>
      </div>
      <IconButton
        className="closeButton"
        onClick={
          isFetchingSendMessage
            ? handleCancelUploadAttachment
            : handleDeleteAttachedFile
        }
      >
        <CloseRoundedIcon fontSize="inherit" />
      </IconButton>
    </div>
  ) : null;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current, roomId, chatTextMessage]);

  return (
    <>
      {!!usersList.length && (
        <MentioningUsersList
          chatTextMessage={chatTextMessage}
          setChatMessage={setChatMessage}
        />
      )}
      <div className={`chat_controls_container`}>
        {isRecord ? (
          <RecordControls cancelRecord={toggleRecord} sendVoice={sendVoice} />
        ) : (
          <>
            {attachedFile}
            <Input
              ref={inputRef}
              placeholder="Write a message"
              variant="ountlined"
              classNameContainer={`chat_input_container ${
                file ? "attached_file" : ""
              }`.trim()}
              className="chat_input"
              multiline={true}
              maxRows={5}
              onKeyUp={handleKeyPress}
              startAdornment={
                <label style={{ display: "contents" }}>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleChangeAttachment}
                    multiple={false}
                    disabled={isFetchingSendMessage}
                  />
                  <IconButton
                    className="attach_button"
                    component={"span"}
                    disabled={isFetchingSendMessage}
                  >
                    <AttachFileIcon fontSize="inherit" />
                  </IconButton>
                </label>
              }
              endAdornment={sendIconButton}
              value={chatTextMessage}
              onChange={handleChangeChatValue}
            />
          </>
        )}
      </div>
    </>
  );
};

export default memo(ChatTextField);
