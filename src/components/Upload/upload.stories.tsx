import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Upload, UploadFile } from "./Upload";

const defaultFileList: UploadFile[] = [
  {
    uid: "123",
    size: 1234,
    name: "hello.md",
    status: "uploading",
    percent: 30,
  },
  { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
  { uid: "121", size: 1234, name: "eyiha.md", status: "error", percent: 30 },
];
const checkFileZSize = (file: File) => {
  if (Math.round(file.size / 1024) > 20000) {
    alert("file too big");
    return false;
  }
  return true;
};
const filePromise = (file: File) => {
  const newFile = new File([file], "new_name.docx", { type: file.type });
  return Promise.resolve(newFile);
};
const SimpleUpload = () => {
  return (
    <Upload
      action="https://run.mocky.io/v3/0278e822-1a48-4dcf-bef9-3a328ad6de79"
      onChange={action("changed")}
      defaultFileList={defaultFileList}
      onRemove={action("removed")}
    />
  );
};

storiesOf("Upload component", module).add("Upload", SimpleUpload);
