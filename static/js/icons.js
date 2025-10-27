heart_icon = document.querySelector("#heart_icon");

heart_icon.addEventListener("click", () => {
  console.log("heart icon clicked");
  heart_icon.classList.toggle("heart-filled");
});
