// this will basically deal with the flying_specs stuff

const flyingimageInput = document.getElementById("flyingimageInput");
flying_image_preview = document.getElementById("flying_image_preview");
let flyingimage1 = document.querySelector("#flyingimage1");
let flying_wrapper1 = document.querySelector("#flying_wrapper1");

// for rotations()
let arrow_preview = document.querySelector("#arrow_preview");
rotation_object_preview = document.querySelector("#rotation_object_preview");

flyingimageInput.addEventListener("change", () => {
  const file = flyingimageInput.files[0]; // get the post image uploaded file
  if (!file) return;

  const reader = new FileReader();

  // when file is read, show preview
  reader.onload = (e) => {
    const result = e.target.result;
    // now make the src for all of these the base 64 url
    flying_image_preview.src = result;
    flyingimage1.src = result;
    rotation_object_preview.src = result;
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
    rotation_object_preview.src = defaultsrc;

    // re-sync slider to CSS value
  });
}
reset_flying_src();
function flyingsize() {
  // do later
}
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

function rotations() {
  // rotations for arrow and for object
  const currentTransform = getComputedStyle(flying_wrapper).transform;

  function flyingrotations() {
    objectright = document.querySelector("#objectright");
    objectleft = document.querySelector("#objectleft");

    objectright.addEventListener("click", () => {
      console.log("trying to rotate object right");
      rotation_object_preview.style.transform = "none";

      rotation_object_preview.style.transform = "scaleX(-1)";

      flyingimage1.style.transform =
        (currentTransform === "none" ? "" : currentTransform) + " scaleX(-1)";
    });

    objectleft.addEventListener("click", () => {
      rotation_object_preview.style.transform = "none";

      rotation_object_preview.style.transform = "scaleX(1)";
      flyingimage1.style.transform =
        (currentTransform === "none" ? "" : currentTransform) + " scaleX(1)";
    });
  }
  flyingrotations();
  function arrowrotations() {
    arrowright = document.querySelector("#arrowright");
    arrowleft = document.querySelector("#arrowleft");

    arrowright.addEventListener("click", () => {
      console.log("trying to rotate arrow right");
      arrow_preview.style.transform = "none";

      arrow_preview.style.transform = "scaleX(1)";
    });

    arrowleft.addEventListener("click", () => {
      arrow_preview.style.transform = "none";

      arrow_preview.style.transform = "scaleX(-1)";
    });
  }
  arrowrotations();
}

rotations();
