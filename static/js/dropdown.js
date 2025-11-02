// this file handles the drop down logic ngl
// I really need to learn React
// But for now this will do

// blurbify div is made global in inputs.js

// turns out its relatively simple to implement something like this in JavaScript lmao

function blurb_bg_padding() {
  // this function is what allows the Blurb to go up to right where the user is lmao
  const circle_down_blurb = document.getElementById("circle_down_blurb");

  circle_down_blurb.addEventListener("click", () => {
    console.log("circle down circle clicked");

    // classes are defined in _dropdown.scss

    blurbify_bg_div.classList.toggle("no_top_padding");
    circle_down_blurb.classList.toggle("rotated");
  });
}
blurb_bg_padding();

let specs_color_ul = document.querySelector("#specs_color_ul");

function specsdiv_color_dropdown() {
  const circle_down_colorspec = document.getElementById(
    "circle_down_colorspecs"
  );

  circle_down_colorspec.addEventListener("click", () => {
    console.log("colorspec circle clicked");

    // classes are defined in _dropdown.scss

    specs_color_ul.classList.toggle("no_height");
    circle_down_colorspec.classList.toggle("rotated");
  });
}

specsdiv_color_dropdown();

let specs_pfp_ul = document.querySelector("#specs_pfp_ul");

function specsdiv_pfp_dropdown() {
  const circle_down_pfpspecs = document.getElementById("circle_down_pfpspecs");

  circle_down_pfpspecs.addEventListener("click", () => {
    console.log("pfpspec circle clicked");

    // classes are defined in _dropdown.scss

    specs_pfp_ul.classList.toggle("no_height");
    circle_down_pfpspecs.classList.toggle("rotated");
  });
}
specsdiv_pfp_dropdown();

let flying_specs_ul = document.querySelector("#flying_specs");

function specsdiv_flying_dropdown() {
  const circle_down_flying = document.getElementById("circle_down_flying");

  circle_down_flying.addEventListener("click", () => {
    console.log("pfpspec circle clicked");

    // classes are defined in _dropdown.scss

    flying_specs_ul.classList.toggle("no_height");
    circle_down_flying.classList.toggle("rotated");
  });
}
specsdiv_flying_dropdown();
