import { useState, useEffect } from "react";
import Inputs from "./ui/Inputs";
function Settings({ canvas }) {
  const [selectedObject, setSelectedObject] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [diameter, setDiameter] = useState("");
  const [color, setColor] = useState("");
  const [radius, setRadius] = useState("");
  const handleObjectSelected = (object) => {
    if (!object) {
      return;
    }
    setSelectedObject(object);
    if (object.type === "rect") {
      setWidth(Math.round(object.width * object.scaleX));
      setHeight(Math.round(object.height * object.scaleY));
      setColor(object.fill);
      setDiameter("");
    } else if (object.type === "text") {
      setDiameter(Math.round(object.radius * 2 * object.scaleX));
      setColor(object.fill);
      setHeight("");
      setWidth("");
    }
  };

  const clearSettings = () => {
    setColor("");
    setHeight("");
    setWidth("");
    setDiameter("");
  };
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        handleObjectSelected(e.selected[0]);
      });
      canvas.on("selection:updated", (e) => {
        handleObjectSelected(e.selected[0]);
      });
      canvas.on("selection:cleared", () => {
        setSelectedObject(null);
        clearSettings();
      });
      canvas.on("object:modified", (e) => {
        handleObjectSelected(e.target);
      });
      canvas.on("object:scaling", (e) => {
        handleObjectSelected(e.target);
      });
    }
  }, [canvas]);
  const handleWidthChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);
    setWidth(intValue);
    if (selectedObject && selectedObject.type === "rect" && intValue >= 0) {
      selectedObject.set({ width: intValue / selectedObject.scaleX });
      canvas.renderAll();
    }
  };
  const handleHeightChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);
    setHeight(intValue);
    if (selectedObject && selectedObject.type === "rect" && intValue >= 0) {
      selectedObject.set({ height: intValue / selectedObject.scaleY });
      canvas.renderAll();
    }
  };
  const handleColorChange = (e) => {
    const value = e.target.value;
    setColor(value);
    if (selectedObject) {
      selectedObject.set({ fill: value });
      caches.renderAll();
    }
  };
  return (
    <div className="bg-white h-full w-[230px]">
      <section className="px-5">
        <h1 className="font-semibold text-xl">Tool Properties</h1>
      </section>
      <hr className="border-gray-200 my-2" />
      <section>
        {selectedObject && selectedObject.type === "rect" && (
          <section className="flex justify-between px-2 flex-wrap gap-3">
            <Inputs icon="W" value={width} onChange={handleWidthChange} />
            <Inputs icon="H" value={height} onChange={handleHeightChange} />
            {/* <Inputs icon="RX" value={height} /> */}
            {/* <Inputs icon="RY" value={height} /> */}
            <Inputs icon="Fill" value={color} onChange={handleColorChange} />
          </section>
        )}
      </section>
    </div>
  );
}

export default Settings;
