// utils/handleObjectSelected.js
export function handleObjectSelected(object, setters) {
  if (!object) return;

  const {
    setSelectedObject,
    setWidth,
    setHeight,
    setDiameter,
    setColor,
    setStroke,
    setStrokeColor,
    setFont,
    setFontSize,
    setFontWeight,
    setTextAlign,
  } = setters;

  setSelectedObject(object);

  switch (object.type) {
    case "rect":
      setWidth(Math.round(object.width * object.scaleX));
      setHeight(Math.round(object.height * object.scaleY));
      setColor(object.fill || "");
      setDiameter("");
      // setRadiusX(object.rx || "");
      // setRadiusY(object.ry || "");
      break;

    case "circle":
      setDiameter(Math.round(object.radius * 2 * object.scaleX));
      setColor(object.fill || "");
      setStroke(object.strokeWidth);
      setStrokeColor(object.stroke);
      setWidth("");
      setHeight("");
      break;

    case "triangle":
      setWidth(Math.round(object.width * object.scaleX));
      setHeight(Math.round(object.height * object.scaleY));
      setColor(object.fill || "");
      setDiameter("");
      break;

    case "textbox":
      setWidth(Math.round(object.width * object.scaleX));
      setHeight(Math.round(object.height * object.scaleY));
      setColor(object.fill || "");
      setFont(object.fontFamily);
      setFontSize(object.fontSize);
      setFontWeight(object.fontWeight);
      setTextAlign(object.textAlign);
      setDiameter("");
      break;

    default:
      // fallback for unsupported types
      setWidth("");
      setHeight("");
      setDiameter("");
      setColor(object.fill || "");
      break;
  }
}
