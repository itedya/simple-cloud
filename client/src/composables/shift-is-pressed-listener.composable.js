window.shiftIsPressed = false;

window.addEventListener("keydown", (e) => {
  if (e.key === "Shift") {
    window.shiftIsPressed = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "Shift") {
    window.shiftIsPressed = false;
  }
});
