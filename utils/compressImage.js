import { fromBlob } from "image-resize-compress";
import imageToBase64 from "./imageToBase64";

const compressImage = async (image, level) => {
  const blob = await fromBlob(image, level / 10);
  console.log("blob", blob);
  return blob;
};

export default compressImage;
