import React, { useState, useEffect, useRef, useCallback } from "react";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyTextarea from "@components/MyTextarea";
import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";
import MyButton from "@components/MyButton";
import { FaDownload, FaImage } from "react-icons/fa";

const GRADIENTS = [
  { name: "Sunset Horizon", value: ["#f12711", "#f5af19"] },
  { name: "Deep Ocean", value: ["#2b5876", "#4e4376"] },
  { name: "Emerald Dream", value: ["#0ba360", "#3cba92"] },
  { name: "Purple Bliss", value: ["#7F00FF", "#E100FF"] },
  { name: "Midnight Modern", value: ["#141E30", "#243B55"] },
  { name: "Cyberpunk Glow", value: ["#F000FF", "#00FFFF"] },
];

const RATIOS = [
  { label: "1:1 Square (Instagram / Post)", width: 1080, height: 1080 },
  { label: "16:9 Landscape (Twitter / Presentation)", width: 1200, height: 675 },
  { label: "9:16 Story (Mobile / Reels)", width: 720, height: 1280 },
];

const TextToImageCard = () => {
  const [text, setText] = useState(
    "“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.”",
  );
  const [author, setAuthor] = useState("Martin Fowler");
  const [selectedGradient, setSelectedGradient] = useState(0);
  const [selectedRatio, setSelectedRatio] = useState(1);
  const [fontSize, setFontSize] = useState(36);

  const canvasRef = useRef(null);

  const drawCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ratio = RATIOS[selectedRatio];
    canvas.width = ratio.width;
    canvas.height = ratio.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Draw Gradient Background
    const gradientColors = GRADIENTS[selectedGradient].value;
    const grad = ctx.createLinearGradient(0, 0, ratio.width, ratio.height);
    grad.addColorStop(0, gradientColors[0]);
    grad.addColorStop(1, gradientColors[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, ratio.width, ratio.height);

    // 2. Draw Card Container
    const padding = 80;
    const cardX = padding;
    const cardY = padding;
    const cardW = ratio.width - padding * 2;
    const cardH = ratio.height - padding * 2;
    const radius = 32;

    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 20;

    // Rounded rectangle
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, radius);
    ctx.fill();
    ctx.restore();

    // 3. Draw Watermark / Brand
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = `600 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.fillText("DEVTOOLKIT", cardX + 50, cardY + 60);

    // 4. Draw Main Quote / Text with auto-wrapping
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.textBaseline = "middle";

    const maxTextWidth = cardW - 100;
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0] || "";

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxTextWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = fontSize * 1.5;
    const totalBlockHeight = lines.length * lineHeight;
    let textStartY = cardY + (cardH - totalBlockHeight) / 2;

    lines.forEach((line, index) => {
      ctx.fillText(line, cardX + 50, textStartY + index * lineHeight);
    });

    // 5. Draw Author / Footer
    if (author) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = `italic 600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      ctx.fillText(`— ${author}`, cardX + 50, cardY + cardH - 60);
    }
  }, [author, fontSize, selectedGradient, selectedRatio, text]);

  useEffect(() => {
    drawCard();
  }, [drawCard]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `quote-card-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <TwoColumn leftWidth={45}>
      <TwoColumn.Left>
        <MyCard.Header
          title="Text to Image Card Generator"
          helper="Transform quotes, text snippets, and notes into beautiful shareable cards."
        />

        <div className="space-y-4 mt-4">
          <MyTextarea
            label="Card Text Content"
            rows={4}
            value={text}
            onChange={setText}
            placeholder="Type your message or quote..."
          />

          <MyInput
            label="Author / Attribution"
            value={author}
            onChange={setAuthor}
            placeholder="e.g. Steve Jobs"
          />

          <div className="grid grid-cols-2 gap-3">
            <MySelect
              label="Gradient Theme"
              value={selectedGradient}
              onChange={(v) => setSelectedGradient(Number(v))}
            >
              {GRADIENTS.map((g, i) => (
                <option key={i} value={i}>
                  {g.name}
                </option>
              ))}
            </MySelect>

            <MySelect
              label="Aspect Ratio"
              value={selectedRatio}
              onChange={(v) => setSelectedRatio(Number(v))}
            >
              {RATIOS.map((r, i) => (
                <option key={i} value={i}>
                  {r.label}
                </option>
              ))}
            </MySelect>
          </div>

          <MySelect
            label="Font Size"
            value={fontSize}
            onChange={(v) => setFontSize(Number(v))}
          >
            <option value={28}>Small (28px)</option>
            <option value={36}>Medium (36px)</option>
            <option value={48}>Large (48px)</option>
            <option value={60}>Extra Large (60px)</option>
          </MySelect>

          <MyButton onClick={handleDownload} className="w-full">
            <FaDownload className="mr-2" /> Download High-Res PNG
          </MyButton>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Card Preview" helper="Real-time rendered canvas output" />

        <div className="mt-4 flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-[500px] object-contain rounded-xl shadow-lg border border-gray-300 dark:border-dark-secondary"
          />
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

TextToImageCard.title = "Text to Image";
export default TextToImageCard;
