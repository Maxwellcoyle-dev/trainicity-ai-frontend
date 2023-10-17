import { useState, useContext } from "react";

// Context & Actions
import { AppStateContext } from "../state/AppContext";

// Custom Hooks
import useGetThread from "./useGetThread";

import axios from "axios";
import { trainicityAIAPI } from "../constants";

const useUpdateThreadUrls = () => {
  const [updateUrlListLoading, setUpdateUrlListLoading] = useState(false);
  const [updateUrlListError, setUpdateUrlListError] = useState(null);

  const { user } = useContext(AppStateContext);

  const { getThread } = useGetThread();

  const updateThreadUrls = async (urlList, threadID) => {
    const userID = user?.userID; // Get the userID
    const token = user?.token; // Get the token

    if (!userID) return console.log("No user"); // Check for an Authenticated User
    if (!urlList) return console.log("No urlList"); // Check for a urlList
    if (!threadID) return console.log("No threadID"); // Check for a threadID

    setUpdateUrlListLoading(true);
    setUpdateUrlListError(null);

    try {
      const init = {
        body: {
          threadID: threadID,
          userID: userID,
          urls: urlList,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("init: ", init);
      axios
        .post(`${trainicityAIAPI}`, init) // Add update URL endpoint after creation
        .then((response) => {
          console.log("response: ", response);
        })
        .catch((error) => {
          console.log("error: ", error);
          setUpdateUrlListError(error);
        })
        .finally(() => {
          setUpdateUrlListLoading(false);
          getThread(threadID);
        });
    } catch (error) {
      console.log(error);
      setUpdateUrlListError(error);
      setUpdateUrlListLoading(false);
    }
  };

  return { updateThreadUrls, updateUrlListLoading, updateUrlListError };
};

export default useUpdateThreadUrls;
