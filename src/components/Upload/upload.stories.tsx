import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Upload } from "./Upload";

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
      onProgress={action("progress")}
      onSuccess={action("success")}
      onError={action("error")}
    />
  );
};

storiesOf("Upload component", module).add("Upload", SimpleUpload);
