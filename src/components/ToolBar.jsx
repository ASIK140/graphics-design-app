import { useState } from "react";
import ToolButton from "./ui/ToolButton";
import { FaTextHeight, FaIcons, FaListUl, FaUpload } from "react-icons/fa6";
import { IoImagesSharp } from "react-icons/io5";
import { FaShapes, FaPaintBrush } from "react-icons/fa";
import ToolModal from "./modal/ToolModal";

function ToolBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavClick = (item) => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };
  return (
    <div className="bg-white h-full w-[230px] relative">
      <ToolModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4"> Modal</h2>
        <p className="text-gray-600">This is the modal content for.</p>
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
        <h1 className="text-xl font-semibold px-3 text-gray-500">Elements</h1>
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
  );
}

export default ToolBar;
