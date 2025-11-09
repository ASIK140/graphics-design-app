import Inputs from "./ui/Inputs";
const fonts = [
  // System fonts
  { name: "Arial", category: "sans-serif" },
  { name: "Helvetica", category: "sans-serif" },
  { name: "Verdana", category: "sans-serif" },
  { name: "Tahoma", category: "sans-serif" },
  { name: "Trebuchet MS", category: "sans-serif" },
  { name: "Gill Sans", category: "sans-serif" },
  { name: "Segoe UI", category: "sans-serif" },

  { name: "Times New Roman", category: "serif" },
  { name: "Georgia", category: "serif" },
  { name: "Palatino Linotype", category: "serif" },
  { name: "Book Antiqua", category: "serif" },
  { name: "Garamond", category: "serif" },

  { name: "Courier New", category: "monospace" },
  { name: "Lucida Console", category: "monospace" },
  { name: "Monaco", category: "monospace" },
  { name: "Consolas", category: "monospace" },

  { name: "Impact", category: "display" },
  { name: "Comic Sans MS", category: "display" },
  { name: "Noto Sans Bengali", category: "serif" },
];
function TextProperties({
  fontSize,
  onFontSizeChange,
  fontWeight,
  onFontChange,
  color,
  onColorChange,
  font,
  onFontWeightChange,
  textAlign,
  onTextAlign,
}) {
  return (
    <div className="px-4">
      <section className="flex flex-col mb-2">
        <label htmlFor="" className="font-bold">
          Typography
        </label>
        <section>
          <select
            className="bg-gray-100 text-sm py-1 px-1 border-2 border-black-200 mt-2 w-full"
            onChange={onFontChange}
          >
            <option className="hidden">{font}</option>
            {fonts.map((font, index) => (
              <option
                key={index}
                value={font.name}
                style={{ fontFamily: font.name }}
              >
                {font.name}
              </option>
            ))}
          </select>
          <section className="flex justify-between items-center mt-3 mb-3">
            <select
              onChange={onFontWeightChange}
              className="bg-gray-100 text-sm py-1 px-1 border-2 border-black-200 w-1/2  h-8"
            >
              <option className="hidden">
                {fontWeight == 300 && "Light"}
                {fontWeight == 400 && "Regular"}
                {fontWeight == 500 && "Medium"}
                {fontWeight == 600 && "Semi-Bold"}
                {fontWeight == 700 && "Bold"}
                {fontWeight == 800 && "Extra-Bold"}
              </option>
              <option value={300}>Light</option>
              <option value={400}>Regular</option>
              <option value={500}>Medium</option>
              <option value={600}>Semi-Bold</option>
              <option value={700}>Bold</option>
              <option value={800}>Extra-Bold</option>
            </select>

            <input
              type="number"
              className="bg-gray-100 outline-0 w-[70px] h-8 ml-2 pl-2"
              value={fontSize}
              onChange={onFontSizeChange}
            />
          </section>
          <section className="flex gap-2">
            <Inputs
              icon="Fill"
              type="color"
              value={color}
              onChange={onColorChange}
            />
            <select
              className="bg-gray-100 text-sm capitalize py-1 px-1 border-2 border-black-200 w-1/2  h-8"
              onChange={onTextAlign}
            >
              <option className="hidden">{textAlign}</option>
              <option value="center">Center</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </section>
        </section>
      </section>
    </div>
  );
}

export default TextProperties;
