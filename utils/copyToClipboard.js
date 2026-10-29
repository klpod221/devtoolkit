import { toast } from "react-toastify";

const copyToClipboard = async (text) => {
  try {
    if (!navigator.clipboard) {
      toast.error("Clipboard API not available");
      return;
    }

    if (text === null || text === undefined || text === "") {
      toast.error("No text to copy");
      return;
    }

    const str = typeof text === "string" ? text : String(text);

    if (!str.trim()) {
      toast.error("No text to copy");
      return;
    }

    await navigator.clipboard.writeText(str);
    toast.success("Copied to clipboard!");
  } catch (error) {
    toast.error(error.message || "Copy failed");
    console.error(error);
  }
};

export default copyToClipboard;
