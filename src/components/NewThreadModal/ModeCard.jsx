import React, { useContext } from "react";

// State Management
import { AppDispatchContext, AppStateContext } from "../../state/AppContext";
import { SET_MODE } from "../../state/actions/actionTypes";

// Ant Design
import { Button, Card, Flex, Typography } from "antd";
const { Title, Paragraph } = Typography;

const ModeCard = ({ modeName, modeDescription, setNewThreadMode }) => {
  const dispatch = useContext(AppDispatchContext);

  const handleClick = () => {
    console.log("modename: ", modeName);
    setNewThreadMode(modeName);
    dispatch({ SET_MODE, payload: modeName });
  };

  return (
    <Card>
      <Flex vertical>
        <Title level={4}>{modeName}</Title>
        <Paragraph>{modeDescription}</Paragraph>
        <Button onClick={handleClick}>Start Thread</Button>
      </Flex>
    </Card>
  );
};

export default ModeCard;
