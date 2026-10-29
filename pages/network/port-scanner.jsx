import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MyButton from "@components/MyButton";
import { FaPlay, FaCheckCircle, FaTimesCircle, FaShieldAlt } from "react-icons/fa";

const PRESET_GROUPS = [
  {
    name: "Web & Core Services",
    ports: [21, 22, 25, 53, 80, 110, 143, 443, 465, 587, 993, 995, 8080],
  },
  {
    name: "Databases & Cache",
    ports: [1433, 1521, 3306, 5432, 6379, 27017],
  },
  {
    name: "Remote Access",
    ports: [22, 23, 3389, 5900, 8443],
  },
];

const PortScanner = () => {
  const [host, setHost] = useState("scanme.nmap.org");
  const [portsText, setPortsText] = useState(PRESET_GROUPS[0].ports.join(", "));
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const applyPreset = (ports) => {
    setPortsText(ports.join(", "));
  };

  const handleScan = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!host.trim()) {
      toast.error("Please enter a host or IP address");
      return;
    }

    const ports = portsText
      .split(/[\s,]+/)
      .map((p) => parseInt(p.trim(), 10))
      .filter((p) => !isNaN(p) && p > 0 && p <= 65535);

    if (ports.length === 0) {
      toast.error("Please specify at least one valid port number (1-65535)");
      return;
    }

    if (ports.length > 30) {
      toast.warn("Capping scan to the first 30 ports to ensure fast response.");
    }

    setLoading(true);
    setScanResult(null);

    try {
      const res = await axios.post("/api/network/port-scan", {
        host: host.trim(),
        ports: ports.slice(0, 30),
      });

      setScanResult(res.data);
      const openCount = res.data.results.filter((r) => r.status === "open").length;
      toast.success(`Scan completed: ${openCount} open port(s) detected.`);
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || "Port scan failed");
    } finally {
      setLoading(false);
    }
  };

  const results = scanResult?.results || [];
  const openPorts = results.filter((r) => r.status === "open");
  const closedPorts = results.filter((r) => r.status === "closed");
  const filteredPorts = results.filter((r) => r.status === "filtered");

  const getStatusBadge = (status) => {
    if (status === "open") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          <FaCheckCircle className="mr-1" /> Open
        </span>
      );
    }
    if (status === "closed") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
          <FaTimesCircle className="mr-1" /> Closed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
        <FaShieldAlt className="mr-1" /> Filtered
      </span>
    );
  };

  return (
    <TwoColumn leftWidth={45}>
      <TwoColumn.Left>
        <MyCard.Header
          title="TCP Port Scanner"
          helper="Scan open ports and detect active services on servers or domain names."
        />

        <form onSubmit={handleScan} className="space-y-4 mt-4">
          <MyInput
            label="Target Host or IP"
            placeholder="e.g. scanme.nmap.org or 127.0.0.1"
            value={host}
            onChange={setHost}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Port Presets
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_GROUPS.map((g) => (
                <MyButton
                  key={g.name}
                  size="xs"
                  color="light"
                  onClick={() => applyPreset(g.ports)}
                >
                  {g.name}
                </MyButton>
              ))}
            </div>
          </div>

          <MyInput
            label="Ports to Scan (Comma separated, max 30)"
            placeholder="21, 22, 80, 443, 3306"
            value={portsText}
            onChange={setPortsText}
          />

          <MyButton onClick={handleScan} loading={loading} className="w-full">
            <FaPlay className="mr-2" /> Start Port Scan
          </MyButton>
        </form>

        {scanResult && (
          <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center border border-green-200 dark:border-green-800">
              <span className="text-xs text-green-700 dark:text-green-400 font-medium">Open</span>
              <p className="text-xl font-bold font-mono text-green-600 dark:text-green-400">
                {openPorts.length}
              </p>
            </div>

            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-center border border-red-200 dark:border-red-800">
              <span className="text-xs text-red-700 dark:text-red-400 font-medium">Closed</span>
              <p className="text-xl font-bold font-mono text-red-600 dark:text-red-400">
                {closedPorts.length}
              </p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center border border-gray-200 dark:border-dark-secondary">
              <span className="text-xs text-gray-500 font-medium">Filtered</span>
              <p className="text-xl font-bold font-mono text-gray-700 dark:text-gray-300">
                {filteredPorts.length}
              </p>
            </div>
          </div>
        )}
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header
          title="Scan Results"
          helper={scanResult ? `Scanned ${results.length} ports on ${scanResult.host}` : "Results will appear after scanning"}
        />

        {results.length > 0 ? (
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-sm border-collapse border border-gray-200 dark:border-dark-secondary rounded-lg overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase text-xs">
                <tr>
                  <th className="p-3 border-b dark:border-dark-secondary">Port</th>
                  <th className="p-3 border-b dark:border-dark-secondary">Service</th>
                  <th className="p-3 border-b dark:border-dark-secondary">Status</th>
                  <th className="p-3 border-b dark:border-dark-secondary text-right">Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-secondary">
                {results.map((r) => (
                  <tr key={r.port} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-3 font-mono font-bold text-gray-900 dark:text-gray-100">
                      {r.port}
                    </td>
                    <td className="p-3 font-semibold text-gray-700 dark:text-gray-300">
                      {r.service}
                    </td>
                    <td className="p-3">
                      {getStatusBadge(r.status)}
                    </td>
                    <td className="p-3 text-right font-mono text-gray-500">
                      {r.rtt !== null ? `${r.rtt} ms` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400">
            {loading ? "Scanning target ports..." : "Select ports and click Start Port Scan."}
          </div>
        )}
      </TwoColumn.Right>
    </TwoColumn>
  );
};

PortScanner.title = "Port Scanner";
export default PortScanner;
