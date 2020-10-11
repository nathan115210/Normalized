import React, { FC, useRef, ChangeEvent, useState } from "react";
import axios from "axios";
import UploadList from "./UploadList";
import Button from "../Button/Button";
import DragContainer from "./DragContainer";
export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent: number;
  raw?: File;
  response?: any;
  error?: any;
}
export interface UploadProps {
  /**Upload address */
  action: string;
  /**List of uploaded files,*/
  defaultFileList?: UploadFile[];
  /** The function before uploading the file. The parameter is the uploaded file. If it returns false or Promise, the upload will stop. */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**The function when uploading files */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /**The function when the file is uploaded successfully */
  onSuccess?: (data: any, file: UploadFile) => void;
  /**The function when file upload fails */
  onError?: (err: any, file: UploadFile) => void;
  /** The function when the file status changes, it will be called when the upload succeeds or fails */
  onChange?: (file: UploadFile) => void;
  /**The function when removing files from the file list */
  onRemove?: (file: UploadFile) => void;
  /**Set the upload request header */
  headers?: { [key: string]: any };
  /**Uploaded file's field name */
  name?: string;
  /**Additional parameters when uploading */
  data?: { [key: string]: any };
  /**Support sending cookie credential information */
  withCredentials?: boolean;
  /**Optional parameter, accept upload file type */
  accept?: string;
  /**Whether to support multiple selection files */
  multipleSelect?: boolean;
  /** Whether to support drag and drop upload */
  drag?: boolean;
}

/**
 * Upload files by clicking or dragging
 * ### Usage
 *
 * ~~~js
 * import { Upload } from 'normalized'
 * ~~~
 */
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multipleSelect,
    children,
    drag,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };
  const post = (file: File) => {
    const file_ext = file.name.substring(file.name.lastIndexOf(".") + 1);
    const file_name: string =
      file.name.length > 20 ? file.name.substring(0, 16) + file_ext : file.name;
    let _file: UploadFile = {
      uid: Date.now() + file_name,
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: "uploading" });
            _file.status = "uploading";
            _file.percent = percentage;
            if (onProgress) {
              onProgress(percentage, _file);
            }
          }
        },
      })
      .then((resp) => {
        updateFileList(_file, { status: "success", response: resp.data });
        _file.status = "success";
        _file.response = resp.data;
        if (onSuccess) {
          onSuccess(resp.data, _file);
        }
        if (onChange) {
          onChange(_file);
        }
      })
      .catch((err) => {
        updateFileList(_file, { status: "error", error: err });
        _file.status = "error";
        _file.error = err;
        if (onError) {
          onError(err, _file);
        }
        if (onChange) {
          onChange(_file);
        }
      });
  };

  return (
    <div className="normalized-upload">
      <div
        className="normalized-upload-input"
        style={{ display: "inline-block" }}
        onClick={handleClick}
      >
        {drag ? (
          <DragContainer
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </DragContainer>
        ) : (
          children
        )}
        <input
          className="normalized-file-input"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multipleSelect}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

Upload.defaultProps = {
  name: "file",
  multipleSelect: true,
  accept: "*",
};
export default Upload;
