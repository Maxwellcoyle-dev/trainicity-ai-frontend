import { useContext, useState } from "react";

// Context & Actions
import { AppDispatchContext, AppStateContext } from "../state/AppContext";
import { GET_CURRENT_THREAD } from "../state/actions/actionTypes";

import { trainicityAIAPI } from "../constants";
import axios from "axios";

const useGetThread = () => {
  const [threadLoading, setThreadLoading] = useState(false);
  const [threadError, setThreadError] = useState(false);

  const { user } = useContext(AppStateContext);

  const dispatch = useContext(AppDispatchContext);

  const getThread = async (threadID) => {
    setThreadLoading(true);
    setThreadError(false);

    const userID = user?.userID; // Get the userID
    const token = user?.token; // Get the token

    if (!threadID) return console.log("No threadID"); // Check for a threadID

    const init = {
      body: JSON.stringify({
        threadID: threadID,
        userID: userID,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${trainicityAIAPI}/getThread`, init)
      .then((response) => {
        console.log("useGetThread response.data: ", response.data);
        dispatch({ type: GET_CURRENT_THREAD, payload: response.data });
      })
      .catch((error) => {
        setThreadError(true);
        console.log(error.response);
      })
      .finally(() => {
        setThreadLoading(false);
      });
  };

  return { getThread, threadLoading, threadError };
};

export default useGetThread;
