import React from "react";
import { toast } from "react-toastify";

import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MySelect from "@components/MySelect";

const CameraRecorder = () => {
  const [cameraState, setCameraState] = React.useState("idle"); // idle, error, camera_start, camera_stop, recording
  const [devices, setDevices] = React.useState({
    camera: [],
    microphone: [],
  });
  const [selectedDevice, setSelectedDevice] = React.useState({
    camera: "",
    microphone: "",
  });

  const videoRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const recordedChunksRef = React.useRef([]);
  const streamRef = React.useRef(null);

  const stopCurrentStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const populateDevices = async () => {
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const cameraDevices = allDevices.filter(
        (device) => device.kind === "videoinput",
      );
      const microphoneDevices = allDevices.filter(
        (device) => device.kind === "audioinput",
      );

      setDevices({
        camera: cameraDevices,
        microphone: microphoneDevices,
      });

      setSelectedDevice((prev) => ({
        camera: prev.camera || (cameraDevices[0]?.deviceId ?? ""),
        microphone: prev.microphone || (microphoneDevices[0]?.deviceId ?? ""),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const startStreamWithConstraints = async (camId, micId) => {
    stopCurrentStream();
    try {
      const constraints = {
        video: camId ? { deviceId: { exact: camId } } : true,
        audio: micId ? { deviceId: { exact: micId } } : true,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setCameraState("camera_start");
    } catch (error) {
      console.error("Failed to start media stream:", error);
      toast.error("Failed to start camera/microphone");
      setCameraState("error");
    }
  };

  const grantPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setCameraState("camera_start");
      await populateDevices();
    } catch (error) {
      console.error(error);
      setCameraState("error");
      toast.error("Permission denied or no camera/microphone found");
    }
  };

  const handleDeviceChange = async (type, deviceId) => {
    setSelectedDevice((prev) => {
      const updated = { ...prev, [type]: deviceId };
      startStreamWithConstraints(updated.camera, updated.microphone);
      return updated;
    });
  };

  const toggleCamera = () => {
    if (cameraState === "recording") {
      toggleRecording();
    }

    if (cameraState === "camera_start") {
      if (streamRef.current) {
        streamRef.current.getVideoTracks().forEach((track) => {
          track.enabled = false;
        });
      }
      setCameraState("camera_stop");
    } else {
      if (streamRef.current) {
        streamRef.current.getVideoTracks().forEach((track) => {
          track.enabled = true;
        });
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
        setCameraState("camera_start");
      } else {
        startStreamWithConstraints(selectedDevice.camera, selectedDevice.microphone);
      }
    }
  };

  const toggleRecording = () => {
    if (cameraState === "recording") {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      return;
    }

    if (!streamRef.current) {
      toast.error("Camera stream is not active");
      return;
    }

    if (typeof MediaRecorder === "undefined") {
      toast.error("Your browser does not support MediaRecorder");
      return;
    }

    const mimeTypes = ["video/webm;codecs=vp9", "video/webm", "video/mp4"];
    const supportedMime = mimeTypes.find((type) => MediaRecorder.isTypeSupported(type)) || "";

    try {
      recordedChunksRef.current = [];
      const options = supportedMime ? { mimeType: supportedMime } : undefined;
      const recorder = new MediaRecorder(streamRef.current, options);

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        setCameraState("camera_start");
        const blobType = supportedMime || "video/webm";
        const blob = new Blob(recordedChunksRef.current, { type: blobType });
        recordedChunksRef.current = [];
        if (blob.size === 0) return;

        const url = URL.createObjectURL(blob);
        const ext = blobType.includes("mp4") ? "mp4" : "webm";
        const a = document.createElement("a");
        a.href = url;
        a.download = `recording-${Date.now()}.${ext}`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        toast.success("Recording saved!");
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setCameraState("recording");
    } catch (err) {
      console.error(err);
      toast.error("Failed to start recording: " + err.message);
    }
  };

  React.useEffect(() => {
    return () => {
      stopCurrentStream();
    };
  }, []);

  return (
    <MyCard>
      <MyCard.Header
        title="Camera Recorder"
        helper="Preview and record video from your webcam"
      />

      {cameraState === "error" && (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <p className="mb-3 text-red-500 dark:text-red-400 font-medium">
            Failed to access camera or microphone. Please check your browser permissions.
          </p>
          <MyButton onClick={grantPermission}>Try Again</MyButton>
        </div>
      )}

      {cameraState === "idle" && (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <p className="mb-3 text-gray-700 dark:text-gray-300">
            You need to grant permission to access your camera and microphone.
          </p>
          <MyButton onClick={grantPermission}>Grant Permission</MyButton>
        </div>
      )}

      {cameraState !== "error" && cameraState !== "idle" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MySelect
              label="Select Camera"
              value={selectedDevice.camera}
              onChange={(value) => handleDeviceChange("camera", value)}
            >
              {devices.camera.map((device, idx) => (
                <option key={device.deviceId || idx} value={device.deviceId}>
                  {device.label || `Camera ${idx + 1}`}
                </option>
              ))}
            </MySelect>

            <MySelect
              label="Select Microphone"
              value={selectedDevice.microphone}
              onChange={(value) => handleDeviceChange("microphone", value)}
            >
              {devices.microphone.map((device, idx) => (
                <option key={device.deviceId || idx} value={device.deviceId}>
                  {device.label || `Microphone ${idx + 1}`}
                </option>
              ))}
            </MySelect>
          </div>

          <div className="flex justify-center space-x-4">
            <MyButton
              onClick={toggleCamera}
              className={
                cameraState === "camera_start" ? "bg-amber-600 hover:bg-amber-700" : "bg-green-600 hover:bg-green-700"
              }
            >
              {cameraState === "camera_start" ? "Pause Camera" : "Resume Camera"}
            </MyButton>

            <MyButton
              onClick={toggleRecording}
              className={
                cameraState === "recording" ? "bg-red-600 hover:bg-red-700 animate-pulse" : "bg-blue-600 hover:bg-blue-700"
              }
            >
              {cameraState === "recording" ? "Stop Recording" : "Start Recording"}
            </MyButton>
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-center bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className={`w-full max-h-[500px] object-contain ${
            cameraState === "recording" || cameraState === "camera_start" ? "block" : "hidden"
          }`}
          autoPlay
          muted
          playsInline
        />
      </div>
    </MyCard>
  );
};

CameraRecorder.title = "Camera Recorder";
export default CameraRecorder;
