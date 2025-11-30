// this is for template inputs
// change the content of the Blurb

const submitBtn = document.getElementById("submitBtn");
const blurb = document.querySelector(".blurbdiv");

const defaultname = "Blurbify Studio";
const defaultusername = "blurbifystudio";
submitBtn.addEventListener("click", () => {
  console.log("Submit clicked!"); //

  let nameinput = document.getElementById("nameInput").value;
  if (!nameinput) {
    nameinput = defaultname;
  }
  //   verified is a boolean
  // make display none on the verified icon if the user selects no for the verification

  // const verifiedinput = document.getElementById("verifiedInput").checked;
  verifiedinput = null;

  let usernameinput = document
    .getElementById("usernameInput")
    .value.toLowerCase();
  if (!usernameinput) {
    usernameinput = defaultusername;
  }
  let contentinput = document.getElementById("contentInput").value;

  //   now get the blurb variables
  const name = blurb.querySelector("#name");
  const username = blurb.querySelector("#username");
  const textcontent = blurb.querySelector(".textcontent");
  //   now change it

  // in the future this could be read from a database

  // nice this works

  function assignVerifiedIcon() {
    const path = window.location.pathname;

    const verifiedPages = ["swiden", "blurbify"];
    let verifiedIcon = '<div id="verified"></div>'; // default

    for (let i of verifiedPages) {
      if (path.endsWith(`${i}.html`) || path.endsWith(i)) {
        verifiedIcon = '<div id="verified" class="blurbverified"></div>';
        break; // stop checking once a match is found
      }
    }
    return verifiedIcon;
  }
  verified_icon = assignVerifiedIcon();

  function changeBlurb() {
    // change the verified or not
    if (verifiedinput) {
      name.innerHTML = `${nameinput}${verified_icon}`;
    } else {
      name.innerHTML = `${nameinput}`;
    }

    username.innerText = `@${usernameinput}`;

    console.log(`Content input:\n${contentinput}`);

    // make it so new lines show up
    contentinput = contentinput.replace(/\n/g, "<br>");

    textcontent.innerHTML = `<p>${contentinput}</p>`;
  }
  changeBlurb();

  // Example: dynamically show it

  //maybe save it in localStorage
  //   hmmm
  localStorage.setItem(
    "blurbData",
    JSON.stringify({
      name: nameinput,
      verified: verifiedinput,
      username: usernameinput,
      content: contentinput,
    })
  );
});

// can change the icons without actually hitting submit button
const iconsInput = document.getElementById("icons_checkbox");

const iconsDiv = blurb.querySelector(".iconsdiv");

function change_icons() {
  console.log("Trying to toggle icons");
  iconsInput.addEventListener("change", () => {
    if (iconsInput.checked) {
      iconsDiv.classList.remove("icons-hidden");
      iconsDiv.classList.add("icons-visible");
    } else {
      iconsDiv.classList.remove("icons-visible");
      iconsDiv.classList.add("icons-hidden");
    }
  });
}
change_icons();

// now handle the image input stuff
// its the last one in the form
// now dealing with all the image stuff right here

const pfpInput = document.getElementById("pfpInput");

// no pfp preview since its in image_li, which is disabled
// const pfppreview = document.getElementById("pfp_preview");
pfppreview = null;
// now handle the toggle for an image or not

const postimageToggle = document.getElementById("postimage_checkbox");
let post_image_li = document.querySelector("#post_image_li");
postimagepreview = document.getElementById("post_image_preview");
postimage = blurb.querySelector("#postimage");

function toggle_imageselecting() {
  console.log("Trying to toggle image selection");
  postimageToggle.addEventListener("change", () => {
    if (postimageToggle.checked) {
      post_image_li.classList.remove("post_image_li-hidden");
      post_image_li.classList.add("post_image_li-visible");

      postimagepreview.style.display = "inline";
      postimage.style.display = "inline";
    } else {
      post_image_li.classList.remove("post_image_li-visible");
      post_image_li.classList.add("post_image_li-hidden");

      postimagepreview.style.display = "none";
      postimage.style.display = "none";
    }
  });
}

