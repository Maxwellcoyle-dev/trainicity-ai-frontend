import React, { useContext, useState, useEffect } from "react";

// Constext & State Management
import { AppDispatchContext, AppStateContext } from "../../state/AppContext";
import {
  HIDE_THREAD_SETTINGS_MODAL,
  UPDATE_THREAD,
} from "../../state/actions/actionTypes";

// Ant Design
import { Button, Modal } from "antd";

// Custom Components
import StandardChat from "./StandardChat";
import DocQAChat from "./DocQAChat";

const ThreadSettingsModal = () => {
  const [titleValue, setTitleValue] = useState("");
  const [instructionsValue, setInstructionsValue] = useState("");

  const state = useContext(AppStateContext);
  const currentMode = state.threadData.currentThread?.threadMode;
  const showThreadSettingsModal = state.modal?.showThreadSettingsModal;

  const dispatch = useContext(AppDispatchContext);

  const handleClose = () => {
    dispatch({ type: HIDE_THREAD_SETTINGS_MODAL });
  };

  const handleSubmit = () => {
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
    setTitleValue(state.threadData?.currentThread?.threadTitle);
    setInstructionsValue(state.threadData?.currentThread?.threadInstructions);
  }, [showThreadSettingsModal]);

  return (
    <Modal
      onCancel={handleClose}
      open={showThreadSettingsModal}
      onOk={handleSubmit}
    >
      {currentMode === "Standard Chat" ? (
        <div>
          <StandardChat
            titleValue={titleValue}
            setTitleValue={setTitleValue}
            instructionsValue={instructionsValue}
            setInstructionsValue={setInstructionsValue}
          />
        </div>
      ) : currentMode === "Doc QA Chat" ? (
        <div>
          <DocQAChat />
        </div>
      ) : (
        <div>Something went wrong</div>
      )}
    </Modal>
  );
};

export default ThreadSettingsModal;
