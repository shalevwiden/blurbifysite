// this file handles the drop down logic ngl
// I really need to learn React
// But for now this will do

// blurbify div is made global in inputs.js

// turns out its relatively simple to implement something like this in JavaScript lmao

function blurb_bg_padding() {
  const circle_down_blurb = document.getElementById("circle_down_blurb");

  circle_down_blurb.addEventListener("click", () => {
    console.log("circle down circle clicked");

    // classes are defined in _dropdown.scss

    blurbify_bg_div.classList.toggle("no_top_padding");
    circle_down_blurb.classList.toggle("rotated");
  });
}
blurb_bg_padding();
let specsdivcolor = document.querySelector("#color_specs");

function specsdiv_dropdown() {
  const circle_down_colorspec = document.getElementById(
    "circle_down_colorspec"
  );
}
circle_down_colorspec.addEventListener("click", () => {
  console.log("circle down circle clicked");

  // classes are defined in _dropdown.scss

  specsdivcolor.classList.toggle(".no_height");
  circle_down_blurb.classList.toggle("rotated");
});
