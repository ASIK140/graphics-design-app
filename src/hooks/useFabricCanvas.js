// hooks/useFabricCanvas.js
import { useEffect, useRef, useState } from "react";
import { Canvas } from "fabric";

export default function useFabricCanvas({ width = 500, height = 600 }) {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, { width, height });
      initCanvas.backgroundColor = "#ffffff";
      initCanvas.renderAll();
      setCanvas(initCanvas);
      return () => initCanvas.dispose();
    }
  }, [width, height]);

  return { canvasRef, canvas };
}
