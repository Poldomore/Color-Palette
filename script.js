const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

const generateSfx = new Audio('ui-sounds-pack-2.mp3'); 
const copySfx = new Audio('ui-sounds-pack-3.mp3');


generateBtn.addEventListener("click", generatePalette);


paletteContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("copy-btn")) {
    const hexValue = e.target.previousElementSibling.textContent;

    copySfx.play(); 

    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(e.target))
      .catch((err) => console.log(err));
  } 
  else if (e.target.classList.contains("color")) {
    const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
    const copyBtn = e.target.nextElementSibling.querySelector(".copy-btn");

    copySfx.play(); 

    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(copyBtn))
      .catch((err) => console.log(err));
  }
});

function showCopySuccess(element) {
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");
  element.style.color = "#48bb78";

  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = "";
  }, 1500);
}

function generatePalette() {
  generateSfx.play(); 

  const colors = [];

  for (let i = 0; i < 6; i++) {
    colors.push(generateRandomColor());
  }

  updatePaletteDisplay(colors);
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updatePaletteDisplay(colors) {
  const colorBoxes = document.querySelectorAll(".color-box");

  colorBoxes.forEach((box, index) => {
    if (box) { 
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        if(colorDiv && hexValue){
            colorDiv.style.backgroundColor = color;
            hexValue.textContent = color;
        }
    }
  });
}

generatePalette();
