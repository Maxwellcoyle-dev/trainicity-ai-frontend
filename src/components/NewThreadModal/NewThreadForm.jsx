import React, { useState, useContext, useEffect } from "react";

// Context & Actions
import { AppStateContext, AppDispatchContext } from "../../state/AppContext";
import { HIDE_NEW_THREAD_MODAL } from "../../state/actions/actionTypes";

// Custom styles
import styles from "./NewThreadForm.module.css";

// Custom Hooks
import useFileUpload from "../../hooks/useFileUpload";
import useDeleteFile from "../../hooks/useDeleteFile";
import useUpdateThreadUrls from "../../hooks/useUpdateThreadUrls";

// Ant Design
import {
  Avatar,
  Button,
  List,
  Flex,
  Form,
  Input,
  Typography,
  Upload,
  Space,
} from "antd";
import {
  UploadOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  FileOutlined,
} from "@ant-design/icons";
const { Title, Text } = Typography;
const { TextArea } = Input;

const NewThreadForm = ({ mode, handleCreateThread }) => {
  // build an interchangable create new trhead form
  // optional data points can be input by user based on state.mode.mode
  // Data point options: Title, instructions, files, urls, large text input
  // Title and instructions are always present
  // Files and urls and large text input are optional

  const [titleValue, setTitleValue] = useState("");
  const [instructionsValue, setInstructionsValue] = useState("");
  const [fileList, setFileList] = useState([]);
  const [urlInput, setUrlInput] = useState("");
  const [urlList, setUrlList] = useState([]);
  const [textContextValue, setTextContextValue] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  //   Global State - threadID / mode
  const { threadData } = useContext(AppStateContext);

  //   Dispatch Global State Updates
  const dispatch = useContext(AppDispatchContext);

  // destructure threadID + currentThreadFiles + currentThreadUrls + currentMode from threadData
  const threadID = threadData?.currentThread?.threadID;
  const currentThreadFiles = threadData?.currentThread?.files;
  const currentThreadUrls = threadData?.currentThread?.urls;

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

  const handleStartThread = () => {
    handleCreateThread(urlList, titleValue, instructionsValue);
  };

  useEffect(() => {
    console.log(fileList);
  }, [fileList]);

  return (
    <Form className={styles.form}>
      {/* Title / Instructions */}
      <Title level={3}>New {mode}</Title>
      <Flex vertical gap="middle" className={styles.flexContainer}>
        <Flex vertical gap="small" align="flex-start" style={{ width: "100%" }}>
          <Text>Give your thread a title. (Optional)</Text>
          <Input
            style={{ width: "50%" }}
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
        </Flex>
        <Flex vertical gap="small" style={{ width: "100%" }}>
          <Text>
            Give some initial instructions / Describe your task. (Optional)
          </Text>
          <TextArea
            value={instructionsValue}
            style={{ width: "100%" }}
            onChange={(e) => setInstructionsValue(e.target.value)}
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        </Flex>

        {/* Files / Urls / large text paste area */}

        {/* Conditionally return jsx */}

        {/* Files */}
        {mode === "Doc QA Chat" && (
          <Flex
            style={{ width: "100%" }}
            justify="space-between"
            gap="middle"
            vertical
          >
            <Flex vertical gap="small" style={{ width: "100%" }}>
              <Upload
                accept=".pdf,.doc,.docx,.txt"
                multiple={true}
                onChange={handleFileListChange}
                fileList={fileList}
              >
                <Button icon={<UploadOutlined />}>Add File</Button>
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
            <Flex vertical gap="small" style={{ width: "100%" }}>
              {showUrlInput ? (
                <Space>
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
                </Space>
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
        <Button
          onClick={handleStartThread}
          type="primary"
          style={{ marginTop: "30px", width: "fit-content" }}
        >
          Start Thread
        </Button>
      </Flex>
    </Form>
  );
};

export default NewThreadForm;
