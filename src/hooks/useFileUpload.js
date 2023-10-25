import { useState, useContext } from "react";

// Custom Hooks
import useGetThread from "./useGetThread";

// Context & Actions
import { AppStateContext, AppDispatchContext } from "../state/AppContext";
import { UPDATE_THREAD } from "../state/actions/actionTypes";

// Axios + API GATEWAY ENDPOINT
import axios from "axios";
import { trainicityAIAPI } from "../constants";

const useFileUpload = () => {
  const [newFileS3Data, setNewFileS3Data] = useState(null); // [ { fileName: "", fileData: "" }
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(null);

  const { user, threadData } = useContext(AppStateContext);

  const dispatch = useContext(AppDispatchContext);

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
              console.log("response.data", response.data);
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
      .then((response) => {
        console.log("Promise resposne.data: ", response);
        setNewFileS3Data(response);

        const newFiles = response.map((file) => {
          return {
            fileName: file.data.fileName,
            fileKey: file.data.fileKey,
            fileUrl: file.data.fileUrl,
          };
        });

        const updatedFiles = [...threadData.currentThread.files, ...newFiles];

        console.log("newFiles", updatedFiles);

        dispatch({
          type: UPDATE_THREAD,
          payload: {
            threadID: threadID,
            files: updatedFiles,
          },
        });
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

  return {
    uploadFile,
    fileUploadLoading,
    fileUploadError,
    cancelFileUpload,
    newFileS3Data,
  };
};

export default useFileUpload;
