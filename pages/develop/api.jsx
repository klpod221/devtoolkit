import React, { useState } from "react";
import axios from "axios";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";
import MyTabs from "@components/MyTabs";
import MyCodeEditor from "@components/MyCodeEditor";
import CodeOutput from "@components/CodeOutput";

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];

const METHOD_COLORS = {
  GET: "text-green-500",
  POST: "text-blue-500",
  PUT: "text-yellow-500",
  PATCH: "text-orange-500",
  DELETE: "text-red-500",
  HEAD: "text-purple-500",
  OPTIONS: "text-gray-500",
};

const STATUS_COLORS = {
  2: "bg-green-500",
  3: "bg-yellow-500",
  4: "bg-red-400",
  5: "bg-red-600",
};

const getStatusBadge = (status) => STATUS_COLORS[Math.floor(status / 100)] ?? "bg-gray-500";

const APITester = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos/1");
  const [headersText, setHeadersText] = useState('{\n  "Content-Type": "application/json"\n}');
  const [bodyText, setBodyText] = useState('{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [elapsed, setElapsed] = useState(null);

  const hasBody = !["GET", "HEAD", "OPTIONS"].includes(method);

  const handleSend = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResponse(null);
    const start = Date.now();
    try {
      let headers = {};
      try { headers = JSON.parse(headersText); } catch { /* ignore */ }

      let data;
      if (hasBody) {
        try { data = JSON.parse(bodyText); } catch { data = bodyText; }
      }

      const res = await axios({ method, url, headers, data, validateStatus: () => true });
      setElapsed(Date.now() - start);
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        data: typeof res.data === "object" ? JSON.stringify(res.data, null, 2) : String(res.data),
      });
    } catch (err) {
      setElapsed(Date.now() - start);
      setResponse({ error: err.message });
    }
    setLoading(false);
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="API Tester" helper="Send HTTP requests directly from the browser">
          <MyButton onClick={handleSend} loading={loading} className="shrink-0">
            Send
          </MyButton>
        </MyCard.Header>

        {/* URL Bar */}
        <div className="flex gap-2 mt-4">
          <div className="shrink-0">
            <MySelect value={method} onChange={(v) => setMethod(v)} sizing="md">
              {HTTP_METHODS.map((m) => (
                <option key={m} value={m} className={METHOD_COLORS[m]}>{m}</option>
              ))}
            </MySelect>
          </div>
          <div className="flex-1">
            <MyInput
              value={url}
              onChange={(v) => setUrl(v)}
              placeholder="https://api.example.com/endpoint"
            />
          </div>
        </div>

        {/* Tabs: Headers / Body */}
        <div className="mt-4">
          <MyTabs>
            <MyTabs.Tab title="Headers">
              <MyCodeEditor language="json" value={headersText} onChange={setHeadersText} height="300px" />
            </MyTabs.Tab>
            {hasBody && (
              <MyTabs.Tab title="Body">
                <MyCodeEditor language="json" value={bodyText} onChange={setBodyText} height="300px" />
              </MyTabs.Tab>
            )}
          </MyTabs>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        {response ? (
          response.error ? (
            <>
              <MyCard.Header title="Response" helper="Request failed" />
              <div className="mt-4 p-4 rounded-xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20">
                <p className="text-red-500 text-sm font-mono break-all">{response.error}</p>
              </div>
            </>
          ) : (
            <>
              {/* Response status bar */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-bold ${getStatusBadge(response.status)}`}>
                  {response.status} {response.statusText}
                </span>
                <span className="text-gray-400 text-xs">{elapsed}ms</span>
                <span className="text-gray-400 text-xs ml-auto">
                  {response.data ? `${(new Blob([response.data]).size / 1024).toFixed(2)} KB` : ""}
                </span>
              </div>

              <MyTabs>
                <MyTabs.Tab title="Body">
                  <CodeOutput output={response.data} language="json" />
                </MyTabs.Tab>
                <MyTabs.Tab title="Headers">
                  <CodeOutput
                    output={Object.entries(response.headers).map(([k, v]) => `${k}: ${v}`).join("\n")}
                    language="text"
                  />
                </MyTabs.Tab>
              </MyTabs>
            </>
          )
        ) : (
          <>
            <MyCard.Header title="Response" helper="Response will appear here after sending" />
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-3 text-gray-400 select-none">
              <div className="text-5xl opacity-20">⚡</div>
              <p className="text-sm">Hit <strong>Send</strong> to make a request</p>
            </div>
          </>
        )}
      </TwoColumn.Right>
    </TwoColumn>
  );
};

APITester.title = "API Tester";
export default APITester;
