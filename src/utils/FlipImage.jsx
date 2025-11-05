// utils/flip.ts
import type { Canvas, FabricObject } from "fabric";

type Dir = "horizontal" | "vertical";

export function flipSelected(canvas: Canvas, dir: Dir = "horizontal") {
  const active = canvas.getActiveObject();

  if (!active) return;

  // If it's a group, flip each item
  if ((active as any)._objects && Array.isArray((active as any)._objects)) {
    (active as any)._objects.forEach((obj: FabricObject) => {
      if (dir === "horizontal") obj.set("flipX", !obj.flipX);
      else obj.set("flipY", !obj.flipY);
      obj.setCoords();
    });
  } else {
    if (dir === "horizontal") active.set("flipX", !active.flipX);
    else active.set("flipY", !active.flipY);
    active.setCoords();
  }

  canvas.requestRenderAll();
}
