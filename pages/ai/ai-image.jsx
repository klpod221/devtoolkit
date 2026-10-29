import React, { useState } from "react";
import { toast } from "react-toastify";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyTextarea from "@components/MyTextarea";
import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";
import MyButton from "@components/MyButton";
import MyImage from "@components/MyImage";
import { FaPaintBrush, FaDownload, FaRandom, FaHistory } from "react-icons/fa";

const STYLES = [
  { label: "None / Natural", modifier: "" },
  { label: "Cinematic Realistic (8K, photorealistic, octane render)", modifier: ", 8k resolution, cinematic lighting, photorealistic, masterpiece" },
  { label: "Anime / Manga (Makoto Shinkai style, vibrant)", modifier: ", anime style, Makoto Shinkai, studio ghibli, highly detailed, vibrant colors" },
  { label: "Cyberpunk Neon (Futuristic, glowing lights)", modifier: ", cyberpunk aesthetic, neon glow, futuristic city, volumetric lighting" },
  { label: "Digital Concept Art (Artstation trending)", modifier: ", digital art, fantasy concept art, trending on artstation, smooth illustration" },
  { label: "3D Cartoon / Pixar (Charming, soft lighting)", modifier: ", 3d render, pixar style, cute, smooth shading, clay render" },
  { label: "Pixel Art (16-bit retro arcade)", modifier: ", 16-bit pixel art, retro gaming aesthetic, clean sprite" },
];

const ASPECT_RATIOS = [
  { label: "1:1 Square (768 x 768)", width: 768, height: 768 },
  { label: "16:9 Landscape (1024 x 576)", width: 1024, height: 576 },
  { label: "9:16 Portrait (576 x 1024)", width: 576, height: 1024 },
];

const AIImageGenerator = () => {
  const [prompt, setPrompt] = useState("A futuristic cute robot barista brewing espresso in a cozy cyberpunk cafe");
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [selectedRatio, setSelectedRatio] = useState(0);
  const [seed, setSeed] = useState(Math.floor(Math.random() * 1000000));
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [history, setHistory] = useState([]);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt description");
      return;
    }

    setLoading(true);
    const styleModifier = STYLES[selectedStyle].modifier;
    const fullPrompt = `${prompt.trim()}${styleModifier}`;
    const ratio = ASPECT_RATIOS[selectedRatio];

    const generatedUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      fullPrompt,
    )}?width=${ratio.width}&height=${ratio.height}&seed=${seed}&nologo=true`;

    // Preload image in memory
    const img = new Image();
    img.onload = () => {
      setImageUrl(generatedUrl);
      setHistory((prev) => [
        { prompt, url: generatedUrl, timestamp: new Date().toLocaleTimeString() },
        ...prev.slice(0, 5),
      ]);
      setLoading(false);
      toast.success("AI Image generated successfully!");
    };
    img.onerror = () => {
      // Fallback
      setImageUrl(generatedUrl);
      setLoading(false);
    };
    img.src = generatedUrl;
  };

  const handleRandomizeSeed = () => {
    setSeed(Math.floor(Math.random() * 1000000));
  };

  const handleDownload = async () => {
    if (!imageUrl) return;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-image-${Date.now()}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <TwoColumn leftWidth={45}>
      <TwoColumn.Left>
        <MyCard.Header
          title="AI Image Generator"
          helper="Generate high-resolution images from text prompts using open AI models."
        />

        <div className="space-y-4 mt-4">
          <MyTextarea
            label="Prompt Description"
            rows={4}
            value={prompt}
            onChange={setPrompt}
            placeholder="Describe what you want to see in detail..."
          />

          <MySelect
            label="Art Style Preset"
            value={selectedStyle}
            onChange={(v) => setSelectedStyle(Number(v))}
          >
            {STYLES.map((s, idx) => (
              <option key={idx} value={idx}>
                {s.label}
              </option>
            ))}
          </MySelect>

          <MySelect
            label="Aspect Ratio"
            value={selectedRatio}
            onChange={(v) => setSelectedRatio(Number(v))}
          >
            {ASPECT_RATIOS.map((r, idx) => (
              <option key={idx} value={idx}>
                {r.label}
              </option>
            ))}
          </MySelect>

          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <MyInput
                label="Seed (For reproduction)"
                type="number"
                value={seed}
                onChange={(v) => setSeed(Number(v))}
              />
            </div>
            <div className="pt-6">
              <MyButton color="light" onClick={handleRandomizeSeed} title="Randomize seed">
                <FaRandom />
              </MyButton>
            </div>
          </div>

          <MyButton onClick={handleGenerate} loading={loading} className="w-full py-3 font-semibold">
            <FaPaintBrush className="mr-2" /> Generate Artwork
          </MyButton>

          {history.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-dark-secondary">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                <FaHistory className="inline mr-1" /> Recent Prompts
              </span>
              <div className="space-y-1.5">
                {history.map((h, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setPrompt(h.prompt);
                      setImageUrl(h.url);
                    }}
                    className="w-full text-left text-xs p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 truncate transition-colors"
                  >
                    • {h.prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Generated Image" helper="High quality generated result">
          {imageUrl && (
            <MyButton size="xs" onClick={handleDownload}>
              <FaDownload className="mr-1" /> Download Image
            </MyButton>
          )}
        </MyCard.Header>

        <div className="mt-4 flex flex-col items-center justify-center min-h-[400px] p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-dark-secondary overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-8 space-y-3">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Generating image with AI model...
              </p>
            </div>
          ) : imageUrl ? (
            <div className="relative group max-w-full rounded-xl overflow-hidden shadow-2xl">
              <MyImage
                src={imageUrl}
                alt="AI Generated Artwork"
                className="w-full h-auto object-contain max-h-[600px]"
                download={false}
                preview={false}
                unoptimized
              />
            </div>
          ) : (
            <div className="text-center p-8 text-gray-400">
              <FaPaintBrush className="w-12 h-12 mx-auto mb-3 opacity-20" />
              Enter your prompt and click &quot;Generate Artwork&quot;.
            </div>
          )}
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

AIImageGenerator.title = "Image Generator";
export default AIImageGenerator;
