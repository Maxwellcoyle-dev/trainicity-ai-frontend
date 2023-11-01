import { useContext, useState } from "react";

// Context & Actions
import { AppStateContext, AppDispatchContext } from "../state/AppContext";
import { ADD_MESSAGE } from "../state/actions/actionTypes";

import axios from "axios";
import { trainicityAIAPI } from "../constants";

const useLLMDocSum = () => {
  const [docQALoading, setDocQALoading] = useState(false);
  const [docQAError, setDocQAError] = useState(null);

  const dispatch = useContext(AppDispatchContext);

  const { threadData, user } = useContext(AppStateContext);

  const fetchDocQA = async (userInput) => {
    try {
      setDocQALoading(true);
      setDocQAError(null);

      const token = user?.token; // Get the token

      const files = threadData?.currentThread.files;
      console.log(threadData.currentThread);

      let fileKeyList = [];
      if (files) fileKeyList = files?.map((file) => file.fileKey);

      if (fileKeyList.length < 1) return "No files";
      console.log(fileKeyList);

      const currentThread = threadData?.currentThread;
      console.log(currentThread);

      dispatch({
        type: ADD_MESSAGE,
        payload: {
          role: "user",
          content: userInput,
        },
      });

      const payload = {
        files: fileKeyList,
        question: userInput,
        userID: user.userID,
        threadID: currentThread.threadID,
      };

      axios
        .post(`${trainicityAIAPI}/LLMDocQAChat`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          dispatch({
            type: ADD_MESSAGE,
            payload: {
              role: "assistant",
              content: response.data.res.text,
            },
          });
        })
        .catch((error) => {
          console.log(error.response);
          setDocQAError(error.response.data);
        })
        .finally(() => {
          setDocQALoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchDocQA,
    docQALoading,
  };
};

export default useLLMDocSum;
