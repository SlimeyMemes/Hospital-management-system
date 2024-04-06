import { Table, Button, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Dragger } = Upload;
const MedicalRecords = () => {
  const [fileList, setFileList] = useState([]);

  const uploadProps = {
    name: "file",
    action: "api/v1/user/upload",
    onChange(info) {
      if (info.file.status !== "uploading") {
        setFileList([...fileList, info.file]);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} has been uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} upload has failed`);
      }
    },
    beforeUpload(file) {
      if (file.type !== "application/pdf") {
        message.error("Please Upload Only PDF files");
        return Upload.LIST_IGNORE;
      }
      return true;
    },
  };
  const col = [
    {
      title: "S.No",
      dataIndex: "sno",
    },
    {
      title: "File Name",
      dataIndex: "filename",
    },
    {
      title: "Remove",
      render: () => {
        return (
          <Button type="primary" danger>
            Remove ?
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <h2>Your Current Records</h2>
      <Table columns={col}></Table>
      <br />
      <h3>Upload a new File</h3>
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload <br />
          (Only PDFs) must be {"<16MB"}
        </p>
      </Dragger>
    </div>
  );
};

export default MedicalRecords;
