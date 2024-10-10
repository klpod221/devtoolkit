import React from "react";
import { toast } from "react-toastify";

import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MySelect from "@components/MySelect";

const CameraRecorder = () => {
  const [cameraState, setCameraState] = React.useState("idle"); // error, idle, camera_start, camera_stop, recording
  const [devices, setDevices] = React.useState({
    camera: [],
    microphone: [],
  });
  const [selectedDevice, setSelectedDevice] = React.useState({
    camera: "",
    microphone: "",
  });
  const [recordedChunks, setRecordedChunks] = React.useState([]);

  const videoRef = React.useRef();

  const grantPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoRef.current.srcObject = stream;
      setCameraState("camera_start");
    } catch (error) {
      console.error(error);
      setCameraState("error");
    }
  };

  React.useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();

        const cameraDevices = devices.filter(
          (device) => device.kind === "videoinput",
        );
        const microphoneDevices = devices.filter(
          (device) => device.kind === "audioinput",
        );

        setDevices({
          camera: cameraDevices,
          microphone: microphoneDevices,
        });
      } catch (error) {
        console.error(error);
        setCameraState("error");
      }
    };

    getDevices();
  }, []);

  React.useEffect(() => {
    const stream = navigator.mediaDevices.getUserMedia({
      video: selectedDevice.camera ? { deviceId: selectedDevice.camera } : true,
      audio: selectedDevice.microphone ? { deviceId: selectedDevice.microphone } : true,
    });

    videoRef.current.srcObject = stream;
  }, [selectedDevice]);

  const toggleCamera = () => {
    if (cameraState === "camera_start") {
      videoRef.current.pause();
      setCameraState("camera_stop");

      if (cameraState === "recording") toggleRecording();
    } else {
      videoRef.current.play();
      setCameraState("camera_start");
    }
  };

  const handleDataAvailable = React.useCallback(
    (e) => {
      if (e.data.size > 0) {
        setRecordedChunks((prev) => prev.concat(e.data));
      }
    },
    [setRecordedChunks],
  );

  // TODO: fix this function for recording video
  // const toggleRecording = () => {
  //   if (cameraState === "recording") {
  //     setCameraState("camera_start");
  //     return;
  //   }

  //   if (!MediaRecorder.isTypeSupported("video/webm")) {
  //     toast.error("Your browser does not support recording video");
  //     return;
  //   }

  //   setCameraState("recording");

  //   const stream = videoRef.current.srcObject;
  //   const recorder = new MediaRecorder(stream, {
  //     mimeType: "video/webm",
  //   });

  //   recorder.ondataavailable = handleDataAvailable;

  //   recorder.onstop = () => {
  //     setCameraState("camera_start");
  //     const blob = new Blob(recordedChunks, { type: "video/webm" });
  //     setRecordedChunks([]);
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "video.webm";
  //     a.click();
  //     URL.revokeObjectURL(url);
  //   };

  //   recorder.start();
  // };

  return (
    <MyCard>
      <MyCard.Header
        title="Camera Recorder"
        helper="Record video from camera"
      />

      {cameraState === "error" && (
        <div className="flex flex-col items-center justify-center">
          <p className="mb-1 text-red-500">
            Failed to grant permission or your device does not support!
          </p>
          <MyButton onClick={() => grantPermission()}>Try Again</MyButton>
        </div>
      )}

      {cameraState === "idle" && (
        <div className="flex flex-col items-center justify-center">
          <p className="mb-1">
            You need to grant permission to use your camera and microphone
          </p>
          <MyButton onClick={() => grantPermission()}>
            Grant Permission
          </MyButton>
        </div>
      )}

      {cameraState !== "error" && cameraState !== "idle" && (
        <>
          <MySelect
            label="Select Camera"
            value={selectedDevice.camera}
            onChange={(value) =>
              setSelectedDevice({ ...selectedDevice, camera: value })
            }
            sizing="md"
          >
            {devices.camera.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || "Unknown Camera"}
              </option>
            ))}
          </MySelect>

          <MySelect
            label="Select Microphone"
            value={selectedDevice.microphone}
            onChange={(value) =>
              setSelectedDevice({ ...selectedDevice, microphone: value })
            }
            sizing="md"
          >
            {devices.microphone.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || "Unknown Microphone"}
              </option>
            ))}
          </MySelect>

          <div className="flex justify-center space-x-4">
            <MyButton
              onClick={() => toggleCamera()}
              className={
                cameraState === "camera_start" ? "bg-red-500" : "bg-green-500"
              }
            >
              {cameraState === "camera_start" ? "Stop Camera" : "Start Camera"}
            </MyButton>

            {/* <MyButton onClick={() => toggleRecording()}>
              {cameraState === "recording"
                ? "Stop Recording"
                : "Start Recording"}
            </MyButton> */}
          </div>
        </>
      )}

      <video
        ref={videoRef}
        className={`w-full h-96 ${cameraState === "recording" || cameraState === "camera_start" ? "block" : "hidden"}`}
        autoPlay
        controls
      ></video>
    </MyCard>
  );
};

CameraRecorder.title = "Camera Recorder";
export default CameraRecorder;
