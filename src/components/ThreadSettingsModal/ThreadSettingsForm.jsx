import React, { useContext, useEffect, useState } from "react";

// Constext & State Management
import { AppDispatchContext } from "../../state/AppContext";

import styles from "./ThreadSettingsForm.module.css";

// Custom Hooks
import useFileUpload from "../../hooks/useFileUpload";
import useDeleteFile from "../../hooks/useDeleteFile";

// Ant Design
import { Avatar, Typography, Flex, Input, Upload, Button, List } from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  FileOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { TextArea } = Input;
const { Title, Text } = Typography;

const ThreadSettingsForm = ({
  currentThreadState,
  setCurrentThreadState,
  inputValues,
  setInputValues,
}) => {
  // control url boolean show/hide
  const [fileList, setFileList] = useState([]);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const { uploadFile, fileUploadLoading } = useFileUpload();
  const { deleteFile, fileDeleteLoading, fileDeeleteError } = useDeleteFile();

  const handleFileListChange = (info) => {
    // Use originFileObj directly from the info.fileList objects
    const filesToUpload = info.fileList.map(
      (fileInfo) => fileInfo.originFileObj
    );

    // Upload array of files to s3
    uploadFile(filesToUpload, currentThreadState.threadID);
  };

  const handleDeleteFile = (fileKey) => {
    deleteFile(fileKey, currentThreadState.threadID);
  };

  const handleDeleteUrl = (url) => {
    const newUrls = currentThreadState.threadUrls.filter(
      (item) => item !== url
    );
    setCurrentThreadState({ ...currentThreadState, threadUrls: newUrls });
  };

  const handleAddUrl = () => {
    // Add the new url to the threadUrls array
    const newUrls = [inputValues.url, ...currentThreadState.threadUrls];
    setCurrentThreadState({ ...currentThreadState, threadUrls: newUrls });
    setInputValues({ ...inputValues, url: "" });
    setShowUrlInput(false);
  };

  const handleCloseUrlInput = () => {
    setShowUrlInput(false);
    setInputValues({ ...inputValues, url: "" });
  };

  return (
    <Flex vertical gap="middle" style={{ maxHeight: "75vh" }}>
      <Flex align="center" gap="small">
        <Title level={3} style={{ margin: "0" }}>
          {currentThreadState.title}
        </Title>
        <SettingOutlined />
      </Flex>
      <Flex vertical gap="middle" className={styles.flexContainer}>
        <Flex vertical gap="small">
          <Title level={5}>Thread Title</Title>
          <Input
            value={currentThreadState.title}
            onChange={(e) =>
              setCurrentThreadState({
                ...currentThreadState,
                title: e.target.value,
              })
            }
          />
          <Title level={5}>Instructions</Title>
          <TextArea
            value={currentThreadState.instructions}
            onChange={(e) =>
              setCurrentThreadState({
                ...currentThreadState,
                instructions: e.target.value,
              })
            }
          />
        </Flex>
        {currentThreadState.threadMode === "Doc QA Chat" && (
          <Flex gap="middle" vertical>
            <Flex vertical style={{ width: "100%" }} gap="small">
              <Upload
                accept=".pdf,.doc,.docx,.txt"
                multiple={true}
                onChange={handleFileListChange}
                fileList={fileList}
              >
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  Add File
                </Button>
              </Upload>
              <List
                style={{ maxHeight: "175px", overflow: "auto" }}
                bordered
                loading={fileDeleteLoading || fileUploadLoading}
                itemLayout="horizontal"
                rowKey={(item, index) => item?.fileKey || index}
                dataSource={currentThreadState?.threadFiles}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        size="small"
                        onClick={() => handleDeleteFile(item.fileKey)}
                      >
                        <DeleteOutlined />
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon={<FileOutlined />} />}
                      title={<Typography>{item.fileName}</Typography>}
                    />
                  </List.Item>
                )}
              />
            </Flex>
            <Flex vertical style={{ width: "100%" }} gap="small">
              {showUrlInput ? (
                <Flex>
                  <Input
                    onPressEnter={handleAddUrl}
                    value={inputValues.url}
                    onChange={(e) =>
                      setInputValues({ ...inputValues, url: e.target.value })
                    }
                  />
                  <Button
                    icon={<PlusCircleOutlined />}
                    type="text"
                    onClick={handleAddUrl}
                  ></Button>
                  <Button
                    icon={<CloseCircleOutlined />}
                    type="text"
                    danger
                    onClick={handleCloseUrlInput}
                  ></Button>
                </Flex>
              ) : (
                <Button
                  style={{ width: "fit-content" }}
                  icon={<PlusCircleOutlined />}
                  onClick={() => setShowUrlInput(true)}
                >
                  Add URL
                </Button>
              )}
              <List
                bordered
                // loading={updateUrlListLoading}
                itemLayout="horizontal"
                dataSource={currentThreadState?.threadUrls}
                rowKey={(item, index) => item || index}
                style={{ maxHeight: "175px", overflow: "auto" }}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        size="small"
                        onClick={() => handleDeleteUrl(item)}
                      >
                        <DeleteOutlined />
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta title={item} />
                  </List.Item>
                )}
              />
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default ThreadSettingsForm;
