import { useContext, useState } from "react";

// Context & Actions
import { AppDispatchContext, AppStateContext } from "../state/AppContext";
import { SET_THREADS } from "../state/actions/actionTypes";

import { trainicityAIAPI } from "../constants";
import axios from "axios";

const useGetThreads = () => {
  const [threadsExist, setThreadsExist] = useState(false);
  const [threadsLoading, setThreadsLoading] = useState(false);
  const [threadsError, setThreadsError] = useState(null);

  const { user } = useContext(AppStateContext);
  const dispatch = useContext(AppDispatchContext);

  const getThreads = async () => {
    setThreadsLoading(true);
    setThreadsError(null);

    const userID = user?.userID; // Get the userID
    const token = user?.token; // Get the token

    const init = {
      body: {
        userID: userID,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${trainicityAIAPI}/listThreads`, init)
      .then((response) => {
        if (response.data.length === 0 || !response.data) {
          setThreadsExist(false);
          setThreadsLoading(false);
          return;
        }

        console.log(response);
        setThreadsExist(true);

        const mappedResponse = response.data?.map((item) => {
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
