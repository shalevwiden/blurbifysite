// Grab elements
const pasteBtn = document.getElementById("pastetext");
const clearBtn = document.getElementById("cleartext");
const contentInput = document.getElementById("contentInput");

async function pasteText() {
  try {
    const text = await navigator.clipboard.readText();
    // make the input value
    contentInput.value = text;
  } catch (error) {
    console.error("Clipboard paste failed:", error);
  }
}

function clearText() {
  contentInput.value = "";
}
// Add functionality
pasteBtn.addEventListener("click", pasteText);
clearBtn.addEventListener("click", clearText);
