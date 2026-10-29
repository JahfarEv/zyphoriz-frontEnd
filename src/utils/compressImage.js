const MAX_IMAGE_DIMENSION = 1920;
const WEBP_QUALITY = 0.82;

export const compressImage = async (file) => {
  const bitmap = await createImageBitmap(file);

  try {
    const scale = Math.min(
      1,
      MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Unable to prepare image for compression.");
    }

    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const compressedBlob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Unable to compress this image."));
        },
        "image/webp",
        WEBP_QUALITY,
      );
    });

    if (compressedBlob.size >= file.size) return file;

    const fileName = file.name.replace(/\.[^.]+$/, "") || "image";
    return new File([compressedBlob], `${fileName}.webp`, {
      type: "image/webp",
      lastModified: file.lastModified,
    });
  } finally {
    bitmap.close();
  }
};
