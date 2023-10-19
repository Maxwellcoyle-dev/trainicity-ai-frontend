import React from "react";

// Ant Design
import { Button, Card, Flex, Typography } from "antd";
const { Title, Text, Paragraph } = Typography;

const ModeCard = ({ modeName, modeDescription, setNewThreadMode }) => {
  return (
    <Card>
      <Flex vertical>
        <Title level={4}>{modeName}</Title>
        <Paragraph>{modeDescription}</Paragraph>
        <Button onClick={() => setNewThreadMode(modeName)}>Start Thread</Button>
      </Flex>
    </Card>
  );
};

export default ModeCard;
