import React, {
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import UploadAiSVG from "assets/svg/uploadAi.svg";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import LongText from "components/LongText";
import Image from "next/image";

interface Props {
  base64Url: string;
  setBase64Url: Dispatch<SetStateAction<string>>;
  setFileType: Dispatch<SetStateAction<string>>;
}

const SpotDropzone = ({ setBase64Url, base64Url, setFileType }: Props) => {
  const [name, setName] = useState("");

  const { toastError, toastSuccess } = useTriggerAlert();

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles?.[0];
    if (file) {
      const fileType = file.type;
      const fileSizeLimit = 13 * 1024 * 1024;
      if (
        fileType === "application/pdf" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
        fileType === "application/vnd.ms-powerpoint"
      ) {
        if (file.size <= fileSizeLimit) {
          setName(file.name);
          setFileType(file.type);
          const reader = new FileReader();

          reader.onloadend = () => {
            const base64Data = reader.result as string;
            setBase64Url(base64Data.split(",")[1]);
          };

          reader.readAsDataURL(file);
        } else {
          toastError("Please upload files of sizes less than 10MB.");
        }
      } else {
        toastError("Only PDF files and PPT's are allowed.");
      }
    }
  };

  const onDropAccepted = useCallback(handleDrop, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: onDropAccepted,
  });

  return (
    <div className="w_full pointer">
      <div
        {...getRootProps()}
        className={`upload_wrapper dropzone ${
          isDragActive ? "dropzone--isActive border-blue-600" : ""
        } ${isDragAccept ? "dropzone--isAccept border-blue-600" : ""} ${
          isDragReject ? "dropzone--isReject border-red-600" : ""
        }`}
      >
        <input accept="*" {...getInputProps()} />
        {base64Url ? (
          <div className="spot_content_drop">
            <LongText cutoff={40} title={name} />
            <p className="link">Change</p>
          </div>
        ) : (
          <div className="ai_dropzone_content">
            <Image src={UploadAiSVG} alt="svg" />

            <div>
              <p className="">Select file to upload</p>
              <p className="text-sm text-gray-400">or drag and drop file</p>
              <div className="font-bold text-sm">
                <div>Maximum image size: 10 MB</div>
                <div>Format: pdf</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotDropzone;
