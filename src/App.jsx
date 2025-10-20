import { Canvas } from "fabric";
import { useRef, useEffect, useState } from "react";
import Header from "./components/Header";
import ToolBar from "./components/ToolBar";
import ToolProperties from "./components/ToolProperties";

function App() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 600,
      });
      initCanvas.backgroundColor = "#fff";
      initCanvas.renderAll();
      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);
  return (
    <div className="bg-gray-300 flex h-screen  w-full flex-col">
      <Header />
      <main className="flex justify-between flex-1 items-center">
        <ToolBar />
        <canvas ref={canvasRef}></canvas>
        <ToolProperties />
      </main>
    </div>
  );
}

export default App;
