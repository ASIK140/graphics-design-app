// utils/pageUtils.js
// Works with Fabric.js v6

// Helper: set a default background (white) and size, then render.
export const initBlankCanvas = (
  canvas,
  { width = 300, height = 425, backgroundColor = "#ffffff" } = {}
) => {
  if (!canvas) return;
  canvas.setWidth(width);
  canvas.setHeight(height);
  // Fabric v6: set background color then render
  canvas.backgroundColor = backgroundColor;
  canvas.requestRenderAll();
};

// Create a brand-new blank page and make it active
export const createNewPage = ({
  canvas,
  canvasList,
  setCanvasList,
  setActivePage,
}) => {
  const id = Date.now();
  const json = {
    version: "6.7.1",
    background: "#ffffff",
  };
  // Push the new page (empty JSON) into the list
  setCanvasList([
    ...canvasList,
    {
      id,
      json,
    },
  ]);
  setActivePage(id);
  canvas.loadFromJSON(json).then(() => {
    canvas.requestRenderAll();
  });
};

export const duplicateCurrentPage = ({
  canvas,
  canvasList,
  setCanvasList,
  setActivePage,
}) => {
  if (!canvas) return;
  const json = canvas.toJSON();

  const id = Date.now();
  setCanvasList([...canvasList, { id, json }]);
  setActivePage(id);
  canvas.loadFromJSON(json).then(() => {
    canvas.requestRenderAll();
  });
};

// Load a page JSON (or blank if null) into the Fabric canvas
export const loadPageToCanvas = ({ canvas, json }) => {
  if (!canvas) return;

  if (!json) {
    return;
  }
  canvas.loadFromJSON(json).then(() => {
    canvas.requestRenderAll();
  });
};
