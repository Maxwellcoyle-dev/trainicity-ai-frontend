import React, { useState, useContext } from "react";

// Context & Actions
import { AppStateContext, AppDispatchContext } from "../../state/AppContext";
import { HIDE_NEW_THREAD_MODAL } from "../../state/actions/actionTypes";

// Custom Hooks
import useFileUpload from "../../hooks/useFileUpload";
import useDeleteFile from "../../hooks/useDeleteFile";

// Ant Design
import {
  Button,
  List,
  Flex,
  Form,
  Input,
  Typography,
  Upload,
  Space,
  Divider,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const NewThreadForm = ({ mode }) => {
  // build an interchangable create new trhead form
  // optional data points can be input by user based on state.mode.mode
  // Data point options: Title, instructions, files, urls, large text input
  // Title and instructions are always present
  // Files and urls and large text input are optional

  const [titleValue, setTitleValue] = useState("");
  const [instructionsValue, setInstructionsValue] = useState("");
  const [fileList, setFileList] = useState([]);
  const [urlList, setUrlList] = useState([]);
  const [textContextValue, setTextContextValue] = useState("");

  //   Global State - threadID / mode
  const { threadData } = useContext(AppStateContext);

  //   Dispatch Global State Updates
  const dispatch = useContext(AppDispatchContext);

  // destructure threadID + currentThreadFiles + currentMode from threadData
  const threadID = threadData?.currentThread?.threadID;
  const currentThreadFiles = threadData?.currentThread?.files;
  const currentMode = mode?.mode;

  //   import hooks useFileUpload, useUpdateThreadUrls
  const { uploadFile, fileUploadLoading } = useFileUpload();
  const { deleteFile, fileDeleteLoading, fileDeeleteError } = useDeleteFile();

  const handleDeleteFile = (fileKey) => {
    console.log("fileId", fileKey);
    deleteFile(fileKey, threadID);
  };

  return (
    <Form vertical style={{ paddingLeft: "30px", paddingRight: "30px" }}>
      {/* Title / Instructions */}
      <Title level={3}>{mode}</Title>
      <Flex
        vertical
        gap="small"
        align="flex-start"
        style={{ paddingTop: "16px" }}
      >
        <Text>Give your thread a title. (Optional)</Text>
        <Input
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
      </Flex>
      <Flex vertical gap="small" style={{ paddingTop: "16px" }}>
        <Text>
          Give some initial instructions / Describe your task. (Optional)
        </Text>
        <TextArea
          value={instructionsValue}
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
        <Flex vertical gap="small" style={{ paddingTop: "16px" }}>
          <Upload
            customRequest={({ file }) => uploadFile(file, threadID)}
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
      )}
    </Form>
  );
};

export default NewThreadForm;
