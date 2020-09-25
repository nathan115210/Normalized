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
      uploadButtonText="Upload cta"
      uploadDisclaimer="The limitations of upload file size and types"
      action="https://run.mocky.io/v3/17334c6b-0c04-4f01-9033-eb145b34b5e4"
      onChange={action("changed")}
      defaultFileList={defaultFileList}
      onRemove={action("removed")}
      data={{ key: "value" }}
      headers={{ "X-Power-By": "normalized" }}
      accept=".jpg"
      multipleSelect={false}
    />
  );
};

storiesOf("Upload component", module).add("Upload", SimpleUpload);