toggle_imageselecting();

const postimageInput = document.getElementById("postimageInput");
postimagepreview = document.getElementById("post_image_preview");

postimageInput.addEventListener("change", () => {
  const file = postimageInput.files[0]; // get the post image uploaded file
  if (!file) return;

  const reader = new FileReader();

  // when file is read, show preview
  reader.onload = (e) => {
    postimagepreview.src = e.target.result; // this is a base64 data URL
    postimage.style.display = "inline";
  };

  reader.readAsDataURL(file); // reads file as Base64
});

// now handle submit logic for pfp and post images

submitBtn.addEventListener("click", () => {
  let pfpimage = blurb.querySelector("#pfpimage");
  // just take the src from preview
  const path = window.location.pathname;

  // check if the srcs exist if they dont then we set the defaults
  // which for me is my pfp for others the grey one
  // pfpsrcexists =
  //   pfppreview.src &&
  //   pfppreview.src.trim() !== "" &&
  //   !pfppreview.src.endsWith("/");

  pfpsrcexists = false;

  postimagesrcexists =
    postimagepreview.src &&
    postimagepreview.src.trim() !== "" &&
    !postimagepreview.src.endsWith("/");

  //

  // this logic sets the pfp based on the url

  if (!(path.endsWith("blurbifyv1.html") || path.endsWith("blurbifyv1"))) {
    // now the default pfp for my template should be my pfp
    if (pfpsrcexists) {
      console.log(
        "on a template besides the main one. But we gonna set the pfp src cause it exists"
      );
      pfpimage.src = pfppreview.src;
    } else {
      // this is where you set it lmao
      console.log("putting default pfp src, passed in through json");
    }
  } else {
    // pass for now - this is for other templates not swiden
    if (pfpsrcexists) {
      console.log("setting src to inputted pfp");

      pfpimage.src = pfppreview.src;
    } else {
      // pfpimage.style.visibility = "hidden";
      // the default one that people don't have
      console.log("setting default grey pfp");
      // this is the default for
      // add a stick figure for the default pfp lol
      // then mak
      pfpimage.src = "../images/nopfp.webp";
    }
  }

  postimage = blurb.querySelector("#postimage");
  // just take the src from preview

  // now opacity only becomes 1 if the src exists
  // untoggle this (just remove the if) to have the alt show up
  if (postimagesrcexists) {
    postimage.src = postimagepreview.src;
    // make it visible
    postimage.style.height = "auto";

    // it should fade in
    // using this same logic I can add other animations as we submit it
    postimage.style.opacity = "1";
  }

  if (pfpsrcexists) {
    console.log("trying to add new src to pfpimage_adjustment");

    pfpimage_adjustment.src = pfppreview.src;
  }

  // scroll to the blurb pointer I think we'll see

  pointer = document.querySelector("#blurbpointer");
  pointer.scrollIntoView({
    behavior: "smooth",
  });
});

// now deal with all the specsdiv stuff

