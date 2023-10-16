import { useContext, useState } from "react";

// Context & Actions
import { AppDispatchContext } from "../state/AppContext";
import { SET_THREADS } from "../state/actions/actionTypes";

import { trainicityAIAPI } from "../constants";
import axios from "axios";

const useGetThreads = () => {
  const [threadsExist, setThreadsExist] = useState(false);
  const [threadsLoading, setThreadsLoading] = useState(false);
  const [threadsError, setThreadsError] = useState(null);

  const dispatch = useContext(AppDispatchContext);

  const getThreads = async () => {
    setThreadsLoading(true);
    setThreadsError(null);

    const init = {
      body: {
        userID: "max@trainicity.com",
      },
    };

    axios
      .post(`${trainicityAIAPI}/listThreads`, init)
      .then((response) => {
        if (response.length === 0) {
          setThreadsExist(false);
          setThreadsLoading(false);
          return;
        }

        setThreadsExist(true);

        const mappedResponse = response.map((item) => {
          return {
            userID: item.UserID.S,
            threadID: item.ThreadID.S,
            threadTitle: item.ThreadTitle?.S,
            lastUpdated: item.LastUpdated?.S,
          };
        });

        setThreadsLoading(false);

        dispatch({ type: SET_THREADS, payload: mappedResponse });
      })
      .catch((error) => {
        console.log(error);
        setThreadsLoading(false);
        setThreadsError(error);
      });
  };

  return {
    getThreads,
    threadsExist,
    threadsLoading,
    threadsError,
  };
};

export default useGetThreads;
