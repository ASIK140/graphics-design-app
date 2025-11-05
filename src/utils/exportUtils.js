export const exportAsPNG = (canvas) => {
  const fileName = prompt("Enter file name:") || "canvas";
  const dataURL = canvas.toDataURL({
    format: "png",
    quality: 1.0,
    multiplier: 4,
  });

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = fileName + ".png";
  link.click();
};

export const saveCanvasState = (canvas) => {
  const fileName = prompt("Enter file name:") || "canvas";
  const json = canvas.toJSON();
  const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName + ".json";
  link.click();
  URL.revokeObjectURL(url);
};

export const handleFileOpen = (e, canvas) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    canvas.clear();
    canvas
      .loadFromJSON(event.target.result)
      .then(() => canvas.requestRenderAll());
  };
  reader.readAsText(file);
  e.target.value = null;
};
