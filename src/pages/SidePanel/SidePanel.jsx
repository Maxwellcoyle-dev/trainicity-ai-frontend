import React, { useContext, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

// State Management
import { AppDispatchContext, AppStateContext } from "../../state/AppContext";
import {
  RESET_CURRENT_THREAD,
  SET_CURRENT_THREAD_ID,
  SET_MODE,
  SHOW_NEW_THREAD_MODAL,
} from "../../state/actions/actionTypes";

// Hooks
import useGetThreads from "../../hooks/useGetThreads";
import useGetThread from "../../hooks/useGetThread";

// Ant UI
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Menu, Space, Spin } from "antd";

import styles from "./SidePanel.module.css";

// Components
import SidePanelHeader from "../../components/SidePanelHeader/SidePanelHeader";

let newThreadUUID = "";

const SidePanel = ({ collapsed }) => {
  const dispatch = useContext(AppDispatchContext);

  // get Global State
  const state = useContext(AppStateContext);
  const threadData = state?.threadData;
  const currentThreadID = threadData?.currentThread?.threadID;

  const { getThreads, threadsLoading } = useGetThreads(); // Custom hook for getting all threads
  const { getThread } = useGetThread(); // Custom hook for getting a single thread

  // Get all threads from the database on component mount
  useEffect(() => {
    getThreads();
    newThreadUUID = uuidv4();
  }, []);

  useEffect(() => {
    dispatch({ type: SET_MODE, payload: threadData.currentThread.threadMode });
  }, [threadData.currentThread]);

  const createNewThread = () => {
    dispatch({ type: RESET_CURRENT_THREAD });
    dispatch({ type: SET_MODE, payload: "" });
    dispatch({ type: SHOW_NEW_THREAD_MODAL });
  };

  const openThread = (threadID, threadMode) => {
    console.log("threadID: ", threadID);
    console.log("threadMode: ", threadMode);
    getThread(threadID); // Get the thread from the database
    dispatch({ type: SET_CURRENT_THREAD_ID, payload: threadID });
    dispatch({ type: SET_MODE, payload: threadMode });
  };

  return (
    <Space direction="vertical" className={styles.container}>
      <SidePanelHeader collapsed={collapsed} />

      <Menu
        defaultSelectedKeys={[newThreadUUID]}
        mode="vertical"
        selectedKeys={currentThreadID ? currentThreadID : newThreadUUID}
        className={styles.menu}
      >
        <Menu.Item
          key={newThreadUUID}
          icon={<PlusOutlined />}
          onClick={createNewThread}
        >
          New Thread
        </Menu.Item>
        {/* Map through the threads and create Menu items for each */}
        {!threadsLoading ? (
          threadData?.threads?.map((thread) => (
            <Menu.Item
              key={thread.threadID}
              icon={<RightOutlined />}
              onClick={() => openThread(thread.threadID, thread.threadMode)}
            >
              {thread.threadTitle}
            </Menu.Item>
          ))
        ) : (
          <Space className={styles.spinDiv}>
            <Spin size="large" />
          </Space>
        )}
      </Menu>
    </Space>
  );
};

export default SidePanel;
