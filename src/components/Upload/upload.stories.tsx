import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Upload, UploadFile } from "./Upload";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";

const simpleUpload = () => (
  <Upload
    action="https://run.mocky.io/v3/17334c6b-0c04-4f01-9033-eb145b34b5e4"
    onChange={action("changed")}
    onSuccess={action("success")}
    onProgress={action("progress")}
    onRemove={action("removed")}
  >
    <Button size="lg" btnType="primary">
      <Icon icon="upload" /> Click to upload
    </Button>
  </Upload>
);

const uploadStatus = () => {
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
  return (
    <Upload
      action="https://run.mocky.io/v3/17334c6b-0c04-4f01-9033-eb145b34b5e4"
      onChange={action("changed")}
      defaultFileList={defaultFileList}
      onRemove={action("removed")}
      data={{ key: "value" }}
      headers={{ "X-Power-By": "normalized" }}
      accept=".jpg"
      multipleSelect={false}
    >
      <Button size="lg" btnType="primary">
        Upload
      </Button>
    </Upload>
  );
};

const checkUpload = () => {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert("file too big");
      return false;
    }
    return true;
  };
  return (
    <>
      {/* <h4>Could check upload file before uploading, for example file size</h4>
      <br /> */}
      <Upload
        action="https://run.mocky.io/v3/17334c6b-0c04-4f01-9033-eb145b34b5e4"
        onChange={action("changed")}
        beforeUpload={checkFileSize}
      >
        <Button size="lg" btnType="primary">
          <Icon icon="upload" /> Less than 50Kb!
        </Button>
      </Upload>
    </>
  );
};
const textCheck = `
### Code sample
~~~javascript
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false;
  }
  return true;
}
return (
  <Upload
    action="https://run.mocky.io/v3/17334c6b-0c04-4f01-9033-eb145b34b5e4"
    onChange={action('changed')}
    beforeUpload={checkFileSize}
  >
    <Button size="lg" btnType="primary"><Icon icon="upload" /> 不能传大于50Kb！ </Button>
  </Upload>  
)
~~~
`;
const dragUpload = () => (
  <Upload
    action="https://run.mocky.io/v3/17334c6b-0c04-4f01-9033-eb145b34b5e4"
    onChange={action("changed")}
    onRemove={action("removed")}
    name="fileName"
    multipleUpload
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br />
    <br />
    <p>Click or drag to this area to upload</p>
  </Upload>
);

storiesOf("Upload component", module)
  .add("Upload", simpleUpload)
  .add("Upload status", uploadStatus)
  .add("Check before upload", checkUpload, {
    info: { source: false, text: textCheck },
  })
  .add("Drag upload", dragUpload);
