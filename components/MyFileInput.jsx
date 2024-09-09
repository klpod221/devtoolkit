import React from "react";
import { FileInput, Label } from "flowbite-react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const MyFileInput = ({ onChange = () => {}, multiple = true, type = "image", placeholder = null }) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [message, setMessage] = React.useState(placeholder);
  const [id, setId] = React.useState(null);

  const onFileChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    onChange(fileArray);
  };

  React.useEffect(() => {
    const dropHandler = (e) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const fileArray = Array.from(files);
        onChange(fileArray);
      }
    };

    const dragOverHandler = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const dragLeaveHandler = (e) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const dropZones = document.querySelectorAll(".dropzone-file");

    dropZones.forEach((dropZone) => {
      dropZone.addEventListener("drop", dropHandler);
      dropZone.addEventListener("dragover", dragOverHandler);
      dropZone.addEventListener("dragleave", dragLeaveHandler);
    });

    return () => {
      dropZones.forEach((dropZone) => {
        dropZone.removeEventListener("drop", dropHandler);
        dropZone.removeEventListener("dragover", dragOverHandler);
        dropZone.removeEventListener("dragleave", dragLeaveHandler);
      });
    };
  }, [onChange]);

  React.useEffect(() => {
    if (placeholder) {
      setMessage(placeholder);
    } else if (type === "image" && multiple) {
      setMessage("You can upload multiple images (jpg, png, svg, etc.)");
    } else if (type === "image" && !multiple) {
      setMessage("You can upload an image (jpg, png, svg, etc.)");
    } else {
      setMessage("You can upload your file here");
    }
  }, [placeholder, type, multiple]);

  React.useEffect(() => {
    setId(Math.random().toString(36).substr(2, 9));
  }, []);

  return (
    <Label
      htmlFor={`dropzone-file-${id}`}
      className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 hover:border-gray-500 hover:bg-gray-100 dark:border-dark-secondary dark:bg-dark dark:hover:border-dark-text-secondary dark:hover:bg-dark-secondary relative transition-all duration-300 ease-in-out dropzone-file ${
        isDragging
          ? "border-gray-500 bg-gray-100 dark:border-dark-text-secondary dark:bg-dark-secondary"
          : ""
      }`}
    >
      <div className="flex flex-col items-center justify-center pb-6 pt-5">
        <AiOutlineCloudUpload className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          {isDragging ? (
            <span className="font-semibold">Drop here</span>
          ) : (
            <>
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </>
          )}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {message}
        </p>
      </div>
      <FileInput
        id={`dropzone-file-${id}`}
        multiple={multiple}
        accept={`${type === "image" ? "image/*" : "*/*"}`}
        onChange={onFileChange}
        className="w-full h-full absolute top-0 left-0 opacity-0"
      />
    </Label>
  );
};

export default MyFileInput;
