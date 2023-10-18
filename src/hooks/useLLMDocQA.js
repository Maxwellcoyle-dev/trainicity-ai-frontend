import { useContext, useState } from "react";

// Context & Actions
import { AppStateContext } from "../state/AppContext";

import axios from "axios";
import { llmDocQAChat } from "../constants";

const useLLMDocSum = () => {
  const [docQAResponse, setDocQAResponse] = useState("");

  const state = useContext(AppStateContext);
  const threadData = state.threadData;
  const files = threadData?.currentThread.files;

  let fileKeyList = [];
  if (files) fileKeyList = files?.map((file) => file.fileKey);

  const fetchDocQA = async () => {
    try {
      if (fileKeyList.length < 1) return "No files";
      console.log(fileKeyList);

      const currentThread = threadData?.currentThread;
      console.log(currentThread);

      // const init = {
      //   body: {
      //     files: fileKeyList,
      //     question: "What is the answer to life?",
      //     userID: "123",
      //     threadID: "456",
      //   },
      // };

      // const response = await fetch(llmDocQAChat, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(fileKeyList),
      // });
      // const data = await response.json();
      // setDocQAResponse(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchDocQA,
    docQAResponse,
  };
};

export default useLLMDocSum;
