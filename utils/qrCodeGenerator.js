import QRCode from "qrcode";

const DEFAULT_OPTIONS = {
  width: 500,
  margin: 1,
  errorCorrectionLevel: "M",
  type: "image/png",
  quality: 1,
  color: {
    dark: "#000000",
    light: "#ffffff",
  },
};

const qrCodeGenerator = async (input, options) => {
  try {
    const url = await QRCode.toDataURL(input, { ...DEFAULT_OPTIONS, ...options });
    return url;
  } catch (error) {
    console.error(error);
  }
};

export default qrCodeGenerator;
