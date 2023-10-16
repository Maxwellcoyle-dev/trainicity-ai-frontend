import { useContext } from "react";

// State management
import { AppDispatchContext } from "../state/AppContext";
import { RESET_CURRENT_THREAD } from "../state/actions/actionTypes";

// Custom Hooks
import useGetThreads from "./useGetThreads";

import { trainicityAIAPI } from "../constants";
import axios from "axios";

const useDeleteThread = () => {
  const dispatch = useContext(AppDispatchContext);
  const { getThreads } = useGetThreads();

  const deleteThread = async (threadId) => {
    if (!user) return console.log("No user"); // Check for an Authenticated User
    if (!token) return console.log("No token"); // Check for a token

    const init = {
      body: JSON.stringify({
        threadID: threadId,
        userID: userID,
      }),
    };

    axios
      .post(`${trainicityAIAPI}/deleteThread`, init)
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
