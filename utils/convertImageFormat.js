const convertImageFormat = (image, format) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        if (format === "ico") {
          ctx.drawImage(img, 0, 0, 32, 32);
        } else {
          ctx.drawImage(img, 0, 0);
        }

        const dataURL = canvas.toDataURL(`image/${format}`);
        resolve(dataURL);
      };
    };
    reader.readAsDataURL(image);
  });
};

export default convertImageFormat;
