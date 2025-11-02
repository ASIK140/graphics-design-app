// src/hooks/useUndoRedo.js
import { useRef } from "react";

export default function useUndoRedo(canvas) {
  const undoStack = useRef([]);

  const saveState = () => {
    if (!canvas) return;
    const json = canvas.toJSON();
    undoStack.current.push(json);
  };

  const undo = () => {
    if (!canvas || undoStack.current.length <= 1) return;
    const current = undoStack.current.pop();
    const prev = undoStack.current[undoStack.current.length - 1];
    canvas.loadFromJSON(prev).then((canvas) => canvas.requestRenderAll());
  };

  return { saveState, undo };
}
