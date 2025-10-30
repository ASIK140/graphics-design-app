import Inputs from "./ui/Inputs";

export default function RectProperties({
  width,
  height,
  color,
  onWidthChange,
  onHeightChange,
  onColorChange,
}) {
  return (
    <section className="flex justify-between px-2 flex-wrap gap-3">
      <Inputs icon="W" value={width} onChange={onWidthChange} type="number" />
      <Inputs icon="H" value={height} onChange={onHeightChange} type="number" />
      <Inputs icon="Fill" value={color} onChange={onColorChange} type="color" />
    </section>
  );
}
