import { useEffect, useState, useCallback } from "react";

import Header from "./components/Header";
import ToolModal from "./components/modal/ToolModal";
import ToolButton from "./components/ui/ToolButton";
import TextTool from "./components/ui/TextTool";
import ImageTool from "./components/ui/ImageTool";
import ShapeTool from "./components/ui/ShapeTool";

import { IoMenu, IoSettings } from "react-icons/io5";

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
import { RiSendToBack, RiBringToFront } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";
import { FaBuilding } from "react-icons/fa";
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
  const { canvasRef, canvas } = useFabricCanvas({ width: 300, height: 425 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSideBarOpen, setSideBarOpen] = useState(false); // Used for mobile off-canvas menu
  const [tool, setTool] = useState(null);
  const { undo, saveState } = useUndoRedo(canvas);

  const [showDelete, setShowDelete] = useState(false);

  const handleNavClick = (item) => {
    setIsModalOpen(true);
    setTool(item);
  };

  const bringForward = () => {
    const active = canvas.getActiveObject();
    if (active) {
      canvas.bringObjectForward(active);
      canvas.requestRenderAll();
    }
  };
  const sendBackward = () => {
    const active = canvas.getActiveObject();
    if (active) {
      canvas.sendObjectBackwards(active);
      canvas.requestRenderAll();
    }
  };

  // Toggles the mobile sidebar
  const handleSideBar = () => {
    setSideBarOpen(!isSideBarOpen);
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
        e.preventDefault();

        if (canvas) {
          const activeObjects = canvas.getActiveObjects();

          if (activeObjects.length > 0) {
            activeObjects.forEach((obj) => {
              canvas.remove(obj);
            });

            canvas.discardActiveObject();
            canvas.requestRenderAll();
          }
        }
      }
    },
    [canvas]
  );
  const handleDelete = () => {
    const activeObjects = canvas.getActiveObjects();

    if (activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        canvas.remove(obj);
      });

      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };

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

    canvas.on("selection:created", () => setShowDelete(true));
    canvas.on("selection:updated", () => setShowDelete(true));
    canvas.on("selection:cleared", () => setShowDelete(false));

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
        multiplier: 4,
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
    <div className="bg-gray-300 flex h-screen w-full flex-col overflow-hidden">
      <Header
        onExport={exportAsPNG}
        onSave={saveCanvasState}
        onOpen={handleFileOpen}
        undo={undo}
      />
      {/* Top bar with Menu icon (always visible) and Settings icon */}
      <section className="w-full bg-gray-100 text-2xl flex justify-between px-7 py-3 md:hidden">
        {/* Menu icon to toggle the mobile sidebar */}
        {/* <IoMenu className="cursor-pointer" onClick={handleSideBar} /> */}
        <section className="flex gap-5">
          {showDelete && (
            <section className="absolute bottom-3 left-33 z-10 flex items-center gap-2 bg-white px-4 py-2 rounded-xl">
              <button
                className="text-3xl text-red-500 cursor-pointer"
                onClick={handleDelete}
              >
                <IoIosCloseCircle />
              </button>
              <button onClick={sendBackward} className="text-3xl">
                <RiSendToBack />
              </button>
              <button onClick={bringForward} className="text-3xl">
                <RiBringToFront />
              </button>
            </section>
          )}
          <FaTextHeight onClick={() => handleNavClick("Text")} />
          <IoImagesSharp onClick={() => handleNavClick("Images")} />
          <FaShapes onClick={() => handleNavClick("Shapes")} />
          <FaPaintBrush onClick={() => handleNavClick("Background")} />
          <FaIcons onClick={() => handleNavClick("School Logo")} />
          <FaBuilding onClick={() => handleNavClick("School Name")} />
          <FaUpload onClick={() => handleNavClick("Upload")} />
        </section>
        <IoSettings className="cursor-pointer" onClick={handleSideBar} />
      </section>

      {/* Main Content Area */}
      <main className="flex flex-1 overflow-hidden">
        <div
          className={`
            bg-white h-full w-[230px] z-20 transition-all duration-300 
            md:relative md:inline md:translate-x-0 fixed -left-60 md:left-0
          `}
        >
          {/* Tool Modals Content (now inside the sidebar div for organization) */}
          <section className="h-full overflow-y-auto">
            <ToolModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            >
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

            {/* Sidebar Tools List */}
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
          </section>
        </div>

        {/* Backdrop for mobile sidebar (optional, but improves UX) */}

        {/* Canvas and Settings Wrapper */}
        <div className="flex justify-center items-center h-scree w-full relative">
          <canvas ref={canvasRef}></canvas>
        </div>
        <Settings canvas={canvas} isSideBarOpen={isSideBarOpen} />
      </main>
    </div>
  );
}

export default App;
