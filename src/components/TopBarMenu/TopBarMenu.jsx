import React, { useContext, useEffect } from "react";

// Custom Components
import TopBarDelete from "../TopBarDelete/TopBarDelete";

// Constext & State Management
import { AppDispatchContext, AppStateContext } from "../../state/AppContext";
import {
  HIDE_THREAD_SETTINGS_MODAL,
  SHOW_THREAD_SETTINGS_MODAL,
} from "../../state/actions/actionTypes";

// Ant Design
import { Space, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const TopBarMenu = () => {
  const state = useContext(AppStateContext);

  // get the current threadSettingsModal state
  const showThreadSettingsModal = state.modal?.showThreadSettingsModal;

  // get teh current threadMode state
  const currentMode = state.threadData.currentThread?.threadMode;

  // get the dispatch function
  const dispatch = useContext(AppDispatchContext);

  const handleThreadSettingsClick = () => {
    if (showThreadSettingsModal) dispatch({ type: HIDE_THREAD_SETTINGS_MODAL });
    else if (!showThreadSettingsModal)
      dispatch({ type: SHOW_THREAD_SETTINGS_MODAL });
  };

  useEffect(() => {
    console.log(showThreadSettingsModal);
  }, []);

  return (
    <Space>
      {currentMode === "" ? (
        <Button icon={<SettingOutlined />} disabled></Button>
      ) : (
        <Button
          icon={<SettingOutlined />}
          onClick={handleThreadSettingsClick}
        ></Button>
      )}
      <TopBarDelete />
    </Space>
  );
};

export default TopBarMenu;
