import React, { useContext, useEffect } from "react";

// Styles
import styles from "./Main.module.css";

// Custom Components
import UserInputBar from "../../components/UserInputBar/UserInputBar";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import ThreadAttachmentsModal from "../../components/ThreadAttachmentsModal/ThreadAttachmentsModal";
import TopBar from "../../components/TopBar/TopBar";
import NewThreadModal from "../../components/NewThreadModal/NewThreadModal";

// Context & Actions
import { AppStateContext } from "../../state/AppContext";
import ThreadSettingsModal from "../../components/ThreadSettingsModal/ThreadSettingsModal";

const Main = ({
  setShowTopBar,
  showTopBar,
  setShowNewThreadModal,
  showNewThreadModal,
}) => {
  const state = useContext(AppStateContext);

  useEffect(() => {
    console.log(state);
  }, [state.threadData.currentThread]);

  return (
    <div className={styles.container}>
      <TopBar showTopBar={showTopBar} />
      <ThreadAttachmentsModal />
      <ThreadSettingsModal />
      <ChatContainer setShowTopBar={setShowTopBar} showTopBar={showTopBar} />
      <NewThreadModal
        setShowNewThreadModal={setShowNewThreadModal}
        showNewThreadModal={showNewThreadModal}
      />

      <UserInputBar />
    </div>
  );
};

export default Main;
