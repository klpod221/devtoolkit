import React from "react";
import MyFileInput from "@components/MyFileInput";
import MyCard from "@components/MyCard";
import TwoColumnComponent from "@components/TwoColumnComponent";
import MyButton from "@components/MyButton";
import MyImage from "@components/MyImage";
import { MdDelete } from "react-icons/md";
import { AiOutlineCloudUpload, AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const Uploader = () => {
  const [queueList, setQueueList] = React.useState([]);
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [listRequest, setListRequest] = React.useState([]);

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
    return size > 1024 * 1024 * 1024
      ? `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`
      : size > 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(2)} MB`
      : size > 1024
      ? `${(size / 1024).toFixed(2)} KB`
      : `${size} bytes`;
  };

  const uploadFile = (queue, notify = true) => {
    queue.status = "uploading";
    queue.startTime = new Date().getTime();
    setQueueList([...queueList]);

    const file = queue.file;
    const uploadUrl = "https://up1.fileditch.com/upload.php";

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

  const copyUrl = (url) => () => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  React.useEffect(() => {
    const localFiles = JSON.parse(localStorage.getItem("uploadedFiles"));

    if (localFiles) {
      setUploadedFiles(localFiles);
    }
  }, []);

  React.useEffect(() => {
    if (uploadedFiles.length > 0) {
      localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
    }
  }, [uploadedFiles]);

  return (
    <TwoColumnComponent leftWidth={70}>
      <TwoColumnComponent.LeftContent>
        <MyCard.Header
          title="Upload File"
          helper={`Your files will be uploaded to <a class='underline hover:opacity-75 transition-all' href='https://fileditch.com/'>FileDitch</a> (max 5GB per file for forever storage and 15GB per file for 72 hours storage)`}
        />

        <div className="flex flex-col gap-4 mb-4">
          <MyFileInput onChange={onChange} />
        </div>

        <MyCard.Header title="Queue List">
          <div className="flex gap-2">
            <MyButton
              size={"sm"}
              className="py-0"
              color="red"
              onClick={() => setQueueList([])}
            >
              <MdDelete className="h-5 w-5" />
              Clear Queue
            </MyButton>

            <MyButton size={"sm"} className="py-0" onClick={uploadAll}>
              <AiOutlineCloudUpload className="h-5 w-5 mr-1" />
              Upload All
            </MyButton>
          </div>
        </MyCard.Header>

        <ul className="flex flex-col w-full gap-4 overflow-y-auto">
          {queueList.map((queue, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
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
                    { fileSizeFormat(queue.file.size) }
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
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
                <div className="flex items-center gap-2">
                  {queue.progress !== undefined && (
                    <div className="text-xs text-gray-500 dark:text-dark-text-secondary">
                      {queue.progress.toFixed(2)}%
                    </div>
                  )}

                  {queue.uploadSpeed !== undefined && (
                    <div className="text-xs text-gray-500 dark:text-dark-text-secondary">
                      {queue.uploadSpeed > 1024 * 1024
                        ? `${(queue.uploadSpeed / (1024 * 1024)).toFixed(
                            2
                          )} MB/s`
                        : `${(queue.uploadSpeed / 1024).toFixed(2)} KB/s`}
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
      </TwoColumnComponent.LeftContent>
      <TwoColumnComponent.RightContent>
        <MyCard.Header
          title="Uploaded Files"
          helper="Your uploaded files will be listed here (local storage)"
        >
          <MyButton
            size={"sm"}
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

        <ul className="flex flex-col w-full gap-4 overflow-y-auto">
          {uploadedFiles
            .slice(0)
            .reverse()
            .map((file, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
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
                      onClick={copyUrl(file.url)}
                    >
                      {file.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-dark-text-secondary">
                      { fileSizeFormat(file.size) }
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
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
      </TwoColumnComponent.RightContent>
    </TwoColumnComponent>
  );
};

Uploader.title = "File Uploader";
export default Uploader;
