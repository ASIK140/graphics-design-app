import { Canvas, Circle, Rect, Textbox, Triangle } from "fabric";
import { useRef, useEffect, useState } from "react";
import Header from "./components/Header";
import ToolBar from "./components/ToolBar";
import ToolProperties from "./components/ToolProperties";
import { FaSquareFull, FaSquare, FaCircle } from "react-icons/fa";
import ToolButton from "./components/ui/ToolButton";
import { FaTextHeight, FaIcons, FaListUl, FaUpload } from "react-icons/fa6";
import { IoImagesSharp } from "react-icons/io5";
import { FaShapes, FaPaintBrush } from "react-icons/fa";
import ToolModal from "./components/modal/ToolModal";
import TextTool from "./components/ui/TextTool";
import ImageTool from "./components/ui/ImageTool";
import ShapeTool from "./components/ui/ShapeTool";
function App() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tool, setTool] = useState(null);
  const handleNavClick = (item) => {
    setIsModalOpen(true);
    setTool(item);
  };
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
  const Square = () => {
    if (canvas) {
      const rect = new Rect({
        top: 100,
        left: 50,
        width: 100,
        height: 100,
        fill: "#000",
      });
      canvas.add(rect);
    }
  };
  const CircleAdd = () => {
    if (canvas) {
      const circle = new Circle({
        radius: 50,
        fill: "#000",
        left: 100,
        top: 100,
        stroke: "black",
        strokeWidth: 2,
      });
      canvas.add(circle);
    }
  };
  const TriangleAdd = () => {
    if (canvas) {
      const triangle = new Triangle({
        top: 100,
        left: 50,
        width: 100,
        height: 100,
        fill: "#000",
      });
      canvas.add(triangle);
    }
  };
  const HeadingText = () => {
    if (canvas) {
      const text = new Textbox("Your Text Here", {
        left: 100,
        top: 100,
        fontSize: 60,
        width: 300,
        fill: "black",
        fontFamily: "Arial",
        fontWeight: "bold",
        textAlign: "center",
      });
      canvas.add(text);
    }
  };
  const SubHeadingText = () => {
    if (canvas) {
      const text = new Textbox("Your Text Here", {
        left: 100,
        top: 100,
        fontSize: 30,
        width: 250,
        fill: "black",
        fontFamily: "Arial",
        fontWeight: "bold",
        textAlign: "center",
      });
      canvas.add(text);
    }
  };
  const SimpleText = () => {
    if (canvas) {
      const text = new Textbox("Your Text Here", {
        left: 100,
        top: 100,
        fontSize: 20,
        width: 200,
        fill: "black",
        fontFamily: "Arial",
        textAlign: "center",
      });
      canvas.add(text);
    }
  };
  const handler = {
    addSquare: Square,
    addCircle: CircleAdd,
    addHeadingText: HeadingText,
    addSubHeadingText: SubHeadingText,
    addSimpleText: SimpleText,
    addTriangle: TriangleAdd,
  };
  return (
    <div className="bg-gray-300 flex h-screen  w-full flex-col">
      <Header />
      <main className="flex justify-between flex-1 items-center">
        <div className="bg-white h-full w-[230px] relative">
          <ToolModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {tool == "Text" ? <TextTool action={handler} /> : null}
            {tool == "Images" ? <ImageTool /> : null}
            {tool == "Shapes" ? <ShapeTool action={handler} /> : null}
          </ToolModal>

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
          </section>
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
        </div>
        <canvas ref={canvasRef}></canvas>
        <ToolProperties />
      </main>
    </div>
  );
}

export default App;
