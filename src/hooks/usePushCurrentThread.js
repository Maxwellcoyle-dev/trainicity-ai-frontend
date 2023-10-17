import { useContext, useEffect, useState } from "react";

import { trainicityAIAPI } from "../constants";

// Hooks
import useGetThreads from "./useGetThreads";

// Context & Actions
import { AppStateContext } from "../state/AppContext";

// Amplify API
import axios from "axios";

const usePushCurrentThread = () => {
  const [updateCurrentThread, setUpdateCurrentThread] = useState(false);

  const { getThreads } = useGetThreads();
  const { threadData } = useContext(AppStateContext);

  useEffect(() => {
    if (updateCurrentThread) {
      pushThread();
      setUpdateCurrentThread(false);
    }
  }, [updateCurrentThread]);

  const pushThread = async () => {
    console.log("Pushing thread");
    console.log(threadData.currentThread);
    const userID = threadData.user.userID; // Get the userID
    const token = threadData.user.token; // Get the token
    const threadID = threadData.currentThread.threadID; // Get the current threadID
    const currentThreadMessages = threadData.currentThread.messages; // Get the current thread messages
    const threadTitle = threadData.currentThread.threadTitle; // Get the current thread title
    const threadMode = threadData.currentThread.threadMode; // Get the current thread mode
    const threadInstructions = threadData.currentThread.threadInstructions; // Get the current thread instructions

    if (!threadID) return console.log("No threadID"); // Check for a threadID

    // Set the lastUpdated timestamp
    const lastUpdated = Date.now().toString();

    const init = {
      body: {
        threadID,
        userID,
        messages: currentThreadMessages,
        lastUpdated,
        threadTitle,
        threadMode,
        threadInstructions,
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${trainicityAIAPI}/currentThread`, init)
      .then((response) => {
        console.log(response);
        getThreads();
      })
      .catch((error) => console.log(error));
  };

  return {
    pushThread,
    setUpdateCurrentThread,
    updateCurrentThread,
  };
};

export default usePushCurrentThread;
