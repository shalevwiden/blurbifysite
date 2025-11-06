// this will basically deal with the flying_specs stuff
window.switch_animationDirection = false;
//

const flyingimageInput = document.getElementById("flyingimageInput");
flying_image_preview = document.getElementById("flying_image_preview");
let flyingimage1 = document.querySelector("#flyingimage1");
flying_wrapper1 = document.querySelector("#flying_wrapper1");
flyingimagesdiv = document.querySelector(".flyingimagesdiv");

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
  defaultsrc = "../images/flyingimages/blurbifyplane.png";
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
  flying_size_input = document.querySelector("#flying_size_input");

  originalsize = parseInt(getComputedStyle(flyingimage1).width);
  flying_size_input.value = originalsize;
  //   establish it right away

  flying_size_input.addEventListener("input", () => {
    flyingsizeval = parseInt(flying_size_input.value);

    flyingimage1.style.width = flyingsizeval + "px";
  });

  // do later

  function reset_flyingsize() {
    reset_flying_size_button = document.getElementById(
      "reset_flying_size_button"
    );

    reset_flying_size_button.addEventListener("click", () => {
      // re-sync slider to CSS value
      console.log("resetting image size");
      console.log(originalsize);

      flying_size_input.value = originalsize;
      flyingimage1.style.width = originalsize + "px";
    });
  }

  reset_flyingsize();
}

flyingsize();

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

  function reset_flyingposition() {
    reset_flying_position = document.getElementById("reset_flying_position");

    reset_flying_position.addEventListener("click", () => {
      // re-sync slider to CSS value
      console.log("resetting plane position");
      flying_y_px.value = originalyposition;
      flying_y_slider.value = originalyposition;
      flyingimage1.style.top = originalyposition;
    });
  }

  reset_flyingposition();
}

// need to add reset button still

flyingposition();

function flyingspeed() {
  let originalspeed = 5;
  // this is the number input
  flying_speed = document.querySelector("#flying_speed");
  flying_speed_slider = document.querySelector("#flying_speed_slider");

  flying_speed_slider.addEventListener("input", () => {
    speed = parseInt(flying_speed_slider.value);
    // update the number input value
    flying_speed.value = speed;
    flying_wrapper1.style.animationDuration = speed + "s";
  });

  flying_speed.addEventListener("input", () => {
    // make negative for logical moving
    const speed = parseInt(flying_speed.value);
    // update the slider value
    flying_speed_slider.value = speed;
    flying_wrapper1.style.animationDuration = speed + "s";
  });

  function reset_flyingspeed() {
    reset_flying_speed = document.getElementById("reset_flying_speed");

    reset_flying_speed.addEventListener("click", () => {
      // re-sync slider to CSS value
      console.log("resetting speed");
      flying_speed_slider.value = originalspeed;
      flying_speed.value = originalspeed;
      flying_wrapper1.style.animationDuration = originalspeed + "s";
    });
  }

  reset_flyingspeed();
}

flyingspeed();

function zindex() {
  const aboveblurb = document.querySelector("#aboveblurb");
  const underblurb = document.querySelector("#underblurb");

  aboveblurb.addEventListener("change", () => {
    if (aboveblurb.checked) {
      flyingimagesdiv.style.zIndex = "3"; // put on top
      console.log("Set to ABOVE");
    }
  });

  underblurb.addEventListener("change", () => {
    if (underblurb.checked) {
      flyingimagesdiv.style.zIndex = "0"; // put underneath
      console.log("Set to UNDER");
    }
  });

  // Optional: initialize state based on whichever is pre-checked
  if (aboveblurb.checked) {
    flyingimagesdiv.style.zIndex = "3";
  } else if (underblurb.checked) {
    flyingimagesdiv.style.zIndex = "0";
  }
}
zindex();
function rotations() {
  // rotations for arrow and for object
  //   Im flipping the actual image because the wrapper is what moves across the screen
  const currentTransform = getComputedStyle(flyingimage1).transform;

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
      //   now set actual logic for the flyingobject animation
      //   right is normal
      window.switch_animationDirection = false;

      if (
        flying_wrapper1.classList.contains("flying_class_flipped") &&
        window.flyingon
      ) {
        // remove all classes
        flying_wrapper1.className = "";

        // add the normal flying class
        flying_wrapper1.classList.add("flying_class");
      }
    });

    arrowleft.addEventListener("click", () => {
      arrow_preview.style.transform = "none";

      arrow_preview.style.transform = "scaleX(-1)";
      window.switch_animationDirection = true;

      if (
        flying_wrapper1.classList.contains("flying_class") &&
        window.flyingon
      ) {
        // remove all classes
        flying_wrapper1.className = "";

        // add the normal flying class
        flying_wrapper1.classList.add("flying_class_flipped");
      }
    });
  }
  arrowrotations();
}

rotations();
