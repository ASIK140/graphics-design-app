// // Example modular function to add curved text (left-bottom → right-bottom)
// import { Path, Textbox, Group } from "fabric";

// export const addWordCurve = (canvas) => {
//   const text = "Your School Name";
//   const radius = 150; // how round the curve is
//   const centerX = canvas.width / 2;
//   const centerY = canvas.height / 2 + 50;
//   const startAngle = -Math.PI / 1.3; // where text starts
//   const angleStep = (Math.PI * 2) / text.length; // spread of characters

//   const letters = [];

//   for (let i = 0; i < text.length; i++) {
//     const char = text[i];
//     const angle = startAngle + i * angleStep;

//     const x = centerX + radius * Math.cos(angle);
//     const y = centerY + radius * Math.sin(angle);

//     const letter = new Textbox(char, {
//       left: x,
//       top: y,
//       originX: "center",
//       originY: "center",
//       angle: (angle * 180) / Math.PI + 90, // rotate character
//       fontSize: 28,
//       fontFamily: "Poppins",
//       fill: "#333",
//     });

//     letters.push(letter);
//   }

//   const curvedTextGroup = new Group(letters, {
//     originX: "center",
//     originY: "center",
//     selectable: true,
//     left: centerX,
//     top: centerY,
//   });

//   canvas.add(curvedTextGroup);
//   canvas.renderAll();
// };

// Curved text, left-bottom → right-bottom, upright (no mirroring)
import { Group, Textbox } from "fabric";

export const addWordCurve = (canvas, str = "Fabric.js Curved Text") => {
  const radius = 150;
  const centerX = canvas.getWidth() / 2;
  const centerY = canvas.getHeight() / 2 + 80;
  str = prompt("Enter Your Text");
  // Span an arc centered at the bottom (3π/2)
  const baseAngle = Math.PI * 1.5; // bottom center
  const arc = Math.PI / 1.25; // how wide the curve is
  const start = baseAngle - arc / 2; // left-bottom
  const step = arc / (str.length - 1); // even spread

  const letters = [];

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const theta = start + i * step;

    const x = centerX + radius * Math.cos(theta);
    const y = centerY + radius * Math.sin(theta);

    // Tangent rotation so letters are upright on the outside of the circle
    const angleDeg = (theta * 180) / Math.PI + 90;

    letters.push(
      new Textbox(ch, {
        left: x,
        top: y,
        originX: "center",
        originY: "center",
        angle: angleDeg,
        fontSize: 30,
        fontFamily: "Arial",
        fontWeight: 700,
        fill: "#333",
      })
    );
  }

  const group = new Group(letters, {
    originX: "center",
    originY: "center",
    left: centerX,
    top: centerY,
    selectable: true,
  });

  canvas.add(group);
  canvas.requestRenderAll();
};
