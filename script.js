const sketchGrid = document.querySelector("#sketchGrid");
const clearButton = document.querySelector("#clearButton");
const gridSizeInput = document.querySelector("#resolution");
const colorInput = document.querySelector("#colorPicker");
const saveButton = document.querySelector("#saveButton");
const gridSizeOutput = document.querySelector(".gridInfo");
const eraseToggle = document.querySelector("#eraseToggle");

clearButton.addEventListener("click", eraseGrid);
saveButton.addEventListener("click", saveChanges);
colorInput.addEventListener("input", updateColor);
eraseToggle.addEventListener("input", toggleErase);

let penColor = "black";
let rows = 16;
let cols = 16;
let isMouseDown = false;
let isErasing = false;

// Track mouse state
document.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

createGrid();

function changeColor(e) {
  if (isMouseDown && !isErasing) {
    e.target.style.backgroundColor = penColor;
  } else if (isMouseDown && isErasing) {
    e.target.style.backgroundColor = "white";
  }
}

function createGrid() {
  for (let i = 0; i < rows * cols; i++) {
    const box = document.createElement("div");
    box.classList.add("gridBox");
    box.style.width = `${600 / cols - 2}px`;
    box.style.height = `${600 / rows - 2}px`;

    // Draw on mouseover (when dragging)
    box.addEventListener("mouseover", changeColor);

    // Draw immediately on mousedown (when clicking)
    box.addEventListener("mousedown", (e) => {
      if (isErasing) {
        e.target.style.backgroundColor = "white";
      } else {
        e.target.style.backgroundColor = penColor;
      }
    });

    sketchGrid.appendChild(box);
  }
}

function eraseGrid() {
  const boxes = sketchGrid.children;
  for (box of boxes) {
    box.style.backgroundColor = "white";
  }
}

function saveChanges() {
  updateGrid();

  sketchGrid.innerHTML = "";

  createGrid();

  gridSizeOutput.textContent = `Grid Size: ${rows}x${cols}`;
}

function updateColor() {
  penColor = colorInput.value;
}

function updateGrid() {
  if (gridSizeInput.value >= 2 && gridSizeInput.value <= 100) {
    rows = gridSizeInput.value;
    cols = gridSizeInput.value;
  } else {
    gridSizeInput.value = "";
    alert("GRID SIZE MUST BE BETWEEN 2 AND 100!");
  }
}

function toggleErase(event) {
  isErasing = !isErasing;
}
