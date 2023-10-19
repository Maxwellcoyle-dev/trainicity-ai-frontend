import React, { useContext, useEffect, useState } from "react";

// Context & Actions
import { AppStateContext, AppDispatchContext } from "../../state/AppContext";
import {
  HIDE_NEW_THREAD_MODAL,
  NEW_THREAD_ID,
  SHOW_ATTACHMENT_MODAL,
  UPDATE_THREAD,
  SET_MODE,
} from "../../state/actions/actionTypes";

// custom components
import NewThreadForm from "./NewThreadForm";
import ModeCard from "./ModeCard";

import modeCardData from "./modeCardData.json";

// Hooks
import usePushCurrentThread from "../../hooks/usePushCurrentThread";

// Ant Design
import { Modal, Button, Input, Flex } from "antd";

const NewThreadModal = () => {
  const [newThreadMode, setNewThreadMode] = useState(""); // ["Standard Chat", "Doc QA Chat"
  const [newTitle, setNewTitle] = useState("");
  const [newThreadInstructions, setNewThreadInstructions] = useState("");

  const { setUpdateCurrentThread } = usePushCurrentThread();

  const dispatch = useContext(AppDispatchContext);
  const state = useContext(AppStateContext);
  const mode = state?.mode?.mode;
  const showNewThreadModal = state.modal?.showNewThreadModal;

  const handleCancel = () => {
    dispatch({ type: "SET_MODE", payload: "" });
    dispatch({ type: HIDE_NEW_THREAD_MODAL });
  };

  const handleSetTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSetInstructions = (e) => {
    setNewThreadInstructions(e.target.value);
  };

  const handleCreateThread = () => {
    dispatch({
      type: UPDATE_THREAD,
      payload: {
        threadTitle: newTitle,
        threadMode: newThreadMode,
        threadInstructions: newThreadInstructions,
      },
    });
    dispatch({ type: HIDE_NEW_THREAD_MODAL });

    setUpdateCurrentThread(true);
  };

  const handleAfterClose = () => {
    dispatch({ type: SHOW_ATTACHMENT_MODAL });
  };

  // When the user clicks to start a thread - the mode is set to the mode of the thread
  useEffect(() => {
    console.log("newThreadMode", newThreadMode);
    dispatch({ type: SET_MODE, payload: newThreadMode });
  }, [newThreadMode]);

  useEffect(() => {
    if (showNewThreadModal) {
      dispatch({ type: NEW_THREAD_ID });
    }
  }, [showNewThreadModal]);

  return (
    <Modal
      afterClose={() => handleAfterClose}
      open={showNewThreadModal}
      onCancel={handleCancel}
      closeIcon={false}
      width="fit-content"
      keyboard
      style={{ padding: "30px" }}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Flex gap="middle" wrap>
        {mode === "" ? (
          modeCardData.map((item) => (
            <ModeCard
              id={item.id}
              modeName={item.mode}
              modeDescription={item.description}
              setNewThreadMode={setNewThreadMode}
            />
          ))
        ) : (
          <NewThreadForm mode={newThreadMode} />
        )}
      </Flex>
    </Modal>
  );
};

export default NewThreadModal;

{
  /* <Typography.Title level={3}>Pick a Mode</Typography.Title>
<Row gutter={[16, 16]}>
  <Col span={12}>
    <Card>
      <Typography.Title
        type={
          mode === "Standard Chat" || mode === ""
            ? "default"
            : "secondary"
        }
        level={4}
      >
        Standard AI Chat
      </Typography.Title>
      <Typography.Paragraph
        type={
          newThreadMode === "Standard Chat" || newThreadMode === ""
            ? "default"
            : "secondary"
        }
      >
        Use this mode to chat with an AI bot about anything you want.
      </Typography.Paragraph>
      {newThreadMode !== "Standard Chat" && (
        <Button onClick={() => handleModeSelection("Standard Chat")}>
          Standard Chat Mode
        </Button>
      )}
      {newThreadMode === "Standard Chat" && <Divider />}

      {newThreadMode === "Standard Chat" && (
        <Space direction="vertical">
          <Typography.Text>
            Give your thread a title. (Optional)
          </Typography.Text>
          <Input value={newTitle} onChange={handleSetTitle} />
          <Typography.Text>
            Tell the AI what you need help with / Give some initial
            instructions / Describe key context. (Optional)
          </Typography.Text>
          <TextArea
            value={newThreadInstructions}
            onChange={handleSetInstructions}
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
          <Button type="primary" onClick={handleCreateThread}>
            Create Thread
          </Button>
        </Space>
      )}
    </Card>
  </Col>
  <Col span={12}>
    <Card>
      <Typography.Title
        type={
          newThreadMode === "Doc QA Chat" || newThreadMode === ""
            ? "default"
            : "secondary"
        }
        level={4}
      >
        Document QA Chat
      </Typography.Title>
      <Typography.Paragraph
        type={
          newThreadMode === "Doc QA Chat" || newThreadMode === ""
            ? "default"
            : "secondary"
        }
      >
        Use this mode if you want to use AI to chat with your documents.
      </Typography.Paragraph>
      {newThreadMode !== "Doc QA Chat" && (
        <Button onClick={() => handleModeSelection("Doc QA Chat")}>
          Doc QA Chat Mode
        </Button>
      )}
      {newThreadMode === "Doc QA Chat" && <Divider />}
      {newThreadMode === "Doc QA Chat" && (
        <Space direction="vertical">
          <Typography.Text>
            Give your thread a title. (Optional)
          </Typography.Text>
          <Input value={newTitle} onChange={handleSetTitle} />
          <Typography.Text>
            Tell the AI what you need help with / Give some initial
            instructions / Describe key context. (Optional)
          </Typography.Text>
          <TextArea
            value={newThreadInstructions}
            onChange={handleSetTitle}
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
          <Button
            type="primary"
            onClick={handleCreateThread}
            icon={<UploadOutlined />}
          >
            Add Documents
          </Button>
        </Space>
      )}
    </Card>
  </Col>
</Row> */
}
