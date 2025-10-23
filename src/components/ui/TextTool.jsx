import React from "react";

function TextTool({ action }) {
  return (
    <div>
      <section>
        <h1 className=" font-semibold mb-2">Text style</h1>
        <hr className="border-gray-300" />
      </section>
      <section className="mt-2">
        <button
          className="border-gray-200 border-2 w-full rounded-sm h-10 text-2xl font-bold cursor-pointer mb-2 hover:bg-gray-200 transition-all"
          onClick={action.addHeadingText}
        >
          Heading
        </button>
        <button
          className="border-gray-200 border-2 w-full rounded-sm h-10 text-md font-bold cursor-pointer mb-2 hover:bg-gray-200 transition-all "
          onClick={action.addSubHeadingText}
        >
          Sub-Heading
        </button>
        <button
          className="border-gray-200 border-2 w-full rounded-sm h-10  cursor-pointer mb-2 hover:bg-gray-200 transition-all"
          onClick={action.addSimpleText}
        >
          Simple Text
        </button>
      </section>
    </div>
  );
}

export default TextTool;
