import { useState, useCallback } from "react";
import axios from "axios";
import { AxiosProgressEvent } from "axios";

const createLinkNode = (data: Blob, fileName: string): void => {
  const file = URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.setAttribute("download", fileName);
  link.setAttribute("href", file);
  link.click();
};

export const useDownloadFile = (
  url: string,
  fileName: string
): [() => Promise<void>, number, boolean, () => void] => {
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController | undefined>(
    undefined
  );

  const handleProgress = useCallback((event: AxiosProgressEvent) => {
    const _progress = event?.progress || 0;
    setProgress(Math.round(_progress * 99));
  }, []);

  const handleClickDownload = useCallback(async () => {
    if (isLoading) return;
    try {
      const _cont = new AbortController();
      setController(_cont);
      setIsLoading(true);
      const { data } = await axios({
        url,
        method: "get",
        responseType: "blob",
        onDownloadProgress: handleProgress,
        signal: _cont.signal,
      });
      createLinkNode(data, fileName);
    } catch (error: any) {
      throw error?.message;
    } finally {
      setIsLoading(false);
      setProgress(0);
      setController(undefined);
    }
  }, [fileName, handleProgress, isLoading, url]);

  const cancelDownload = useCallback(() => {
    if (controller) {
      controller.abort();
    }
  }, [controller]);

  return [handleClickDownload, progress, isLoading, cancelDownload];
};
