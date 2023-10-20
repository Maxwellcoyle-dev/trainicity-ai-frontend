import React, { useContext, useEffect, useState } from "react";

// Constext & State Management
import { AppDispatchContext, AppStateContext } from "../../state/AppContext";
import { HIDE_THREAD_SETTINGS_MODAL } from "../../state/actions/actionTypes";

// Custom Hooks
import useFileUpload from "../../hooks/useFileUpload";
import useDeleteFile from "../../hooks/useDeleteFile";
import useUpdateThreadUrls from "../../hooks/useUpdateThreadUrls";

// Ant Design
import {
  Avatar,
  Typography,
  Flex,
  Divider,
  Input,
  Upload,
  Button,
  List,
  Space,
} from "antd";
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

const StandardChat = ({
  titleValue,
  setTitleValue,
  instructionsValue,
  setInstructionsValue,
  currentMode,
  threadID,
  currentThreadFiles,
  currentThreadUrls,
  currentThreadTitle,
}) => {
  const [fileList, setFileList] = useState([]);
  const [urlInput, setUrlInput] = useState("");
  const [urlList, setUrlList] = useState([]);
  const [textContextValue, setTextContextValue] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  //   Global State - threadID / mode
  const { threadData } = useContext(AppStateContext);

  //   Dispatch Global State Updates
  const dispatch = useContext(AppDispatchContext);

  //   import hooks useFileUpload, useUpdateThreadUrls
  const { uploadFile, fileUploadLoading } = useFileUpload();
  const { deleteFile, fileDeleteLoading, fileDeeleteError } = useDeleteFile();
  const { updateThreadUrls, updateUrlListLoading, updateThreadUrlsError } =
    useUpdateThreadUrls();

  const handleFileListChange = (info) => {
    console.log(info.fileList);

    // Use originFileObj directly from the info.fileList objects
    const filesToUpload = info.fileList.map(
      (fileInfo) => fileInfo.originFileObj
    );

    // Upload array of files to s3
    uploadFile(filesToUpload, threadID);
  };

  const handleDeleteFile = (fileKey) => {
    console.log("fileId", fileKey);
    deleteFile(fileKey, threadID);
  };

  const handleDeleteUrl = (url) => {
    const newUrls = currentThreadUrls.filter((item) => item.url !== url);
    updateThreadUrls(newUrls, threadID);
    setUrlList(newUrls);
  };

  const handleAddUrl = () => {
    setUrlList([...urlList, urlInput]);
    setUrlInput("");
    setShowUrlInput(false);
  };

  const handleCloseUrlInput = () => {
    setShowUrlInput(false);
    setUrlInput("");
  };

  return (
    <Flex vertical gap="middle">
      <Flex vertical gap="small">
        <Flex
          style={{ width: "100%", paddingBottom: "16px" }}
          align="center"
          gap="small"
        >
          <Title level={3} style={{ margin: "0" }}>
            {currentThreadTitle}
          </Title>
          <SettingOutlined />
        </Flex>

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
      {currentMode === "Doc QA Chat" && (
        <Flex gap="middle">
          <Flex vertical style={{ width: "50%" }} gap="small">
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
              dataSource={currentThreadFiles}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button onClick={() => handleDeleteFile(item.fileKey)}>
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
          <Flex vertical style={{ width: "50%" }} gap="small">
            {showUrlInput ? (
              <Flex>
                <Input
                  onPressEnter={handleAddUrl}
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
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
              loading={updateUrlListLoading}
              itemLayout="horizontal"
              dataSource={urlList}
              style={{ maxHeight: "175px", overflow: "auto" }}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button onClick={() => handleDeleteUrl(item)}>
                      <DeleteOutlined />
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<FileOutlined />} />}
                    title={item}
                  />
                </List.Item>
              )}
            />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default StandardChat;