const blurbify_bg_div = document.querySelector(".blurbify_bg_div");
function colorInputs() {
  const blurb_bg_input = document.getElementById("blurb_bg_input");

  // get the actual bg and make the color picker styled that way
  const blurb_bg_color = getComputedStyle(blurbify_bg_div).backgroundColor;
  function rgbToHex(rgb) {
    const match = rgb.match(/\d+/g);
    if (!match) return "#000000";
    return (
      "#" +
      match
        .slice(0, 3)
        .map((x) => {
          const hex = parseInt(x).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }

  console.log(`bgcolor is ${blurb_bg_color}`);
  blurb_bg_input.value = rgbToHex(blurb_bg_color);

  blurb_bg_input.addEventListener("input", () => {
    blurbify_bg_div.style.background = blurb_bg_input.value;
  });

  const blurb_border_input = document.getElementById("blurb_border_input");
  const blurb_border_color = getComputedStyle(blurb).borderColor;
  blurb_border_input.value = rgbToHex(blurb_border_color);

  blurb_border_input.addEventListener("input", () => {
    blurb.style.borderColor = blurb_border_input.value;
  });
}

colorInputs();

// now deal with the slider inputs
function rangeInputs() {
  const textcontent = blurb.querySelector(".textcontent");
  // define inputs first
  const border_size_input = document.getElementById("border_size_input");

  const contenttext_size_input = document.getElementById(
    "contenttext_size_input"
  );

  // set default border width

  const blurb_border_width = getComputedStyle(blurb).borderWidth;
  border_size_input.value = parseInt(blurb_border_width);

  // add event listeners for inputs
  border_size_input.addEventListener("input", () => {
    blurb.style.borderWidth = border_size_input.value + "px";
  });

  contenttext_size_input.addEventListener("input", () => {
    textcontent.style.fontSize = contenttext_size_input.value + "px";
  });

  function resetbuttons() {
    reset_border = document.getElementById("reset_border");
    reset_text = document.getElementById("reset_text");

    // now heres the logic for them

    reset_border.addEventListener("click", () => {
      blurb.style.removeProperty("border-width");

      // re-sync slider to CSS value
      border_size_input.value = parseInt(getComputedStyle(blurb).borderWidth);
    });

    reset_text.addEventListener("click", () => {
      textcontent.style.removeProperty("font-size");

      // re-sync slider to CSS value
      contenttext_size_input.value = parseInt(
        getComputedStyle(textcontent).fontSize
      );
    });
  }
  resetbuttons();
}

rangeInputs();

function pfpSpecs() {
  const pfpimage_adjustment = document.querySelector("#pfpimage_adjustment");
  const pfpimage = blurb.querySelector("#pfpimage");

  // default transform data
  let rotation = 0;
  let translateX = 0;
  let translateY = 0;

  const originalsize = parseInt(getComputedStyle(pfpimage).width);

  const pfp_size_slider = document.querySelector("#pfp_size_slider");
  const pfp_rotation_slider = document.querySelector("#pfp_rotation_slider");

  // this needs to be done so that the transforms dont override each other
  function updateTransform(translateX, translateY) {
    // onl keep rotation global and the other two local I guess
    pfpimage.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`;
    pfpimage_adjustment.style.transform = `translate(${translateX * 2}px, ${
      translateY * 2
    }px) rotate(${rotation}deg)`;
  }

  // Rotation
  pfp_rotation_slider.addEventListener("input", () => {
    rotation = parseInt(pfp_rotation_slider.value);
    updateTransform(translateX, translateY);
  });

  // you cant drag it anymore
  // Position (InteractJS) this is the complicated one
  //   interact(pfpimage_adjustment).draggable({
  //     inertia: true,
  //     modifiers: [
  //       interact.modifiers.restrictRect({
  //         restriction: "parent",
  //         endOnly: true,
  //       }),
  //     ],
  //     listeners: {
  //       move(event) {
  //         translateX += event.dx;
  //         translateY += event.dy;
  //         updateTransform(translateX, translateY);
  //       },
  //     },
  //   });

  // Size
  pfp_size_slider.addEventListener("input", () => {
    const size = parseInt(pfp_size_slider.value);
    pfpimage.style.width = size + "px";
    // increase the adjustment slider by twice
    pfpimage_adjustment.style.width = size * 2 + "px";
  });

  updateTransform(translateX, translateY); // initialize once

  // reset button
  reset_size_and_position = document.getElementById("reset_pfp_size");

  reset_size_and_position.addEventListener("click", () => {
    // re-sync slider to CSS value
    // change this to make it wack
    console.log("reset size button clicked");

    pfp_size_slider.value = originalsize;
    pfpimage.style.width = originalsize + "px";
    pfpimage_adjustment.style.width = originalsize * 2 + "px";
    // need to update rotation global.
    updateTransform(0, 0);
  });

  reset_rotation = document.getElementById("reset_rotation");

  reset_rotation.addEventListener("click", () => {
    // re-sync slider to CSS value
    originalvalue = 0;
    pfp_rotation_slider.value = originalvalue;
    // need to update rotation global.
    rotation = originalvalue;
    updateTransform(translateX, translateY);
  });
}

pfpSpecs();
// makes it global
window.blurbify_bg_div = blurbify_bg_div;
