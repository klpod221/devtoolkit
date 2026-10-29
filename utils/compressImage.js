import { fromBlob } from "image-resize-compress";

const compressImage = async (image, level) => {
  const blob = await fromBlob(image, level / 10);
  return blob;
};

export default compressImage;
