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

  const uploadFile = async (file, threadID) => {
    const userID = user?.userID; // Get the userID
    const token = user?.token; // Get the token

    if (!userID) return console.log("No user"); // Check for an Authenticated User
    if (!token) return console.log("No token"); // Check for a token
    if (!threadID) return console.log("No threadID"); // Check for a threadID

    setFileUploadLoading(true);
    setFileUploadError(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        // Get base64 data URL
        const dataURL = reader.result;

        // Extract base64 data from dataURL
        const base64Data = dataURL.split(",")[1];

        const init = {
          body: JSON.stringify({
            fileData: base64Data,
            fileName: file.name,
            threadID: threadID,
            userID: userID,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const response = await axios.post(
            `${trainicityAIAPI}/updloadFile`,
            init
          );
          console.log(response);
        } catch (error) {
          console.log(error);
          setFileUploadError(error);
          setFileUploadLoading(false);
        } finally {
          setFileUploadLoading(false);
          getThread(threadID);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
      setFileUploadError(error);
      setFileUploadLoading(false);
    }
  };

  const cancelFileUpload = () => {
    if (cancelUpload) cancelUpload();
  };

  return { uploadFile, fileUploadLoading, fileUploadError, cancelFileUpload };
};

export default useFileUpload;
