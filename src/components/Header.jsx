import React, { useRef } from "react";

function Header({ onExport, onOpen, onSave }) {
  const fileInputRef = useRef(null);
  return (
    <header className="flex justify-between bg-white py-3 px-5 items-center">
      <div>LOGO</div>
      <section className="flex gap-2">
        <button
          className="bg-[#11224E] p-2 rounded-md text-white px-5 cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        >
          Open Work
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }} // Hide the default input
          accept=".json, application/json" // Only accept JSON files
          onChange={onOpen}
        />
        <button
          className="bg-[#FFC50F] p-2 rounded-md text-black px-5 cursor-pointer"
          onClick={onSave}
        >
          Save Work
        </button>
        <button
          className="bg-blue-500 p-2 rounded-md text-white px-5 cursor-pointer"
          onClick={onExport}
        >
          Export
        </button>
      </section>
    </header>
  );
}

export default Header;
