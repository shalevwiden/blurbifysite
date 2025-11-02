// this will basically deal with the flying_specs stuff

const flyingimageInput = document.getElementById("flyingimageInput");
flying_image_preview = document.getElementById("flying_image_preview");
let flyingimage1 = document.querySelector("#flyingimage1");

flyingimageInput.addEventListener("change", () => {
  const file = flyingimageInput.files[0]; // get the post image uploaded file
  if (!file) return;

  const reader = new FileReader();

  // when file is read, show preview
  reader.onload = (e) => {
    const result = e.target.result; // base64 data URL
    flying_image_preview.src = result;
    flyingimage1.src = result;
  };

  reader.readAsDataURL(file); // reads file as Base64
});
function reset_flying_src() {
  resetflyingimage = document.getElementById("resetflyingimage");
  defaultsrc = "../images/flyingimages/defaultflying.png";
  // now heres the logic for them

  resetflyingimage.addEventListener("click", () => {
    console.log("reseting to default");
    flying_image_preview.src = defaultsrc;

    flyingimage1.src = defaultsrc;

    // re-sync slider to CSS value
  });
}
reset_flying_src();

function flyingposition() {
  let originalyposition = parseInt(window.getComputedStyle(flyingimage1).top);
  flying_y_px = document.querySelector("#flying_y_px");
  flying_y_slider = document.querySelector("#flying_y_slider");

  flying_y_slider.addEventListener("input", () => {
    yposition = parseInt(flying_y_slider.value);
    flying_y_px.value = yposition;
    flyingimage1.style.top = originalyposition + -yposition + "px";
  });

  flying_y_px.addEventListener("input", () => {
    // make negative for logical moving
    const yposition = parseInt(flying_y_px.value);
    flying_y_slider.value = yposition;
    flyingimage1.style.top = originalyposition + -yposition + "px";
  });
}

// need to add reset button still

flyingposition();

function flyingspeed() {
  let originalspeed = 5;
  flying_speed = document.querySelector("#flying_speed");
  flying_speed_slider = document.querySelector("#flying_speed_slider");

  flying_speed_slider.addEventListener("input", () => {
    speed = parseInt(flying_speed_slider.value);
    // update the number input value
    flying_speed.value = speed;
    flyingimage1.style.animationDuration = speed + "s";
  });

  flying_speed.addEventListener("input", () => {
    // make negative for logical moving
    const speed = parseInt(flying_speed.value);
    // update the slider value
    flying_speed_slider.value = speed;
    flyingimage1.style.animationDuration = speed + "s";
  });
}

flyingspeed();
