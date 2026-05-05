import React, { useState, useRef, useEffect, useCallback } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyFileInput from "@components/MyFileInput";
import ObjectOutput from "@components/ObjectOutput";
import { AiOutlineCamera, AiOutlineStop } from "react-icons/ai";

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const readerRef = useRef(null);

  const [mode, setMode] = useState("idle");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const stopCamera = useCallback(() => {
    if (readerRef.current) {
      readerRef.current.reset();
    }
    setMode("idle");
  }, []);

  const startCamera = async () => {
    setResult(null);
    setError("");
    try {
      const reader = new BrowserMultiFormatReader();
      readerRef.current = reader;
      setMode("camera");
      await reader.decodeFromVideoDevice(null, videoRef.current, (res, err) => {
        if (res) {
          setResult({ text: res.getText(), format: res.getBarcodeFormat().toString(), source: "Camera" });
          stopCamera();
        }
        if (err && err.name !== "NotFoundException") {
          console.error(err);
        }
      });
    } catch (e) {
      setError("Cannot access camera. Please allow camera permission.");
      setMode("idle");
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setResult(null);
    setError("");
    try {
      const reader = new BrowserMultiFormatReader();
      const url = URL.createObjectURL(file);
      const res = await reader.decodeFromImageUrl(url);
      URL.revokeObjectURL(url);
      setResult({ text: res.getText(), format: res.getBarcodeFormat().toString(), source: "Image file" });
    } catch {
      setError("No barcode found in this image.");
    }
  };

  useEffect(() => () => stopCamera(), [stopCamera]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Barcode Scanner" helper="Scan barcodes via camera or upload an image" />
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
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-24 border-2 border-cyan-400 rounded opacity-75" />
            </div>
          </div>

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

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Result" helper="Decoded barcode content" />
        {result ? (
          <div className="mt-4">
            <ObjectOutput data={{ Format: result.format, Source: result.source, Content: result.text }} beautifyKey={false} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full min-h-[200px] border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-500 mt-4">
            <p>Scan a barcode to see results.</p>
          </div>
        )}
      </TwoColumn.Right>
    </TwoColumn>
  );
};

BarcodeScanner.title = "Barcode Scanner";
export default BarcodeScanner;
