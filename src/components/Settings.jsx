import { useFabricSelection } from "../hooks/useFabricSelection";
import RectProperties from "./RectProperties";
import CircleProperties from "./CircleProperties";
import TextProperties from "./TextProperties";

function Settings({ canvas, isSideBarOpen }) {
  const {
    selectedObject,
    width,
    height,
    diameter,
    color,
    stroke,
    strokeColor,
    fontSize,
    font,
    fontWeight,
    textAlign,
    setWidth,
    setHeight,
    setDiameter,
    setColor,
    setStroke,
    setStrokeColor,
    setFontSize,
    setTextAlign,
  } = useFabricSelection(canvas);

  // Handlers (unchanged, but now use hook state)
  const handleWidthChange = (e) => {
    const intValue = parseInt(e.target.value.replace(/,/g, ""), 10);
    setWidth(intValue);
    if (selectedObject?.type === "rect" && intValue >= 0) {
      selectedObject.set({ width: intValue / selectedObject.scaleX });
      canvas.renderAll();
    }
  };

  const handleHeightChange = (e) => {
    const intValue = parseInt(e.target.value.replace(/,/g, ""), 10);
    setHeight(intValue);
    if (selectedObject?.type === "rect" && intValue >= 0) {
      selectedObject.set({ height: intValue / selectedObject.scaleY });
      canvas.renderAll();
    }
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    setColor(value);
    if (selectedObject) {
      selectedObject.set({ fill: value });
      canvas.renderAll();
    }
  };
  const handleStrokeColorChange = (e) => {
    const value = e.target.value;
    setStrokeColor(value);
    if (selectedObject) {
      selectedObject.set({ stroke: value });
      canvas.renderAll();
    }
  };
  const handleDiameterChange = (e) => {
    const intValue = parseInt(e.target.value.replace(/,/g, ""), 10);
    setDiameter(intValue);
    if (selectedObject?.type === "circle" && intValue > 0) {
      selectedObject.set({ radius: intValue / 2 / selectedObject.scaleX });
      canvas.renderAll();
    }
  };
  const handleStrokeChange = (e) => {
    const intValue = parseInt(e.target.value.replace(/,/g, ""), 10);
    setStroke(intValue);
    if (selectedObject?.type === "circle" && intValue >= 0) {
      selectedObject.set({ strokeWidth: intValue });
      canvas.renderAll();
    }
  };
  const handleFontSizeChange = (e) => {
    const intValue = parseInt(e.target.value.replace(/,/g, ""), 10);
    setFontSize(intValue);
    if (selectedObject?.type === "textbox" && intValue > 0) {
      selectedObject.set({ fontSize: intValue });
      canvas.renderAll();
    }
  };
  const handleFontWeightChange = (e) => {
    const value = Number(e.target.value);
    if (selectedObject?.type === "textbox") {
      selectedObject.set({ fontWeight: value });
      canvas.renderAll();
    }
  };
  const handleFontChange = (e) => {
    const value = e.target.value;
    if (selectedObject?.type === "textbox") {
      selectedObject.set({ fontFamily: value });
      canvas.renderAll();
    }
  };
  const handleTextAlign = (e) => {
    const value = e.target.value;
    setTextAlign(value);
    if (selectedObject?.type === "textbox") {
      selectedObject.set({ textAlign: value });
      canvas.renderAll();
    }
  };
  return (
    <div
      className={`bg-white w-[230px] py-2 transition-all fixed md:right-0 z-99 ${
        isSideBarOpen ? "right-0" : "-right-full"
      }
    `}
    >
      <section className="px-5">
        <h1 className="font-semibold text-xl">Tool Properties</h1>
      </section>
      <hr className="border-gray-200 my-2" />

      {selectedObject?.type === "rect" && (
        <RectProperties
          width={width}
          height={height}
          color={color}
          onWidthChange={handleWidthChange}
          onHeightChange={handleHeightChange}
          onColorChange={handleColorChange}
        />
      )}

      {selectedObject?.type === "circle" && (
        <CircleProperties
          diameter={diameter}
          stroke={stroke}
          strokeColor={strokeColor}
          color={color}
          onDiameterChange={handleDiameterChange}
          onStrokeChange={handleStrokeChange}
          onColorChange={handleColorChange}
          onStrokeColorChange={handleStrokeColorChange}
        />
      )}
      {selectedObject?.type === "textbox" && (
        <TextProperties
          fontSize={fontSize}
          onFontSizeChange={handleFontSizeChange}
          fontWeight={fontWeight}
          font={font}
          textAlign={textAlign}
          onFontWeightChange={handleFontWeightChange}
          onColorChange={handleColorChange}
          onFontChange={handleFontChange}
          canvas={canvas}
          onTextAlign={handleTextAlign}
          color={color}
        />
      )}
    </div>
  );
}

export default Settings;
