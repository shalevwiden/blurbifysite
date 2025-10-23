// this file handles the drop down logic ngl
// I really need to learn React
// But for now this will do

// blurbify div is made global in inputs.js

function blurb_bg_padding() {
  const circle_down = document.getElementById("circle_down");

  circle_down.addEventListener("click", () => {
    console.log("circle down circle clicked");
    blurbify_bg_div.classList.toggle("no_top_padding");
  });
}
blurb_bg_padding();
