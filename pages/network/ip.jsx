import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MyButton from "@components/MyButton";
import MyCopyButton from "@components/MyCopyButton";
import ObjectOutput from "@components/ObjectOutput";
import { FaSearch, FaMapMarkerAlt, FaGlobeAmericas, FaRedo } from "react-icons/fa";

const IPAddressInfo = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchIPInfo = useCallback(async (target = "") => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/network/ip${target ? `?query=${encodeURIComponent(target)}` : ""}`);
      setData(res.data);
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || "Failed to fetch IP info");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIPInfo();
  }, [fetchIPInfo]);

  const handleSearch = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    fetchIPInfo(query.trim());
  };

  const handleReset = () => {
    setQuery("");
    fetchIPInfo("");
  };

  return (
    <TwoColumn leftWidth={45}>
      <TwoColumn.Left>
        <MyCard.Header
          title="IP Address Lookup"
          helper="Look up geolocation, ISP, and network information for any IP or domain."
        >
          <MyButton onClick={handleReset} size="sm" color="light">
            <FaRedo className="mr-1" /> My IP
          </MyButton>
        </MyCard.Header>

        <form onSubmit={handleSearch} className="space-y-4 mt-4">
          <MyInput
            label="IPv4, IPv6 or Domain"
            placeholder="e.g. 8.8.8.8 or github.com"
            value={query}
            onChange={setQuery}
          />
          <MyButton onClick={handleSearch} loading={loading} className="w-full">
            <FaSearch className="mr-2" /> Lookup
          </MyButton>
        </form>

        {data && (
          <div className="mt-6 p-4 rounded-xl border border-gray-200 dark:border-dark-secondary bg-gray-50 dark:bg-gray-800">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Target Address</div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
                {data.ip}
              </span>
              <MyCopyButton value={data.ip} />
            </div>
            {data.hostname && (
              <div className="text-xs text-gray-500 mt-1 font-mono break-all">
                Hostname: {data.hostname}
              </div>
            )}
          </div>
        )}
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header
          title="Geolocation & Network Details"
          helper="Data provided via secure internal resolver"
        />

        {data ? (
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border dark:border-dark-secondary">
                <span className="text-xs text-gray-500">Location</span>
                <p className="font-semibold text-gray-800 dark:text-gray-100 flex items-center mt-1">
                  <FaMapMarkerAlt className="mr-1.5 text-red-500 shrink-0" />
                  {[data.city, data.region, data.country].filter(Boolean).join(", ") || "N/A"}
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border dark:border-dark-secondary">
                <span className="text-xs text-gray-500">ASN / ISP</span>
                <p className="font-semibold text-gray-800 dark:text-gray-100 flex items-center mt-1 truncate">
                  <FaGlobeAmericas className="mr-1.5 text-blue-500 shrink-0" />
                  {data.org || data.asn || "N/A"}
                </p>
              </div>
            </div>

            <ObjectOutput
              data={{
                "IP Address": data.ip,
                "Hostname": data.hostname || "None",
                "City": data.city || "N/A",
                "Region / State": data.region || "N/A",
                "Country": `${data.country || "N/A"} (${data.countryCode || ""})`,
                "Postal Code": data.postal || "N/A",
                "Timezone": data.timezone || "N/A",
                "Organization": data.org || "N/A",
                "ASN": data.asn || "N/A",
                "Coordinates": data.latitude && data.longitude ? `${data.latitude}, ${data.longitude}` : "N/A",
              }}
            />

            {data.latitude && data.longitude && (
              <a
                href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:underline dark:text-blue-400 mt-2"
              >
                <FaMapMarkerAlt className="mr-1" /> View on Google Maps →
              </a>
            )}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400">
            {loading ? "Loading IP information..." : "No data available."}
          </div>
        )}
      </TwoColumn.Right>
    </TwoColumn>
  );
};

IPAddressInfo.title = "IP Address Info";
export default IPAddressInfo;
