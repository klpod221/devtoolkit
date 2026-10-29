import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";
import MyButton from "@components/MyButton";
import MyCheckbox from "@components/MyCheckbox";
import CodeOutput from "@components/CodeOutput";
import { FaPaperPlane, FaCheckCircle, FaTimesCircle, FaDownload } from "react-icons/fa";

const PRESET_PROTOCOLS = [
  { label: "SMTP (Submission - 587)", port: 587, protocol: "SMTP", tls: false },
  { label: "SMTPS (SSL/TLS - 465)", port: 465, protocol: "SMTP", tls: true },
  { label: "SMTP (Relay - 25)", port: 25, protocol: "SMTP", tls: false },
  { label: "IMAPS (SSL/TLS - 993)", port: 993, protocol: "IMAP", tls: true },
  { label: "IMAP (STARTTLS - 143)", port: 143, protocol: "IMAP", tls: false },
  { label: "POP3S (SSL/TLS - 995)", port: 995, protocol: "POP3", tls: true },
  { label: "POP3 (Insecure - 110)", port: 110, protocol: "POP3", tls: false },
];

const MailTester = () => {
  const [tab, setTab] = useState("tester"); // tester | autoconfig | server

  // Tester state
  const [host, setHost] = useState("smtp.gmail.com");
  const [port, setPort] = useState(465);
  const [useTls, setUseTls] = useState(true);
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // Autoconfig generator state
  const [domain, setDomain] = useState("example.com");
  const [mailHost, setMailHost] = useState("mail.example.com");

  const handlePresetChange = (selectedPort) => {
    const preset = PRESET_PROTOCOLS.find((p) => p.port === Number(selectedPort));
    if (preset) {
      setPort(preset.port);
      setUseTls(preset.tls);
    }
  };

  const handleTestConnection = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!host.trim()) {
      toast.error("Please enter a mail server hostname");
      return;
    }

    setLoading(true);
    setTestResult(null);

    try {
      const res = await axios.post("/api/system/mail-test", {
        host: host.trim(),
        port: Number(port),
        useTls,
      });

      setTestResult(res.data);
      if (res.data.success) {
        toast.success(`Connected successfully to ${host}:${port}`);
      } else {
        toast.error(`Connection failed: ${res.data.error}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || "Failed to test mail server");
      setTestResult({
        success: false,
        error: err.response?.data?.error || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const generateAutoconfigXml = () => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<clientConfig version="1.1">
  <emailProvider id="${domain}">
    <domain>${domain}</domain>
    <displayName>${domain} Mail Service</displayName>
    <displayShortName>${domain}</displayShortName>
    <incomingServer type="imap">
      <hostname>${mailHost}</hostname>
      <port>993</port>
      <socketType>SSL</socketType>
      <authentication>password-cleartext</authentication>
      <username>%EMAILADDRESS%</username>
    </incomingServer>
    <outgoingServer type="smtp">
      <hostname>${mailHost}</hostname>
      <port>587</port>
      <socketType>STARTTLS</socketType>
      <authentication>password-cleartext</authentication>
      <username>%EMAILADDRESS%</username>
    </outgoingServer>
  </emailProvider>
</clientConfig>`;
  };

  const generatePostfixConfig = () => {
    return `# Postfix main.cf snippet for ${domain}
myhostname = ${mailHost}
mydomain = ${domain}
myorigin = $mydomain
inet_interfaces = all
inet_protocols = ipv4

# TLS / SSL Parameters
smtpd_tls_cert_file = /etc/letsencrypt/live/${mailHost}/fullchain.pem
smtpd_tls_key_file = /etc/letsencrypt/live/${mailHost}/privkey.pem
smtpd_tls_security_level = may
smtpd_tls_protocols = !SSLv2, !SSLv3, !TLSv1, !TLSv1.1
smtpd_tls_mandatory_protocols = !SSLv2, !SSLv3, !TLSv1, !TLSv1.1
smtpd_tls_ciphers = high

# SASL Authentication (via Dovecot)
smtpd_sasl_type = dovecot
smtpd_sasl_path = private/auth
smtpd_sasl_auth_enable = yes
smtpd_recipient_restrictions =
    permit_sasl_authenticated,
    permit_mynetworks,
    reject_unauth_destination`;
  };

  return (
    <div className="space-y-4">
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-dark-secondary">
        <button
          type="button"
          onClick={() => setTab("tester")}
          className={`py-2.5 px-4 font-semibold text-sm border-b-2 transition-colors ${
            tab === "tester"
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Server Connection Tester
        </button>
        <button
          type="button"
          onClick={() => setTab("autoconfig")}
          className={`py-2.5 px-4 font-semibold text-sm border-b-2 transition-colors ${
            tab === "autoconfig"
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Client Autoconfig (XML)
        </button>
        <button
          type="button"
          onClick={() => setTab("server")}
          className={`py-2.5 px-4 font-semibold text-sm border-b-2 transition-colors ${
            tab === "server"
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Postfix / Dovecot Config
        </button>
      </div>

      {tab === "tester" && (
        <TwoColumn leftWidth={45}>
          <TwoColumn.Left>
            <MyCard.Header
              title="Mail Server Connection Tester"
              helper="Test connectivity, SSL/TLS handshake, and response banner for SMTP, IMAP, and POP3."
            />

            <form onSubmit={handleTestConnection} className="space-y-4 mt-4">
              <MyInput
                label="Mail Server Host"
                placeholder="e.g. smtp.gmail.com or mail.yourdomain.com"
                value={host}
                onChange={setHost}
              />

              <MySelect
                label="Protocol Preset"
                value={port}
                onChange={handlePresetChange}
              >
                {PRESET_PROTOCOLS.map((p) => (
                  <option key={p.port} value={p.port}>
                    {p.label}
                  </option>
                ))}
              </MySelect>

              <MyInput
                label="Port"
                type="number"
                value={port}
                onChange={(v) => setPort(Number(v))}
              />

              <MyCheckbox
                label="Direct SSL / TLS Connection"
                checked={useTls}
                onChange={(e) => setUseTls(e.target.checked)}
              />

              <MyButton onClick={handleTestConnection} loading={loading} className="w-full">
                <FaPaperPlane className="mr-2" /> Test Connection
              </MyButton>
            </form>
          </TwoColumn.Left>

          <TwoColumn.Right>
            <MyCard.Header
              title="Connection Status"
              helper={testResult ? `Target: ${host}:${port}` : "Results will appear here"}
            />

            {testResult ? (
              <div className="space-y-4 mt-4">
                <div
                  className={`p-4 rounded-xl border flex items-center justify-between ${
                    testResult.success
                      ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                      : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {testResult.success ? (
                      <FaCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    ) : (
                      <FaTimesCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    )}
                    <div>
                      <h4
                        className={`font-bold ${
                          testResult.success
                            ? "text-green-800 dark:text-green-300"
                            : "text-red-800 dark:text-red-300"
                        }`}
                      >
                        {testResult.success ? "Connection Succeeded" : "Connection Failed"}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Response time: {testResult.latency !== undefined ? `${testResult.latency} ms` : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {testResult.banner && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                      Server Greeting Banner
                    </label>
                    <div className="p-3 bg-gray-900 text-green-400 font-mono text-sm rounded-lg overflow-x-auto">
                      {testResult.banner}
                    </div>
                  </div>
                )}

                {testResult.error && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-red-500 font-semibold mb-1">
                      Error Details
                    </label>
                    <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-mono text-xs rounded-lg">
                      {testResult.error}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-400">
                Click &quot;Test Connection&quot; to verify server connectivity.
              </div>
            )}
          </TwoColumn.Right>
        </TwoColumn>
      )}

      {tab === "autoconfig" && (
        <TwoColumn leftWidth={40}>
          <TwoColumn.Left>
            <MyCard.Header
              title="Mail Autoconfig Setup"
              helper="Generate client autoconfiguration XML for Thunderbird and Outlook."
            />
            <div className="space-y-4 mt-4">
              <MyInput label="Domain" value={domain} onChange={setDomain} placeholder="example.com" />
              <MyInput label="Mail Server Host" value={mailHost} onChange={setMailHost} placeholder="mail.example.com" />
            </div>
          </TwoColumn.Left>
          <TwoColumn.Right>
            <MyCard.Header title="autoconfig.xml" helper="Save at https://autoconfig.yourdomain.com/mail/config-v1.1.xml">
              <MyButton
                size="xs"
                onClick={() => {
                  const blob = new Blob([generateAutoconfigXml()], { type: "application/xml" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "autoconfig.xml";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <FaDownload className="mr-1" /> Download XML
              </MyButton>
            </MyCard.Header>
            <CodeOutput language="xml" output={generateAutoconfigXml()} />
          </TwoColumn.Right>
        </TwoColumn>
      )}

      {tab === "server" && (
        <TwoColumn leftWidth={40}>
          <TwoColumn.Left>
            <MyCard.Header
              title="Server Configuration Generator"
              helper="Generate secure Postfix and Dovecot mail server configurations."
            />
            <div className="space-y-4 mt-4">
              <MyInput label="Domain" value={domain} onChange={setDomain} placeholder="example.com" />
              <MyInput label="Mail Server Host" value={mailHost} onChange={setMailHost} placeholder="mail.example.com" />
            </div>
          </TwoColumn.Left>
          <TwoColumn.Right>
            <MyCard.Header title="Postfix Configuration Snippet" helper="Append to /etc/postfix/main.cf" />
            <CodeOutput language="shell" output={generatePostfixConfig()} />
          </TwoColumn.Right>
        </TwoColumn>
      )}
    </div>
  );
};

MailTester.title = "IMAP/POP3/SMTP Tester";
export default MailTester;
