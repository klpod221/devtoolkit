import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import { FaPlay, FaDownload, FaUpload, FaClock, FaCheckCircle } from "react-icons/fa";

const SpeedTester = () => {
  const [stage, setStage] = useState("idle"); // idle, ping, download, upload, complete
  const [progress, setProgress] = useState(0);

  const [ping, setPing] = useState(null);
  const [jitter, setJitter] = useState(null);
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(null);

  const isCancelledRef = useRef(false);

  const runPingTest = async () => {
    setStage("ping");
    const latencies = [];
    for (let i = 0; i < 5; i++) {
      if (isCancelledRef.current) break;
      const start = performance.now();
      await axios.get(`/api/network/speed-test?size=1024&_t=${Date.now()}`);
      const duration = performance.now() - start;
      latencies.push(duration);
      setProgress((i + 1) * 20);
      await new Promise((r) => setTimeout(r, 100));
    }

    const avgPing = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
    const avgJitter = Math.round(
      Math.sqrt(latencies.reduce((acc, val) => acc + Math.pow(val - avgPing, 2), 0) / latencies.length),
    );

    setPing(avgPing);
    setJitter(avgJitter);
  };

  const runDownloadTest = async () => {
    setStage("download");
    setProgress(0);

    // Download chunks: 1MB, 2MB, 4MB
    const sizes = [1024 * 1024, 2 * 1024 * 1024, 4 * 1024 * 1024];
    let totalBytes = 0;
    const start = performance.now();

    for (let i = 0; i < sizes.length; i++) {
      if (isCancelledRef.current) break;
      const s = sizes[i];
      const res = await axios.get(`/api/network/speed-test?size=${s}&_t=${Date.now()}`, {
        responseType: "arraybuffer",
      });
      totalBytes += res.data.byteLength;
      const elapsedSec = (performance.now() - start) / 1000;
      const currentMbps = (totalBytes * 8) / (elapsedSec * 1000 * 1000);
      setDownloadSpeed(parseFloat(currentMbps.toFixed(2)));
      setProgress(Math.round(((i + 1) / sizes.length) * 100));
    }
  };

  const runUploadTest = async () => {
    setStage("upload");
    setProgress(0);

    // Upload payload buffers
    const chunkSizes = [512 * 1024, 1024 * 1024, 2 * 1024 * 1024];
    let totalBytes = 0;
    const start = performance.now();

    for (let i = 0; i < chunkSizes.length; i++) {
      if (isCancelledRef.current) break;
      const size = chunkSizes[i];
      const dummyData = "x".repeat(size);

      await axios.post("/api/network/speed-test", dummyData, {
        headers: { "Content-Type": "text/plain" },
      });

      totalBytes += size;
      const elapsedSec = (performance.now() - start) / 1000;
      const currentMbps = (totalBytes * 8) / (elapsedSec * 1000 * 1000);
      setUploadSpeed(parseFloat(currentMbps.toFixed(2)));
      setProgress(Math.round(((i + 1) / chunkSizes.length) * 100));
    }
  };

  const handleStartTest = async () => {
    isCancelledRef.current = false;
    setPing(null);
    setJitter(null);
    setDownloadSpeed(null);
    setUploadSpeed(null);
    setProgress(0);

    try {
      await runPingTest();
      if (isCancelledRef.current) return;
      await runDownloadTest();
      if (isCancelledRef.current) return;
      await runUploadTest();
      if (isCancelledRef.current) return;

      setStage("complete");
      toast.success("Speed test completed successfully!");
    } catch (err) {
      toast.error("Speed test interrupted: " + err.message);
      setStage("idle");
    }
  };

  const isTesting = stage === "ping" || stage === "download" || stage === "upload";

  return (
    <MyCard className="w-full max-w-4xl mx-auto">
      <MyCard.Header
        title="Internet Speed Test"
        helper="Measure your network latency, jitter, download, and upload speeds directly in the browser."
      />

      <div className="flex flex-col items-center justify-center py-6">
        {/* Main Speed Display */}
        <div className="relative w-64 h-64 rounded-full border-8 border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-800 dark:to-gray-900 shadow-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            {stage === "download" ? "Downloading" : stage === "upload" ? "Uploading" : stage === "ping" ? "Testing Latency" : "Speed"}
          </span>
          <div className="text-5xl font-extrabold font-mono text-blue-600 dark:text-blue-400 my-2">
            {stage === "upload" ? uploadSpeed || "0.00" : downloadSpeed || "0.00"}
          </div>
          <span className="text-sm font-semibold text-gray-500">Mbps</span>

          {isTesting && (
            <div className="w-32 bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden mt-3">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        <div className="mt-8">
          <MyButton
            onClick={handleStartTest}
            loading={isTesting}
            size="lg"
            className="px-8 py-3 text-lg font-bold"
          >
            {isTesting ? `Testing ${stage.toUpperCase()} (${progress}%)` : <><FaPlay className="mr-2" /> Start Speed Test</>}
          </MyButton>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-dark-secondary">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center border dark:border-dark-secondary">
          <div className="flex items-center justify-center text-gray-500 mb-1 text-sm">
            <FaClock className="mr-1 text-blue-500" /> Ping
          </div>
          <p className="text-2xl font-bold font-mono text-gray-800 dark:text-gray-100">
            {ping !== null ? `${ping} ms` : "—"}
          </p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center border dark:border-dark-secondary">
          <div className="flex items-center justify-center text-gray-500 mb-1 text-sm">
            <FaClock className="mr-1 text-purple-500" /> Jitter
          </div>
          <p className="text-2xl font-bold font-mono text-gray-800 dark:text-gray-100">
            {jitter !== null ? `±${jitter} ms` : "—"}
          </p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center border dark:border-dark-secondary">
          <div className="flex items-center justify-center text-gray-500 mb-1 text-sm">
            <FaDownload className="mr-1 text-green-500" /> Download
          </div>
          <p className="text-2xl font-bold font-mono text-green-600 dark:text-green-400">
            {downloadSpeed !== null ? `${downloadSpeed} Mbps` : "—"}
          </p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center border dark:border-dark-secondary">
          <div className="flex items-center justify-center text-gray-500 mb-1 text-sm">
            <FaUpload className="mr-1 text-purple-500" /> Upload
          </div>
          <p className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-400">
            {uploadSpeed !== null ? `${uploadSpeed} Mbps` : "—"}
          </p>
        </div>
      </div>
    </MyCard>
  );
};

SpeedTester.title = "Network Speed Test";
export default SpeedTester;
