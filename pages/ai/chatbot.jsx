import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";
import MyButton from "@components/MyButton";
import MyCopyButton from "@components/MyCopyButton";
import { FaPaperPlane, FaRobot, FaUser, FaTrash, FaDownload, FaCog } from "react-icons/fa";

const PROVIDERS = [
  { label: "Free Open LLM (No API Key Required)", value: "free" },
  { label: "Google Gemini (Custom API Key)", value: "gemini" },
  { label: "OpenAI (Custom API Key)", value: "openai" },
];

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content: "Hello! I am your AI coding assistant on DevToolkit. How can I help you today with your code, architecture, or tools?",
  },
];

const AIChatbot = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState("free");
  const [apiKey, setApiKey] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are an expert Senior Full-Stack Developer and System Architect. Provide concise, clean, secure, and production-ready code with minimal unnecessary fluff.",
  );
  const [showSettings, setShowSettings] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load saved settings if any
    const savedKey = localStorage.getItem("devtoolkit_ai_key");
    const savedProvider = localStorage.getItem("devtoolkit_ai_provider");
    if (savedKey) setApiKey(savedKey);
    if (savedProvider) setProvider(savedProvider);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSaveSettings = () => {
    localStorage.setItem("devtoolkit_ai_key", apiKey);
    localStorage.setItem("devtoolkit_ai_provider", provider);
    setShowSettings(false);
    toast.success("Settings saved!");
  };

  const handleSend = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const cleanInput = input.trim();
    if (!cleanInput || loading) return;

    if (provider !== "free" && !apiKey.trim()) {
      toast.warn("Please enter your API Key in Settings to use " + provider);
      setShowSettings(true);
      return;
    }

    const newMessages = [...messages, { role: "user", content: cleanInput }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/ai/chat", {
        messages: newMessages,
        systemPrompt,
        customApiKey: apiKey.trim(),
        provider,
      });

      if (res.data && res.data.message) {
        setMessages([...newMessages, res.data.message]);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || "Failed to get response");
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `⚠️ Error: ${err.response?.data?.error || err.message}. Please check your connection or API key.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages(INITIAL_MESSAGES);
  };

  const handleExport = () => {
    const md = messages
      .map((m) => `### ${m.role === "user" ? "User" : "AI Assistant"}\n\n${m.content}\n\n---`)
      .join("\n\n");
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-export-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <MyCard className="w-full max-w-5xl mx-auto flex flex-col h-[82vh]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-dark-secondary shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <FaRobot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 leading-tight">
              DevToolkit AI Chatbot
            </h3>
            <span className="text-xs text-gray-500">
              Model Engine: {PROVIDERS.find((p) => p.value === provider)?.label}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <MyButton size="xs" color="light" onClick={() => setShowSettings(!showSettings)}>
            <FaCog className="mr-1" /> Settings
          </MyButton>

          <MyButton size="xs" color="light" onClick={handleExport} title="Export Chat as Markdown">
            <FaDownload />
          </MyButton>

          <MyButton size="xs" color="light" onClick={handleClear} title="Clear conversation">
            <FaTrash />
          </MyButton>
        </div>
      </div>

      {/* Settings Modal / Dropdown */}
      {showSettings && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-dark-secondary my-3 shrink-0 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <MySelect label="AI Provider" value={provider} onChange={setProvider}>
              {PROVIDERS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </MySelect>

            {provider !== "free" && (
              <MyInput
                label={`${provider === "gemini" ? "Google Gemini" : "OpenAI"} API Key`}
                type="password"
                placeholder="Paste API key here..."
                value={apiKey}
                onChange={setApiKey}
              />
            )}
          </div>

          <MyInput
            label="System Instruction"
            value={systemPrompt}
            onChange={setSystemPrompt}
            placeholder="Custom system prompt..."
          />

          <div className="flex justify-end space-x-2">
            <MyButton size="sm" color="light" onClick={() => setShowSettings(false)}>
              Cancel
            </MyButton>
            <MyButton size="sm" onClick={handleSaveSettings}>
              Save Settings
            </MyButton>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 px-1">
        {messages.map((m, idx) => {
          const isUser = m.role === "user";
          return (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isUser
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {isUser ? <FaUser className="w-3.5 h-3.5" /> : <FaRobot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 shadow-sm text-sm relative group leading-relaxed ${
                  isUser
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-200 dark:border-dark-secondary"
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{m.content}</div>

                <div
                  className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isUser ? "hidden" : "block"
                  }`}
                >
                  <MyCopyButton value={m.content} />
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
              <FaRobot className="w-4 h-4" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none p-4 flex items-center space-x-2 border dark:border-dark-secondary">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="pt-3 border-t border-gray-200 dark:border-dark-secondary shrink-0 flex gap-2">
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question or request code... (Enter to send, Shift+Enter for newline)"
          className="flex-1 rounded-xl border border-gray-300 dark:border-dark-secondary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />

        <MyButton
          onClick={handleSend}
          loading={loading}
          disabled={!input.trim()}
          className="px-5 shrink-0 flex items-center justify-center"
        >
          <FaPaperPlane className="w-4 h-4" />
        </MyButton>
      </form>
    </MyCard>
  );
};

AIChatbot.title = "Chatbot";
export default AIChatbot;
