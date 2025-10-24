// utils/imageTools.js
import { FabricImage } from "fabric";

export const addImage = async (canvas, url) => {
  try {
    const img = await FabricImage.fromURL(
      url,
      { crossOrigin: "anonymous" } // still needed for CORS
    );

    img.set({
      left: 100,
      top: 100,
      scaleX: 0.5,
      scaleY: 0.5,
    });

    canvas.add(img);
    canvas.renderAll();
  } catch (err) {
    console.error("Error loading image:", err);
  }
};
