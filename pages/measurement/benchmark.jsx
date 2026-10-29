import React, { useState } from "react";
import { toast } from "react-toastify";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import { FaPlay, FaMicrochip, FaMemory, FaLock, FaTachometerAlt } from "react-icons/fa";

const DeviceBenchmark = () => {
  const [running, setRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState("");
  const [results, setResults] = useState(null);

  // 1. Single-Thread CPU: Sieve of Eratosthenes
  const benchmarkSingleThread = async () => {
    setCurrentTest("Single-Thread CPU (Sieve of Eratosthenes)");
    await new Promise((r) => setTimeout(r, 50));
    const start = performance.now();
    const limit = 500000;
    const sieve = new Uint8Array(limit);
    for (let p = 2; p * p < limit; p++) {
      if (sieve[p] === 0) {
        for (let i = p * p; i < limit; i += p) {
          sieve[i] = 1;
        }
      }
    }
    const duration = performance.now() - start;
    const score = Math.max(Math.round(20000 / (duration || 1)), 100);
    return { duration: duration.toFixed(1), score };
  };

  // 2. Multi-Core Simulation / Heavy Matrix operations
  const benchmarkMatrix = async () => {
    setCurrentTest("Multi-Core & Compute (Matrix Multiplication)");
    await new Promise((r) => setTimeout(r, 50));
    const start = performance.now();
    const size = 300;
    const A = new Float32Array(size * size).fill(1.5);
    const B = new Float32Array(size * size).fill(2.5);
    const C = new Float32Array(size * size);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let sum = 0;
        for (let k = 0; k < size; k++) {
          sum += A[i * size + k] * B[k * size + j];
        }
        C[i * size + j] = sum;
      }
    }
    const duration = performance.now() - start;
    const score = Math.max(Math.round(35000 / (duration || 1)), 100);
    return { duration: duration.toFixed(1), score };
  };

  // 3. Cryptography Throughput: SHA-256
  const benchmarkCrypto = async () => {
    setCurrentTest("Cryptographic Throughput (WebCrypto SHA-256)");
    await new Promise((r) => setTimeout(r, 50));
    const start = performance.now();
    const buffer = new Uint8Array(10 * 1024 * 1024); // 10MB
    for (let i = 0; i < buffer.length; i += 1024) buffer[i] = i % 256;

    if (window.crypto?.subtle) {
      await window.crypto.subtle.digest("SHA-256", buffer);
    }
    const duration = performance.now() - start;
    const mbPerSec = Math.round((10 / (duration / 1000)));
    const score = mbPerSec * 8;
    return { duration: duration.toFixed(1), throughput: `${mbPerSec} MB/s`, score };
  };

  // 4. Memory Throughput: Float64 Allocation & Sort
  const benchmarkMemory = async () => {
    setCurrentTest("Memory Subsystem (Float64 Allocation & Sort)");
    await new Promise((r) => setTimeout(r, 50));
    const start = performance.now();
    const count = 1000000;
    const arr = new Float64Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random();
    }
    arr.sort();
    const duration = performance.now() - start;
    const score = Math.max(Math.round(40000 / (duration || 1)), 100);
    return { duration: duration.toFixed(1), score };
  };

  const runAllBenchmarks = async () => {
    setRunning(true);
    setResults(null);

    try {
      const single = await benchmarkSingleThread();
      const matrix = await benchmarkMatrix();
      const crypto = await benchmarkCrypto();
      const memory = await benchmarkMemory();

      const totalScore = Math.round(
        single.score * 0.25 + matrix.score * 0.35 + crypto.score * 0.2 + memory.score * 0.2,
      );

      let tier = "Mid-Range Device";
      if (totalScore >= 5500) tier = "High-End Workstation / Gaming Rig";
      else if (totalScore >= 3500) tier = "High Performance PC / Modern Laptop";
      else if (totalScore < 1800) tier = "Budget / Energy Efficient Device";

      setResults({
        single,
        matrix,
        crypto,
        memory,
        totalScore,
        tier,
      });

      toast.success(`Benchmark Complete! Score: ${totalScore}`);
    } catch (err) {
      toast.error("Benchmark failed: " + err.message);
    } finally {
      setRunning(false);
      setCurrentTest("");
    }
  };

  const cores = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || "Unknown" : "Unknown";
  const memoryGB = typeof navigator !== "undefined" && navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Unknown";

  return (
    <TwoColumn leftWidth={45}>
      <TwoColumn.Left>
        <MyCard.Header
          title="Hardware & Browser Benchmark"
          helper="Test CPU single-core, multi-core simulation, WebCrypto hashing, and memory bandwidth."
        />

        <div className="space-y-4 mt-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border dark:border-dark-secondary space-y-2 text-sm">
            <span className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider block text-xs">
              System Capabilities
            </span>
            <div className="flex justify-between">
              <span className="text-gray-500">Logical CPU Cores:</span>
              <span className="font-bold text-gray-800 dark:text-gray-100 font-mono">{cores}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Estimated Device RAM:</span>
              <span className="font-bold text-gray-800 dark:text-gray-100 font-mono">{memoryGB}</span>
            </div>
          </div>

          <MyButton
            onClick={runAllBenchmarks}
            loading={running}
            className="w-full py-3 font-bold"
          >
            {running ? currentTest : <><FaPlay className="mr-2" /> Run Benchmark Suite</>}
          </MyButton>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header
          title="Benchmark Score & Results"
          helper={results ? results.tier : "Performance rating will be calculated here"}
        />

        {results ? (
          <div className="space-y-6 mt-4">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-blue-200 block">Total Score</span>
                <span className="text-5xl font-extrabold font-mono">{results.totalScore}</span>
                <p className="text-sm text-blue-100 mt-1 font-medium">{results.tier}</p>
              </div>
              <FaTachometerAlt className="w-14 h-14 text-blue-300 opacity-60" />
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-dark-secondary flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaMicrochip className="text-blue-500" />
                  <div>
                    <h5 className="font-semibold text-sm text-gray-800 dark:text-gray-100">Single-Thread CPU</h5>
                    <p className="text-xs text-gray-500">Duration: {results.single.duration} ms</p>
                  </div>
                </div>
                <span className="font-bold font-mono text-blue-600 dark:text-blue-400">
                  {results.single.score} pts
                </span>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-dark-secondary flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaMicrochip className="text-indigo-500" />
                  <div>
                    <h5 className="font-semibold text-sm text-gray-800 dark:text-gray-100">Matrix Operations</h5>
                    <p className="text-xs text-gray-500">Duration: {results.matrix.duration} ms</p>
                  </div>
                </div>
                <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400">
                  {results.matrix.score} pts
                </span>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-dark-secondary flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaLock className="text-green-500" />
                  <div>
                    <h5 className="font-semibold text-sm text-gray-800 dark:text-gray-100">Crypto SHA-256</h5>
                    <p className="text-xs text-gray-500">Throughput: {results.crypto.throughput}</p>
                  </div>
                </div>
                <span className="font-bold font-mono text-green-600 dark:text-green-400">
                  {results.crypto.score} pts
                </span>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-dark-secondary flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaMemory className="text-purple-500" />
                  <div>
                    <h5 className="font-semibold text-sm text-gray-800 dark:text-gray-100">Memory Subsystem</h5>
                    <p className="text-xs text-gray-500">Duration: {results.memory.duration} ms</p>
                  </div>
                </div>
                <span className="font-bold font-mono text-purple-600 dark:text-purple-400">
                  {results.memory.score} pts
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400">
            {running ? `Running: ${currentTest}...` : "Click 'Run Benchmark Suite' to evaluate your device performance."}
          </div>
        )}
      </TwoColumn.Right>
    </TwoColumn>
  );
};

DeviceBenchmark.title = "Benchmark Builder";
export default DeviceBenchmark;
