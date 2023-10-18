import React, { useContext, useEffect, useState } from "react";

// Constext & State Management
import { AppDispatchContext, AppStateContext } from "../../state/AppContext";
import { HIDE_THREAD_SETTINGS_MODAL } from "../../state/actions/actionTypes";

// Ant Design
import { Typography, Flex, Divider, Input } from "antd";
const { TextArea } = Input;
const { Title, Text } = Typography;

const StandardChat = ({
  titleValue,
  setTitleValue,
  instructionsValue,
  setInstructionsValue,
}) => {
  const { threadData } = useContext(AppStateContext);

  return (
    <Flex vertical>
      <Title level={4}>Standard Chat - Thread Settings</Title>
      <Divider />
      <Title level={5}>Thread Title</Title>
      <Input
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />
      <Title level={5}>Instructions</Title>
      <TextArea
        value={instructionsValue}
        onChange={(e) => setInstructionsValue(e.target.value)}
      />
    </Flex>
  );
};

export default StandardChat;
