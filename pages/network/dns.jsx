import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";
import MyButton from "@components/MyButton";
import MyCopyButton from "@components/MyCopyButton";
import { FaSearch } from "react-icons/fa";

const RECORD_TYPES = ["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SOA", "CAA"];

const DNS_TYPE_MAP = {
  1: "A",
  2: "NS",
  5: "CNAME",
  6: "SOA",
  12: "PTR",
  15: "MX",
  16: "TXT",
  28: "AAAA",
  257: "CAA",
};

const PROVIDERS = [
  { label: "Cloudflare (1.1.1.1)", value: "cloudflare" },
  { label: "Google (8.8.8.8)", value: "google" },
];

const DNSLookup = () => {
  const [domain, setDomain] = useState("google.com");
  const [recordType, setRecordType] = useState("A");
  const [provider, setProvider] = useState("cloudflare");
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [queried, setQueried] = useState(false);

  const handleLookup = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const cleanDomain = domain.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
    if (!cleanDomain) {
      toast.error("Please enter a valid domain name");
      return;
    }

    setLoading(true);
    setQueried(true);
    setRecords([]);

    try {
      let url = "";
      let headers = {};

      if (provider === "cloudflare") {
        url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(cleanDomain)}&type=${recordType}`;
        headers = { Accept: "application/dns-json" };
      } else {
        url = `https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=${recordType}`;
      }

      const res = await axios.get(url, { headers, timeout: 8000 });
      const data = res.data;

      if (data.Status !== 0) {
        const errorDescriptions = {
          1: "Format error: The name server was unable to interpret the query.",
          2: "Server failure: The name server was unable to process this query.",
          3: "NXDOMAIN: The domain name does not exist.",
          4: "Not Implemented: The name server does not support the requested kind of query.",
          5: "Refused: The name server refuses to perform the specified operation.",
        };
        toast.warn(errorDescriptions[data.Status] || `DNS Query failed with status code ${data.Status}`);
        setRecords([]);
        return;
      }

      const answers = data.Answer || [];
      const formatted = answers.map((item) => ({
        name: item.name,
        type: DNS_TYPE_MAP[item.type] || String(item.type),
        ttl: item.TTL,
        data: item.data,
      }));

      setRecords(formatted);
      if (formatted.length === 0) {
        toast.info(`No ${recordType} records found for ${cleanDomain}`);
      }
    } catch (err) {
      toast.error(err.message || "DNS lookup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TwoColumn leftWidth={45}>
      <TwoColumn.Left>
        <MyCard.Header
          title="DNS Record Lookup"
          helper="Query DNS records using secure DNS-over-HTTPS (DoH) providers."
        />

        <form onSubmit={handleLookup} className="space-y-4 mt-4">
          <MyInput
            label="Domain Name"
            placeholder="e.g. cloudflare.com"
            value={domain}
            onChange={setDomain}
          />

          <div className="grid grid-cols-2 gap-3">
            <MySelect
              label="Record Type"
              value={recordType}
              onChange={setRecordType}
            >
              {RECORD_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </MySelect>

            <MySelect
              label="DNS Resolver"
              value={provider}
              onChange={setProvider}
            >
              {PROVIDERS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </MySelect>
          </div>

          <MyButton onClick={handleLookup} loading={loading} className="w-full">
            <FaSearch className="mr-2" /> Lookup Records
          </MyButton>
        </form>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header
          title="DNS Records"
          helper={queried ? `Found ${records.length} ${recordType} records for ${domain}` : "Results will appear here"}
        />

        {records.length > 0 ? (
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-sm border-collapse border border-gray-200 dark:border-dark-secondary rounded-lg overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase text-xs">
                <tr>
                  <th className="p-3 border-b dark:border-dark-secondary">Type</th>
                  <th className="p-3 border-b dark:border-dark-secondary">TTL</th>
                  <th className="p-3 border-b dark:border-dark-secondary">Value / Target</th>
                  <th className="p-3 border-b dark:border-dark-secondary text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-secondary">
                {records.map((r, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">
                      {r.type}
                    </td>
                    <td className="p-3 font-mono text-gray-500">
                      {r.ttl}s
                    </td>
                    <td className="p-3 font-mono break-all text-gray-900 dark:text-gray-100">
                      {r.data}
                    </td>
                    <td className="p-3 text-right">
                      <MyCopyButton value={r.data} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400">
            {loading ? "Resolving DNS..." : queried ? `No ${recordType} records returned.` : "Enter a domain and click Lookup."}
          </div>
        )}
      </TwoColumn.Right>
    </TwoColumn>
  );
};

DNSLookup.title = "DNS Lookup";
export default DNSLookup;
