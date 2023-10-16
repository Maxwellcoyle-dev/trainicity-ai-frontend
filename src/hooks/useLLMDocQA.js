import { useContext, useState } from "react";

// Context & Actions
import { AppStateContext } from "../state/AppContext";

import { llmDocQAChat } from "../constants";

const useLLMDocSum = () => {
  const [docQAResponse, setDocQAResponse] = useState("");

  const state = useContext(AppStateContext);
  const files = state.threadData?.currentThread.files;

  let fileKeyList = [];
  if (files) fileKeyList = files?.map((file) => file.fileKey);

  const fetchDocQA = async () => {
    try {
      if (fileKeyList.length < 1) return "No files";
      console.log(fileKeyList);

      const response = await fetch(llmDocQAChat, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fileKeyList),
      });
      const data = await response.json();
      setDocQAResponse(data);
      console.log(data);
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
