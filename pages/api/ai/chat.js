import axios from "axios";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, systemPrompt, customApiKey, provider } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  const defaultSystem = systemPrompt || "You are an intelligent, helpful senior software engineering assistant on DevToolkit.";

  try {
    // 1. If user provided a Gemini API key
    if (provider === "gemini" && customApiKey) {
      const contents = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(
        customApiKey,
      )}`;

      const { data } = await axios.post(
        url,
        {
          systemInstruction: { parts: [{ text: defaultSystem }] },
          contents,
        },
        { timeout: 25000 },
      );

      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
      return res.status(200).json({ message: { role: "assistant", content: reply } });
    }

    // 2. If user provided an OpenAI API key
    if (provider === "openai" && customApiKey) {
      const formattedMessages = [
        { role: "system", content: defaultSystem },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ];

      const { data } = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: formattedMessages,
        },
        {
          headers: { Authorization: `Bearer ${customApiKey}` },
          timeout: 25000,
        },
      );

      const reply = data.choices?.[0]?.message?.content || "No response received.";
      return res.status(200).json({ message: { role: "assistant", content: reply } });
    }

    // 3. Default: Free Open LLM via Pollinations AI (Zero API key required)
    const formattedMessages = [
      { role: "system", content: defaultSystem },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const { data } = await axios.post(
      "https://text.pollinations.ai/",
      {
        messages: formattedMessages,
        model: "openai",
        seed: 42,
      },
      {
        timeout: 25000,
        headers: { "Content-Type": "application/json" },
      },
    );

    const reply = typeof data === "string" ? data : data.text || JSON.stringify(data);
    return res.status(200).json({ message: { role: "assistant", content: reply } });
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message || "Failed to communicate with AI model";
    return res.status(500).json({ error: errorMsg });
  }
};

export default handler;

