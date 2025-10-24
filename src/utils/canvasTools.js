// utils/canvasTools.js
import { Rect, Circle, Triangle, Textbox } from "fabric";

export const addSquare = (canvas) => {
  canvas.add(
    new Rect({ top: 100, left: 50, width: 100, height: 100, fill: "#000" })
  );
};

export const addRoundedSquare = (canvas) => {
  canvas.add(
    new Rect({
      top: 100,
      left: 50,
      width: 100,
      height: 100,
      fill: "#000",
      rx: 10,
      ry: 10,
    })
  );
};

export const addCircle = (canvas) => {
  canvas.add(
    new Circle({
      radius: 50,
      fill: "#000",
      left: 100,
      top: 100,
      stroke: "black",
      strokeWidth: 2,
    })
  );
};

export const addTriangle = (canvas) => {
  canvas.add(
    new Triangle({ top: 100, left: 70, width: 100, height: 100, fill: "#000" })
  );
};

export const addHeadingText = (canvas) => {
  canvas.add(
    new Textbox("Your Text Here", {
      left: 100,
      top: 100,
      fontSize: 60,
      width: 300,
      fill: "black",
      fontWeight: "bold",
      textAlign: "center",
    })
  );
};

export const addSubHeadingText = (canvas) => {
  canvas.add(
    new Textbox("Your Text Here", {
      left: 100,
      top: 100,
      fontSize: 30,
      width: 250,
      fill: "black",
      fontWeight: "bold",
      textAlign: "center",
    })
  );
};

export const addSimpleText = (canvas) => {
  canvas.add(
    new Textbox("Your Text Here", {
      left: 100,
      top: 100,
      fontSize: 20,
      width: 200,
      fill: "black",
      textAlign: "center",
    })
  );
};
