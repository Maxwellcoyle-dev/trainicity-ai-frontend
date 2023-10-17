import { useContext } from "react";

// State management
import { AppDispatchContext, AppStateContext } from "../state/AppContext";
import { RESET_CURRENT_THREAD } from "../state/actions/actionTypes";

// Custom Hooks
import useGetThreads from "./useGetThreads";

import { trainicityAIAPI } from "../constants";
import axios from "axios";

const useDeleteThread = () => {
  const { user } = useContext(AppStateContext);

  const dispatch = useContext(AppDispatchContext);

  const { getThreads } = useGetThreads();

  const deleteThread = async (threadId) => {
    const userID = user?.userID; // Get the userID
    const token = user?.token; // Get the token

    if (!userID) return console.log("No user"); // Check for an Authenticated User
    if (!token) return console.log("No token"); // Check for a token

    const init = {
      body: {
        threadID: threadId,
        userID: userID,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${trainicityAIAPI}/deleteThread`, init.body, {
        headers: init.headers,
      })
      .then((response) => {
        console.log(response);
        dispatch({ type: RESET_CURRENT_THREAD });
      })
      .catch((error) => console.log(error))
      .finally(() => getThreads());
  };

  return { deleteThread };
};

export default useDeleteThread;
