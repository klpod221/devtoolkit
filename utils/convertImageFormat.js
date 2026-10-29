const convertImageFormat = (image, format) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;

    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;

      img.onload = () => {
        if (format === "svg") {
          const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}"><image href="${e.target.result}" width="${img.width}" height="${img.height}"/></svg>`;
          resolve("data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString));
          return;
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (format === "ico") {
          canvas.width = 32;
          canvas.height = 32;
          ctx.drawImage(img, 0, 0, 32, 32);
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
        }

        const mime = format === "jpg" ? "image/jpeg" : `image/${format}`;
        const dataURL = canvas.toDataURL(mime);
        resolve(dataURL);
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(image);
  });
};

export default convertImageFormat;
