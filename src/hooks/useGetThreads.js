import { useContext, useState } from "react";

// Context & Actions
import { AppDispatchContext, AppStateContext } from "../state/AppContext";
import { SET_THREADS } from "../state/actions/actionTypes";

import { trainicityAIAPI } from "../constants";
import axios from "axios";

import { Auth } from "aws-amplify";

const useGetThreads = () => {
  const [threadsExist, setThreadsExist] = useState(false);
  const [threadsLoading, setThreadsLoading] = useState(false);
  const [threadsError, setThreadsError] = useState(null);

  const dispatch = useContext(AppDispatchContext);

  const getThreads = async () => {
    setThreadsLoading(true);
    setThreadsError(null);

    const user = await Auth.currentAuthenticatedUser();
    const userID = user.attributes.email;
    const token = user.signInUserSession.idToken.jwtToken;

    const init = {
      body: {
        userID: userID,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${trainicityAIAPI}/listThreads`, init.body, {
        headers: init.headers,
      })
      .then((response) => {
        if (response.data.length === 0 || !response.data) {
          setThreadsExist(false);
          setThreadsLoading(false);
          return;
        }

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
        console.log("useGetThreads mappedResponse", mappedResponse);
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
