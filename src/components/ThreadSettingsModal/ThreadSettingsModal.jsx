import React, { useContext, useState, useEffect } from "react";

// Constext & State Management
import { AppDispatchContext, AppStateContext } from "../../state/AppContext";
import {
  HIDE_THREAD_SETTINGS_MODAL,
  UPDATE_THREAD,
} from "../../state/actions/actionTypes";

// Ant Design
import { Modal } from "antd";

// Custom Components
import StandardChat from "./StandardChat";

const ThreadSettingsModal = () => {
  const [titleValue, setTitleValue] = useState("");
  const [instructionsValue, setInstructionsValue] = useState("");

  const { threadData, modal } = useContext(AppStateContext);

  const currentMode = threadData.currentThread?.threadMode;
  const showThreadSettingsModal = modal?.showThreadSettingsModal;

  // destructure threadID + currentThreadFiles + currentThreadUrls + currentMode from threadData
  const threadID = threadData?.currentThread?.threadID;
  const currentThreadFiles = threadData?.currentThread?.files;
  const currentThreadUrls = threadData?.currentThread?.urls;
  const currentThreadTitle = threadData?.currentThread?.threadTitle;

  const dispatch = useContext(AppDispatchContext);

  useEffect(() => {
    localStorage.setItem(
      "currentThreadState",
      JSON.stringify(threadData?.currentThread)
    );
  }, []);

  const handleClose = () => {
    dispatch({ type: HIDE_THREAD_SETTINGS_MODAL });
  };

  const handleSubmit = () => {
    const prevState = JSON.parse(localStorage.getItem("currentThreadState"));

    dispatch({
      type: UPDATE_THREAD,
      payload: {
        threadTitle: titleValue,
        threadInstructions: instructionsValue,
      },
    });
    dispatch({ type: HIDE_THREAD_SETTINGS_MODAL });
  };

  useEffect(() => {
    setTitleValue(currentThreadTitle);
    setInstructionsValue(threadData?.currentThread?.threadInstructions);
  }, [showThreadSettingsModal]);

  return (
    <Modal
      onCancel={handleClose}
      open={showThreadSettingsModal}
      onOk={handleSubmit}
    >
      <StandardChat
        titleValue={titleValue}
        setTitleValue={setTitleValue}
        instructionsValue={instructionsValue}
        setInstructionsValue={setInstructionsValue}
        currentMode={currentMode}
        threadID={threadID}
        currentThreadFiles={currentThreadFiles}
        currentThreadUrls={currentThreadUrls}
        currentThreadTitle={currentThreadTitle}
      />
    </Modal>
  );
};

export default ThreadSettingsModal;
