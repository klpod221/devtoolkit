import React, { useState, useEffect, useRef } from "react";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";
import MyButton from "@components/MyButton";
import { FaPlay, FaStop, FaNetworkWired, FaTrash } from "react-icons/fa";

const PRESET_TARGETS = [
  { label: "Cloudflare (1.1.1.1)", url: "https://1.1.1.1" },
  { label: "Google (google.com)", url: "https://www.google.com" },
  { label: "GitHub (github.com)", url: "https://github.com" },
  { label: "AWS (aws.amazon.com)", url: "https://aws.amazon.com" },
  { label: "Vercel (vercel.com)", url: "https://vercel.com" },
];

const PingTester = () => {
  const [target, setTarget] = useState(PRESET_TARGETS[0].url);
  const [isRunning, setIsRunning] = useState(false);
  const [pings, setPings] = useState([]);
  const [count, setCount] = useState(10);

  const abortControllerRef = useRef(null);
  const isRunningRef = useRef(false);

  const measureLatency = async (url) => {
    const start = performance.now();
    // Cache bust
    const testUrl = `${url.replace(/\/+$/, "")}/favicon.ico?_ping=${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    try {
      abortControllerRef.current = new AbortController();
      // mode: 'no-cors' allows measuring response network latency even with opaque response
      await fetch(testUrl, {
        mode: "no-cors",
        cache: "no-cache",
        signal: abortControllerRef.current.signal,
      });
      const end = performance.now();
      return Math.round(end - start);
    } catch (err) {
      if (err.name === "AbortError") throw err;
      // Network failed or blocked
      const end = performance.now();
      const rtt = Math.round(end - start);
      return rtt > 10 ? rtt : null;
    }
  };

  const startPing = async () => {
    if (isRunning) return;
    setIsRunning(true);
    isRunningRef.current = true;
    setPings([]);

    let targetUrl = target.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = `https://${targetUrl}`;
    }

    const maxPings = parseInt(count, 10) || 10;
    for (let i = 1; i <= maxPings; i++) {
      if (!isRunningRef.current) break;
      try {
        const rtt = await measureLatency(targetUrl);
        if (!isRunningRef.current) break;

        const pingItem = {
          seq: i,
          time: new Date().toLocaleTimeString(),
          rtt,
          success: rtt !== null,
        };

        setPings((prev) => [...prev, pingItem]);
      } catch (e) {
        if (e.name === "AbortError") break;
      }

      // Wait 600ms between pings
      await new Promise((res) => setTimeout(res, 600));
    }

    setIsRunning(false);
    isRunningRef.current = false;
  };

  const stopPing = () => {
    isRunningRef.current = false;
    setIsRunning(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  useEffect(() => {
    return () => {
      isRunningRef.current = false;
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const clearResults = () => {
    setPings([]);
  };

  // Stats calculation
  const successfulPings = pings.filter((p) => p.success && p.rtt !== null);
  const rttList = successfulPings.map((p) => p.rtt);
  const minRtt = rttList.length ? Math.min(...rttList) : 0;
  const maxRtt = rttList.length ? Math.max(...rttList) : 0;
  const avgRtt = rttList.length ? Math.round(rttList.reduce((a, b) => a + b, 0) / rttList.length) : 0;

  // Jitter (standard deviation)
  const jitter = rttList.length > 1
    ? Math.round(Math.sqrt(rttList.reduce((acc, val) => acc + Math.pow(val - avgRtt, 2), 0) / rttList.length))
    : 0;

  const packetLoss = pings.length
    ? Math.round(((pings.length - successfulPings.length) / pings.length) * 100)
    : 0;

  const getLatencyColor = (rtt) => {
    if (rtt === null) return "text-red-500 bg-red-50 dark:bg-red-900/20";
    if (rtt < 60) return "text-green-600 bg-green-50 dark:bg-green-900/20";
    if (rtt < 150) return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20";
    return "text-red-600 bg-red-50 dark:bg-red-900/20";
  };

  return (
    <TwoColumn leftWidth={45}>
      <TwoColumn.Left>
        <MyCard.Header
          title="HTTP Ping Tester"
          helper="Test round-trip latency, packet loss, and jitter to any web server."
        />

        <div className="space-y-4 mt-4">
          <MySelect
            label="Preset Server"
            value={target}
            onChange={setTarget}
            disabled={isRunning}
          >
            {PRESET_TARGETS.map((p) => (
              <option key={p.url} value={p.url}>
                {p.label}
              </option>
            ))}
          </MySelect>

          <MyInput
            label="Target URL or Host"
            placeholder="https://example.com"
            value={target}
            onChange={setTarget}
            disabled={isRunning}
          />

          <MyInput
            label="Ping Count"
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={setCount}
            disabled={isRunning}
          />

          <div className="flex gap-2">
            {isRunning ? (
              <MyButton color="red" onClick={stopPing} className="flex-1">
                <FaStop className="mr-2" /> Stop Ping
              </MyButton>
            ) : (
              <MyButton onClick={startPing} className="flex-1">
                <FaPlay className="mr-2" /> Start Ping
              </MyButton>
            )}

            <MyButton
              color="light"
              onClick={clearResults}
              disabled={isRunning || pings.length === 0}
            >
              <FaTrash className="mr-1" /> Clear
            </MyButton>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center border dark:border-dark-secondary">
            <span className="text-xs text-gray-500">Min</span>
            <p className="text-xl font-bold font-mono text-green-600 dark:text-green-400">
              {minRtt} <span className="text-xs">ms</span>
            </p>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center border dark:border-dark-secondary">
            <span className="text-xs text-gray-500">Avg</span>
            <p className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">
              {avgRtt} <span className="text-xs">ms</span>
            </p>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center border dark:border-dark-secondary">
            <span className="text-xs text-gray-500">Max</span>
            <p className="text-xl font-bold font-mono text-yellow-600 dark:text-yellow-400">
              {maxRtt} <span className="text-xs">ms</span>
            </p>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center border dark:border-dark-secondary">
            <span className="text-xs text-gray-500">Jitter</span>
            <p className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400">
              ±{jitter} <span className="text-xs">ms</span>
            </p>
          </div>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header
          title="Ping Results"
          helper={pings.length ? `Completed ${pings.length}/${count} pings (Loss: ${packetLoss}%)` : "Live latency graph & history"}
        />

        {/* Visual Latency Bars */}
        {pings.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-dark-secondary">
            <span className="text-xs uppercase text-gray-500 font-semibold mb-2 block">
              RTT Visual History
            </span>
            <div className="flex items-end gap-1.5 h-24 pt-2">
              {pings.map((p, idx) => {
                const heightPercent = p.rtt ? Math.min(Math.max((p.rtt / (maxRtt || 100)) * 100, 15), 100) : 100;
                const barColor = !p.success ? "bg-red-500" : p.rtt < 60 ? "bg-green-500" : p.rtt < 150 ? "bg-yellow-500" : "bg-red-500";
                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center group relative h-full justify-end"
                  >
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t transition-all ${barColor}`}
                    />
                    <span className="text-[10px] text-gray-400 mt-1">{p.seq}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Detailed Packet List */}
        <div className="mt-4 overflow-y-auto max-h-[380px]">
          {pings.length > 0 ? (
            <div className="space-y-1.5">
              {pings.slice(0).reverse().map((p) => (
                <div
                  key={p.seq}
                  className={`flex items-center justify-between p-2.5 rounded-lg border text-sm font-mono ${getLatencyColor(p.rtt)} dark:border-dark-secondary`}
                >
                  <span className="font-semibold">Seq #{p.seq}</span>
                  <span className="text-xs text-gray-500">{p.time}</span>
                  <span className="font-bold">
                    {p.success ? `${p.rtt} ms` : "Request Timeout"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              <FaNetworkWired className="w-8 h-8 mx-auto mb-2 opacity-30" />
              Click &quot;Start Ping&quot; to test latency.
            </div>
          )}
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

PingTester.title = "Ping Test";
export default PingTester;
