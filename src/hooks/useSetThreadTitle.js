import { useContext } from "react";

// Context & Actions
import { AppStateContext } from "../state/AppContext";

// Custom Hooks
import useGetThreads from "./useGetThreads";

import axios from "axios";
import { trainicityAIAPI } from "../constants";

const useSetThreadTitle = () => {
  const { getThreads } = useGetThreads();

  const { user } = useContext(AppStateContext);

  const setTitle = async (threadId, newTitle) => {
    const userID = user?.userID; // Get the userID
    const token = user?.token; // Get the token

    if (!user) return console.log("No user"); // Check for an Authenticated User
    if (!token) return console.log("No token"); // Check for a token

    const init = {
      body: {
        threadID: threadId,
        userID: userID,
        threadTitle: newTitle,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${trainicityAIAPI}/updateThreadTitle`, init.body, {
        headers: init.headers,
      })
      .then((response) => {
        console.log(response);
        getThreads();
      })
      .catch((error) => console.log(error));
  };

  return { setTitle };
};

export default useSetThreadTitle;
