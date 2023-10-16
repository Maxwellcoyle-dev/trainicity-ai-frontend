import { useState } from "react";

// Custom Hooks
import useGetThread from "./useGetThread";

import { trainicityAIAPI } from "../constants";
import axios from "axios";

const useDeleteFile = () => {
  const [fileDeleteLoading, setFileDeleteLoading] = useState(false);
  const [fileDeleteError, setFileDeleteError] = useState(null);

  const { getThread } = useGetThread();

  const deleteFile = async (fileKey, threadID) => {
    if (!threadID) return console.log("No threadID"); // Check for a threadID

    setFileDeleteLoading(true);
    setFileDeleteError(null);

    const init = {
      body: {
        fileKey: fileKey,
        threadID: threadID,
        userID: user.attributes.email,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(`${trainicityAIAPI}/deleteFile`, init);
      console.log(response);
    } catch (error) {
      console.log(error);
      setFileDeleteError(error);
    } finally {
      setFileDeleteLoading(false);
      getThread(threadID);
    }
  };

  return { fileDeleteLoading, fileDeleteError, deleteFile };
};

export default useDeleteFile;
