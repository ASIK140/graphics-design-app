import { useEffect, useState } from "react";

import Header from "./components/Header";
import ToolModal from "./components/modal/ToolModal";
import ToolButton from "./components/ui/ToolButton";
import TextTool from "./components/ui/TextTool";
import ImageTool from "./components/ui/ImageTool";
import ShapeTool from "./components/ui/ShapeTool";

import useFabricCanvas from "./hooks/useFabricCanvas";
import * as tools from "./utils/canvasTools";
import { addImage } from "./utils/imageTools";
import { addBG } from "./utils/backGroundTool";
import {
  FaTextHeight,
  FaIcons,
  FaListUl,
  FaUpload,
  FaShapes,
} from "react-icons/fa6";
import { FaPaintBrush } from "react-icons/fa";
import { IoImagesSharp } from "react-icons/io5";
import Settings from "./components/Settings";
import BGTool from "./components/ui/BGTool";

function App() {
  const { canvasRef, canvas } = useFabricCanvas({ width: 430, height: 600 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tool, setTool] = useState(null);

  const handleNavClick = (item) => {
    setIsModalOpen(true);
    setTool(item);
  };

  const handler = {
    addSquare: () => tools.addSquare(canvas),
    addRounded: () => tools.addRoundedSquare(canvas),
    addCircle: () => tools.addCircle(canvas),
    addTriangle: () => tools.addTriangle(canvas),
    addHeadingText: () => tools.addHeadingText(canvas),
    addSubHeadingText: () => tools.addSubHeadingText(canvas),
    addSimpleText: () => tools.addSimpleText(canvas),
  };

  const deleteActiveObject = (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      // Prevent default browser behavior (like navigating back)
      e.preventDefault();

      if (canvas) {
        // Get all selected objects (handles single or multi-selection)
        const activeObjects = canvas.getActiveObjects();

        if (activeObjects.length > 0) {
          // Remove each object
          activeObjects.forEach((obj) => {
            canvas.remove(obj);
          });

          // Clear the selection controls and re-render
          canvas.discardActiveObject();
          canvas.requestRenderAll();
        }
      }
    }
  };

  useEffect(() => {
    if (!canvas) {
      document.removeEventListener("keydown", deleteActiveObject);
      return;
    }

    document.addEventListener("keydown", deleteActiveObject);

    return () => {
      document.removeEventListener("keydown", deleteActiveObject);
    };
  }, [canvas]);
  return (
    <div className="bg-gray-300 flex h-screen w-full flex-col">
      <Header />
      <main className="flex justify-between flex-1 items-center">
        <div className="bg-white h-full w-[230px] relative">
          <ToolModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {tool === "Text" && <TextTool action={handler} />}
            {tool === "Images" && (
              <ImageTool action={(url) => addImage(canvas, url)} />
            )}
            {tool === "Shapes" && <ShapeTool action={handler} />}
            {tool === "Background" && (
              <BGTool
                addBackground={(url) => {
                  addBG(canvas, url);
                }}
              />
            )}
          </ToolModal>

          {/* Sidebar */}
          <section className="mt-5">
            <h1 className="text-xl font-semibold px-3 text-gray-500">
              Design Tools
            </h1>
            <section className="my-4">
              <ToolButton
                text="Text"
                icon={<FaTextHeight />}
                onToolClick={handleNavClick}
              />
              <ToolButton
                text="Images"
                icon={<IoImagesSharp />}
                onToolClick={handleNavClick}
              />
              <ToolButton
                text="Shapes"
                icon={<FaShapes />}
                onToolClick={handleNavClick}
              />
              <ToolButton
                text="Background"
                icon={<FaPaintBrush />}
                onToolClick={handleNavClick}
              />
            </section>
            <hr className="border-gray-200" />
            <section className="my-5">
              <h1 className="text-xl font-semibold px-3 text-gray-500">
                Elements
              </h1>
              <section className="mt-4">
                <ToolButton
                  text="School Name"
                  icon={<FaIcons />}
                  onToolClick={handleNavClick}
                />
                <ToolButton
                  text="School Logo"
                  icon={<FaListUl />}
                  onToolClick={handleNavClick}
                />
                <ToolButton
                  text="Upload"
                  icon={<FaUpload />}
                  onToolClick={handleNavClick}
                />
              </section>
            </section>
          </section>
        </div>

        <canvas ref={canvasRef}></canvas>
        <Settings canvas={canvas} />
      </main>
    </div>
  );
}

export default App;
