"use client";
import { blobToURL, fromURL } from "image-resize-compress";

export const getVideoThumbnail = (file: File) => {
  var fileURL = URL.createObjectURL(file);
  const importFileandPreview = (
    file: Blob | MediaSource,
    revoke: undefined
  ) => {
    return new Promise((resolve, reject) => {
      window.URL = window.URL || window.webkitURL;
      let preview = window.URL.createObjectURL(file);
      // remove reference
      if (revoke) {
        window.URL.revokeObjectURL(preview);
      }
      setTimeout(() => {
        resolve(preview);
      }, 100);
    });
  };
  return new Promise((resolve, reject) => {
    if (file.type.match("video")) {
      importFileandPreview(file, undefined).then((urlOfFIle) => {
        var video = document.createElement("video");
        var timeupdate = function () {
          if (snapImage()) {
            video.removeEventListener("timeupdate", timeupdate);
            video.pause();
          }
        };
        video.addEventListener("loadeddata", function () {
          if (snapImage()) {
            video.removeEventListener("timeupdate", timeupdate);
          }
        });
        var snapImage = function () {
          var canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas
            .getContext("2d")!
            .drawImage(video, 0, 0, canvas.width, canvas.height);
          var image = canvas.toDataURL("image/png", 0.1);
          image = image.substring(image.indexOf(",") + 1);
          var success = image.length > 100000;
          if (success) {
            URL.revokeObjectURL(fileURL);
            const width = 0;
            const height = 0;
            const format = "webp";

            image = "data:image/jpeg;base64," + image;
            fromURL(image, 90, width, height, "png").then((firstBlob) => {
              fromURL(
                image,
                firstBlob.size < 300000
                  ? 90
                  : firstBlob.size < 500000
                  ? 80
                  : firstBlob.size < 700000
                  ? 60
                  : 45,
                width,
                height,
                format
              ).then((blob) => {
                blobToURL(blob).then((url) => {
                  var newFile = url.split(",")[1];
                  resolve(newFile);
                  return newFile;
                });
              });
            });
          }
          return success;
        };
        video.addEventListener("timeupdate", timeupdate);
        video.preload = "metadata";
        video.src = fileURL;
        // Load video in Safari / IE11
        video.muted = true;
        video.playsInline = true;
        video.play();
      });
    } else {
      reject("file not valid");
    }
  });
};
