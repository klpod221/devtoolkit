import { toast } from "react-toastify";

const copyToClipboard = (text) => {
  try {
    if (!navigator.clipboard) {
      toast.error("Clipboard API not available");
      return;
    }

    if (typeof text !== "string") {
      text = text.toString();
    }

    if (!text) {
      toast.error("No text to copy");
      return;
    }

    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  } catch (error) {
    toast.error(error.message || "Copy failed");
    console.error(error);
  }
};

export default copyToClipboard;
