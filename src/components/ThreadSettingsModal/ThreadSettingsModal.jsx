import React, { useContext, useState, useEffect } from "react";

// Constext & State Management
import { AppDispatchContext, AppStateContext } from "../../state/AppContext";
import {
  HIDE_THREAD_SETTINGS_MODAL,
  UPDATE_THREAD,
} from "../../state/actions/actionTypes";

// Custom Hooks
import useUpdateThreadUrls from "../../hooks/useUpdateThreadUrls";
import useUpdateThread from "../../hooks/useUpdateThread";

// Ant Design
import { Modal } from "antd";

// Custom Components
import ThreadSettingsForm from "./ThreadSettingsForm";

const initialState = {
  title: "",
  instructions: "",
  threadMode: "",
  threadID: "",
  threadFiles: [],
  threadUrls: [],
  threadLongContext: "",
};

const initialInputValueState = {
  title: "",
  instructions: "",
  url: "",
  file: "",
};

const ThreadSettingsModal = () => {
  const [currentThreadState, setCurrentThreadState] = useState(initialState);
  const [inputValues, setInputValues] = useState(initialInputValueState);

  const { threadData, modal } = useContext(AppStateContext);

  const showThreadSettingsModal = modal?.showThreadSettingsModal;

  const dispatch = useContext(AppDispatchContext);

  //  Destructure hooks useFileUpload, useUpdateThreadUrls, useDeleteFile
  const { setUpdateCurrentThread } = useUpdateThread();

  const { updateThreadUrls, updateUrlListLoading, updateThreadUrlsError } =
    useUpdateThreadUrls();

  // When the component mounts - set the currentThreadState to the threadDat +
  useEffect(() => {
    if (showThreadSettingsModal) {
      console.log("threadData", threadData);
      const updatedCurrentThreadState = {
        title: threadData.currentThread?.threadTitle,
        instructions: threadData.currentThread?.threadInstructions,
        threadMode: threadData.currentThread?.threadMode,
        threadID: threadData.currentThread?.threadID,
        threadFiles: threadData.currentThread?.files,
        threadUrls: threadData.currentThread?.urls,
        threadLongContext: "",
      };

      setCurrentThreadState(updatedCurrentThreadState);
    }
  }, [showThreadSettingsModal, threadData]);

  useEffect(() => {
    console.log("currentThreadState title", currentThreadState.title);
  }, [currentThreadState.title]);

  const handleClose = () => {
    setInputValues(initialInputValueState);
    dispatch({ type: HIDE_THREAD_SETTINGS_MODAL });
  };

  const handleSubmit = () => {
    if (
      threadData.currentThread.threadTitle !== currentThreadState.title ||
      threadData.currentThread.threadInstructions !==
        currentThreadState.instructions ||
      threadData.currentThread.threadUrls !== currentThreadState.threadUrls
    ) {
      dispatch({
        type: UPDATE_THREAD,
        payload: {
          threadTitle: currentThreadState.title,
          threadInstructions: currentThreadState.instructions,
          urls: currentThreadState.threadUrls,
        },
      });
      setInputValues(initialInputValueState);
      dispatch({ type: HIDE_THREAD_SETTINGS_MODAL });
      setUpdateCurrentThread(true);
    }
  };

  return (
    <Modal
      onCancel={handleClose}
      open={showThreadSettingsModal}
      onOk={handleSubmit}
      centered
    >
      <ThreadSettingsForm
        currentThreadState={currentThreadState}
        setCurrentThreadState={setCurrentThreadState}
        inputValues={inputValues}
        setInputValues={setInputValues}
      />
    </Modal>
  );
};

export default ThreadSettingsModal;
