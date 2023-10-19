import { useState, useContext } from "react";

// Custom Hooks
import useGetThread from "./useGetThread";

// Context & Actions
import { AppStateContext } from "../state/AppContext";

import axios from "axios";
import { trainicityAIAPI } from "../constants";

const useFileUpload = () => {
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(null);

  const { user } = useContext(AppStateContext);

  const { getThread } = useGetThread();

  let cancelUpload;

  const uploadFile = async (files, threadID) => {
    console.log("uploading files", files);
    setFileUploadLoading(true);
    setFileUploadError(null);

    const userID = user?.userID; // Get the userID
    const token = user?.token; // Get the token

    if (!userID) return console.log("No user"); // Check for an Authenticated User
    if (!token) return console.log("No token"); // Check for a token
    if (!threadID) return console.log("No threadID"); // Check for a threadID

    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        try {
          const reader = new FileReader();
          reader.onloadend = async () => {
            // Get base64 data URL
            const dataURL = reader.result;

            // Extract base64 data from dataURL
            const base64Data = dataURL.split(",")[1];

            const init = {
              body: {
                fileData: base64Data,
                fileName: file.name,
                threadID: threadID,
                userID: userID,
              },
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            };

            try {
              const response = await axios.post(
                `${trainicityAIAPI}/uploadFile`,
                init.body,
                {
                  headers: init.headers,
                }
              );
              console.log(response);
              resolve(response);
            } catch (error) {
              console.log(error);
              reject(error);
            }
          };
          reader.readAsDataURL(file);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
    });

    // Wait for all files to be uploaded
    Promise.all(promises)
      .then((responses) => {
        console.log("all files uploaded", responses.data);
        getThread(threadID);
      })
      .catch((error) => {
        console.log(error);
        setFileUploadError(error);
      })
      .finally(() => {
        setFileUploadLoading(false);
      });
  };

  const cancelFileUpload = () => {
    if (cancelUpload) cancelUpload();
  };

  return { uploadFile, fileUploadLoading, fileUploadError, cancelFileUpload };
};

export default useFileUpload;
