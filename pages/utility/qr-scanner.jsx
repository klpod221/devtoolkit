import React, { useState, useRef, useEffect, useCallback } from "react";
import jsQR from "jsqr";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyFileInput from "@components/MyFileInput";
import ObjectOutput from "@components/ObjectOutput";
import { AiOutlineCamera, AiOutlineStop } from "react-icons/ai";

const QRCodeScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const streamRef = useRef(null);

  const [mode, setMode] = useState("idle"); // idle | camera | file
  const [result, setResult] = useState(null);

  const stopCamera = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setMode("idle");
  }, []);

  const scanFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      animFrameRef.current = requestAnimationFrame(scanFrame);
      return;
    }
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
      setResult({ text: code.data, source: "Camera" });
      stopCamera();
      return;
    }
    animFrameRef.current = requestAnimationFrame(scanFrame);
  }, [stopCamera]);

  const startCamera = async () => {
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setMode("camera");
      animFrameRef.current = requestAnimationFrame(scanFrame);
    } catch {
      alert("Cannot access camera. Please allow camera permission.");
    }
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          setResult({ text: code.data, source: "Image file" });
        } else {
          setResult({ text: "No QR code found in this image.", source: "Image file" });
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => () => stopCamera(), [stopCamera]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="QR Code Scanner" helper="Scan via camera or upload an image" />
        <div className="space-y-4 mt-4">
          <div className="flex gap-2">
            {mode === "camera" ? (
              <MyButton onClick={stopCamera} className="flex-1">
                <AiOutlineStop className="mr-2" /> Stop Camera
              </MyButton>
            ) : (
              <MyButton onClick={startCamera} className="flex-1">
                <AiOutlineCamera className="mr-2" /> Start Camera
              </MyButton>
            )}
          </div>

          <div className={`relative rounded-lg overflow-hidden bg-black ${mode === "camera" ? "block" : "hidden"}`} style={{ aspectRatio: "4/3" }}>
            <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
            {/* Targeting overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 border-2 border-cyan-400 rounded-lg opacity-75" />
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <div className="relative flex items-center">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-700" />
            <span className="mx-3 text-sm text-gray-500">or upload image</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-700" />
          </div>

          <MyFileInput
            accept="image/*"
            multiple={false}
            onChange={(file) => handleFileUpload(file)}
          />
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Result" helper="Decoded QR code content" />
        {result ? (
          <div className="mt-4 space-y-4">
            <ObjectOutput data={{ Source: result.source, Content: result.text }} beautifyKey={false} />
            {result.text.startsWith("http") && (
              <a
                href={result.text}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-cyan-500 hover:underline text-sm"
              >
                Open URL →
              </a>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full min-h-[200px] border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-500 mt-4">
            <p>Scan a QR code to see results.</p>
          </div>
        )}
      </TwoColumn.Right>
    </TwoColumn>
  );
};

QRCodeScanner.title = "QR Code Scanner";
export default QRCodeScanner;
