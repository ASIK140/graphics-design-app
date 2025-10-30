import Inputs from "./ui/Inputs";

export default function CircleProperties({
  diameter,
  color,
  stroke,
  strokeColor,
  onDiameterChange,
  onColorChange,
  onStrokeChange,
  onStrokeColorChange,
}) {
  return (
    <section className="flex justify-between px-2 flex-wrap gap-3">
      <Inputs
        icon="R"
        value={diameter}
        onChange={onDiameterChange}
        type="number"
      />
      <Inputs icon="Fill" value={color} onChange={onColorChange} type="color" />
      <Inputs icon="S" value={stroke} onChange={onStrokeChange} type="number" />
      <Inputs
        icon="Fill"
        value={strokeColor}
        onChange={onStrokeColorChange}
        type="color"
      />
    </section>
  );
}
