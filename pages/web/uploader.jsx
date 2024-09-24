import React from "react";
import { toast } from "react-toastify";

import copyToClipboard from "@utils/copyToClipboard";

import TwoColumn from "@components/TwoColumn";
import MyFileInput from "@components/MyFileInput";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyImage from "@components/MyImage";
import MySelect from "@components/MySelect";

import { MdDelete } from "react-icons/md";
import { AiOutlineCloudUpload, AiOutlineCloseCircle } from "react-icons/ai";

const Uploader = () => {
  const [queueList, setQueueList] = React.useState([]);
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [listRequest, setListRequest] = React.useState([]);
  const [uploadType, setUploadType] = React.useState("temp"); // temp, forever

  const onChange = (files) => {
    const fileList = [];
    files.forEach((file) => {
      if (queueList.find((f) => f.name === file.name)) {
        return;
      }

      const queue = {
        file,
        status: "queued",
      };

      fileList.push(queue);
    });

    setQueueList((queueList) => [...queueList, ...fileList]);
  };

  const fileSizeFormat = (size) => {
    return size > 1000 * 1000 * 1000
      ? `${(size / (1000 * 1000 * 1000)).toFixed(2)} GB`
      : size > 1000 * 1000
      ? `${(size / (1000 * 1000)).toFixed(2)} MB`
      : size > 1000
      ? `${(size / 1000).toFixed(2)} KB`
      : `${size} bytes`;
  };

  const getRemainingTime = (file) => {
    if (file.uploadType === "temp") {
      // show how much time left (like 10hours 30mins)
      const uploadedAt = new Date(file.uploadedAt).getTime();
      const now = new Date().getTime();
      const remainingTime = 72 * 60 * 60 * 1000 - (now - uploadedAt);

      const hours = Math.floor(remainingTime / (60 * 60 * 1000));
      const mins = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));

      return `${hours} hours ${mins} mins`;
    }

    return "Forever";
  };

  const uploadFile = (queue, notify = true) => {
    const file = queue.file;

    if (
      (uploadType === "temp" && file.size > 15 * 1000 * 1000 * 1000) ||
      (uploadType === "forever" && file.size > 5 * 1000 * 1000 * 1000)
    ) {
      toast.error(
        `File size of ${file.name} exceeds the limit (${
          uploadType === "temp" ? "15GB" : "5GB"
        })`
      );
      return;
    }

    queue.status = "uploading";
    queue.startTime = new Date().getTime();
    setQueueList([...queueList]);

    const uploadUrl =
      uploadType === "temp"
        ? "https://up1.fileditch.com/temp/upload.php"
        : "https://up1.fileditch.com/upload.php";

    const xhr = new XMLHttpRequest();

    xhr.open("POST", uploadUrl, true);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const uploadedBytes = e.loaded;
        const totalBytes = e.total;

        const elapsedTime =
          (Date.now() - (queue.startTime || Date.now())) / 1000;
        const uploadSpeed = uploadedBytes / elapsedTime;
        const remainingBytes = totalBytes - uploadedBytes;
        const remainingTime = remainingBytes / uploadSpeed;

        queue.progress = (uploadedBytes / totalBytes) * 100;
        queue.uploadSpeed = uploadSpeed;
        queue.remainingTime = new Date(remainingTime * 1000)
          .toISOString()
          .substr(11, 8);

        setQueueList((queueList) => [...queueList]);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const uploadedFile = {
          name: file.name,
          type: file.type,
          size: file.size,
          uploadType,
          uploadedAt: new Date().toISOString(),
          url: response.files[0].url,
        };

        setQueueList((queueList) => queueList.filter((q) => q !== queue));
        setUploadedFiles((uploadedFiles) => [...uploadedFiles, uploadedFile]);
      }
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          queue.status = "uploaded";
          setQueueList((queueList) => [...queueList]);
          if (notify) toast.success("File uploaded successfully");
        } else {
          queue.status = "queued";
          setQueueList((queueList) => [...queueList]);
          toast.error("Failed to upload file");
        }
      }
    };

    xhr.onerror = () => {
      queue.status = "queued";
      setQueueList((queueList) => [...queueList]);
      toast.error("Failed to upload file");
    };

    const formData = new FormData();
    formData.append("files[]", file);

    queue.startTime = Date.now();
    setQueueList((queueList) => [...queueList]);

    xhr.send(formData);

    setListRequest((listRequest) => [...listRequest, { xhr, queue }]);
  };

  const uploadAll = () => {
    queueList.forEach((queue) => {
      if (queue.status === "queued") {
        uploadFile(queue, false);
      }
    });
  };

  const closeUpload = (queue) => () => {
    const request = listRequest.find((r) => r.queue === queue);
    if (request) {
      request.xhr.abort();
      setListRequest((listRequest) => listRequest.filter((r) => r !== request));

      queue.progress = 0;
      queue.uploadSpeed = 0;
      queue.remainingTime = 0;
      queue.startTime = 0;
      setQueueList((queueList) => [...queueList]);
    }

    queue.status = "queued";
    setQueueList((queueList) => [...queueList]);
  };

  React.useEffect(() => {
    const localFiles = JSON.parse(localStorage.getItem("uploadedFiles"));

    if (localFiles) {
      const now = new Date().getTime();
      const filteredFiles = localFiles.filter((file) => {
        if (file.uploadType === "temp") {
          const uploadedAt = new Date(file.uploadedAt).getTime();
          const remainingTime = 72 * 60 * 60 * 1000 - (now - uploadedAt);
          return remainingTime > 0;
        }

        return true;
      });

      setUploadedFiles(filteredFiles);
    }
  }, []);

  React.useEffect(() => {
    if (uploadedFiles.length > 0) {
      localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
    }
  }, [uploadedFiles]);

  return (
    <TwoColumn leftWidth={70}>
      <TwoColumn.Left>
        <MyCard.Header
          title="Upload File"
          helper={`Your files will be uploaded to <a class='underline hover:opacity-75 transition-all' href='https://fileditch.com/'>FileDitch</a> (max 5GB per file for forever storage and 15GB per file for 72 hours storage)`}
        />

        <div className="flex flex-col mb-4 space-x-4">
          <MyFileInput onChange={onChange} />
        </div>

        <MyCard.Header title="Queue List">
          <div className="flex space-x-2">
            <MySelect value={uploadType} onChange={setUploadType} sizing="sm">
              <option value="temp">72 Hours</option>
              <option value="forever">Forever</option>
            </MySelect>

            <MyButton
              className="py-0"
              color="red"
              onClick={() => setQueueList([])}
            >
              <MdDelete className="h-5 w-5" />
              Clear Queue
            </MyButton>

            <MyButton className="py-0" onClick={uploadAll}>
              <AiOutlineCloudUpload className="h-5 w-5 mr-1" />
              Upload All
            </MyButton>
          </div>
        </MyCard.Header>

        <ul className="flex flex-col w-full space-y-4 overflow-y-auto">
          {queueList.map((queue, index) => (
            <li key={index} className="flex items-center space-x-2 justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {queue.file.type.includes("image") ? (
                    <MyImage
                      src={URL.createObjectURL(queue.file)}
                      className="object-cover w-full h-full"
                      download={false}
                      preview={false}
                    />
                  ) : (
                    <div className="text-gray-600 text-sm">
                      {queue.file.name.split(".").pop()}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold dark:text-dark-text">
                    {queue.file.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-dark-text-secondary">
                    {fileSizeFormat(queue.file.size)}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <MyButton
                  size={"xs"}
                  color="red"
                  className="py-0"
                  onClick={() =>
                    setQueueList(queueList.filter((_, i) => i !== index))
                  }
                >
                  <MdDelete className="h-5 w-5" />
                </MyButton>

                <MyButton
                  size={"xs"}
                  className="py-0"
                  onClick={() => uploadFile(queue)}
                >
                  <AiOutlineCloudUpload className="h-5 w-5" />
                </MyButton>
              </div>

              {queue.status === "uploading" && (
                <div className="flex items-center space-x-2">
                  {queue.progress !== undefined && (
                    <div className="text-xs text-gray-500 dark:text-dark-text-secondary">
                      {queue.progress.toFixed(2)}%
                    </div>
                  )}

                  {queue.uploadSpeed !== undefined && (
                    <div className="text-xs text-gray-500 dark:text-dark-text-secondary">
                      {queue.uploadSpeed > 1000 * 1000
                        ? `${(queue.uploadSpeed / (1000 * 1000)).toFixed(
                            2
                          )} MB/s`
                        : `${(queue.uploadSpeed / 1000).toFixed(2)} KB/s`}
                    </div>
                  )}

                  {queue.remainingTime !== undefined && (
                    <div className="text-xs text-gray-500 dark:text-dark-text-secondary">
                      {queue.remainingTime}
                    </div>
                  )}

                  <MyButton
                    size={"xs"}
                    className="py-0"
                    onClick={closeUpload(queue)}
                  >
                    <AiOutlineCloseCircle className="h-5 w-5" />
                  </MyButton>
                </div>
              )}
            </li>
          ))}
        </ul>
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header
          title="Uploaded Files"
          helper="Your uploaded files will be listed here (local storage)"
        >
          <MyButton
            className="py-0"
            color="red"
            onClick={() => {
              setUploadedFiles([]);
              localStorage.removeItem("uploadedFiles");
            }}
          >
            <MdDelete className="h-5 w-5" />
            Delete All
          </MyButton>
        </MyCard.Header>

        <ul className="flex flex-col w-full space-y-4 overflow-y-auto">
          {uploadedFiles
            .slice(0)
            .reverse()
            .map((file, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {file.type.includes("image") ? (
                      <MyImage
                        src={file.url}
                        className="object-cover w-full h-full"
                        download={false}
                        preview={false}
                      />
                    ) : (
                      <div className="text-gray-600 text-sm">
                        {file.name.split(".").pop()}
                      </div>
                    )}
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold dark:text-dark-text cursor-pointer"
                      onClick={() => copyToClipboard(file.url)}
                    >
                      {file.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-dark-text-secondary">
                      {fileSizeFormat(file.size)} - {getRemainingTime(file)}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <MyButton
                    size={"xs"}
                    color="red"
                    className="py-0"
                    onClick={() =>
                      setUploadedFiles(
                        uploadedFiles.filter((_, i) => i !== index)
                      )
                    }
                  >
                    <MdDelete className="h-5 w-5" />
                  </MyButton>
                </div>
              </li>
            ))}
        </ul>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

Uploader.title = "File Uploader";
export default Uploader;
