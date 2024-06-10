import { AxiosProgressEvent } from "axios";
import { useState } from "react";

type ReturnUseUploadFileProgress = [
  number,
  HandlePropgressCb<AxiosProgressEvent>,
  () => void
];

export const useUploadFileProgress = (): ReturnUseUploadFileProgress => {
  const [progress, setProgress] = useState<number>(0);

  const handleProgress = (e: AxiosProgressEvent) => {
    const _progress = e.progress ?? 0;
    setProgress(Math.round(_progress * 99));
  };

  const reset = () => {
    setProgress(0);
  };

  return [progress, handleProgress, reset];
};
