import { useEffect, useState, useCallback } from "react";

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
import LogoTool from "./components/ui/LogoTool";
import { addLogo } from "./utils/LogoTool";
import UploadTool from "./components/ui/UploadTool";
import SchoolNameTool from "./components/ui/SchoolNameTool";
import { Textbox } from "fabric";
import useUndoRedo from "./hooks/useUndoRedo";

function App() {
  const { canvasRef, canvas } = useFabricCanvas({ width: 430, height: 600 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tool, setTool] = useState(null);
  const { undo, saveState } = useUndoRedo(canvas);

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
    addWordArt_1: () => tools.addWordArt_1(canvas),
    addWordArt_2: () => tools.addWordArt_2(canvas),
    addWordArt_3: () => tools.addWordArt_3(canvas),
    addWordArt_4: () => tools.addWordArt_4(canvas),
    addWordArt_5: () => tools.addWordArt_5(canvas),
    addWordArt_6: () => tools.addWordArt_6(canvas),
    addWordArt_7: () => tools.addWordArt_7(canvas),
  };

  const deleteActiveObject = useCallback(
    (e) => {
      if (e.key === "Delete") {
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
    },
    [canvas]
  );
  const addSchoolNameText = (text) => {
    canvas.add(
      new Textbox(text, {
        left: 100,
        top: 100,
        fontSize: 60,
        width: 300,
        fill: "black",
        fontWeight: 500,
        textAlign: "center",
      })
    );
  };

  useEffect(() => {
    if (!canvas) {
      document.removeEventListener("keydown", deleteActiveObject);
      return;
    }

    canvas.on("object:added", saveState);
    canvas.on("object:modified", saveState);
    canvas.on("object:removed", saveState);
    document.addEventListener("keydown", deleteActiveObject);

    return () => {
      document.removeEventListener("keydown", deleteActiveObject);
      canvas.off("object:added", saveState);
      canvas.off("object:modified", saveState);
      canvas.off("object:removed", saveState);
    };
  }, [canvas, deleteActiveObject, saveState]);
  const exportAsPNG = () => {
    const fileName = prompt("Enter file name:");
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1.0,
        multiplier: 1,
      });

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = fileName; // File name

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const saveCanvasState = () => {
    const fileName = prompt("Enter file name:");
    if (canvas) {
      const json = canvas.toJSON();

      const jsonString = JSON.stringify(json);

      const blob = new Blob([jsonString], { type: "application/json" });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };
  const handleFileOpen = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const json = event.target.result;

      if (canvas) {
        canvas.clear();
        canvas.loadFromJSON(json).then((canvas) => canvas.requestRenderAll());
      }
    };
    reader.readAsText(file);

    // Clear the input value to allow re-selection of the same file
    e.target.value = null;
  };
  return (
    <div className="bg-gray-300 flex h-screen w-full flex-col">
      <Header
        onExport={exportAsPNG}
        onSave={saveCanvasState}
        onOpen={handleFileOpen}
        undo={undo}
      />
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
            {tool === "School Logo" && (
              <LogoTool
                addBackground={(url) => {
                  addLogo(canvas, url);
                }}
              />
            )}
            {tool === "Upload" && <UploadTool canvas={canvas} />}
            {tool === "School Name" && (
              <SchoolNameTool
                addSchoolName={(text) => addSchoolNameText(text)}
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
