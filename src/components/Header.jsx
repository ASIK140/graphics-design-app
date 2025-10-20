import React from "react";

function Header() {
  return (
    <header className="flex justify-between bg-white py-3 px-5 items-center">
      <div>LOGO</div>
      <button className="bg-blue-500 p-2 rounded-md text-white px-5 cursor-pointer ">
        Export
      </button>
    </header>
  );
}

export default Header;
