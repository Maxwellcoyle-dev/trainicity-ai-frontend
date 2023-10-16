import { useContext, useState } from "react";

// Context & Actions
import { AppDispatchContext } from "../state/AppContext";
import { GET_CURRENT_THREAD } from "../state/actions/actionTypes";

import { trainicityAIAPI } from "../constants";
import axios from "axios";

const useGetThread = () => {
  const [threadLoading, setThreadLoading] = useState(false);
  const [threadError, setThreadError] = useState(false);

  const dispatch = useContext(AppDispatchContext);

  const getThread = async (threadID) => {
    setThreadLoading(true);
    setThreadError(false);

    if (!threadID) return console.log("No threadID"); // Check for a threadID

    const init = {
      body: JSON.stringify({
        threadID: threadID,
        userID: userID,
      }),
    };

    axios
      .post(`${trainicityAIAPI}/getThread`, init)
      .then((response) => {
        dispatch({ type: GET_CURRENT_THREAD, payload: response });
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
