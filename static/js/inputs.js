// change the content of the Blurb

const submitBtn = document.getElementById("submitBtn");
const blurb = document.querySelector(".blurbifydiv");

submitBtn.addEventListener("click", () => {
  console.log("Submit clicked!"); //

  const nameinput = document.getElementById("nameInput").value;
  //   verified is a boolean
  // make display none on the verified icon if the user selects no for the verification

  const verifiedinput = document.getElementById("verifiedInput").checked;
  const usernameinput = document
    .getElementById("usernameInput")
    .value.toLowerCase();
  let contentinput = document.getElementById("contentInput").value;

  //   now get the blurb variables
  const name = blurb.querySelector("#name");
  const username = blurb.querySelector("#username");
  const textcontent = blurb.querySelector(".textcontent");
  //   now change it
  verified_icon =
    ' <img src="../images/verified.png" alt="" id="verified" /> </span>';

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

  // Optional: save it in localStorage
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
const pfppreview = document.getElementById("pfp_preview");

pfpInput.addEventListener("change", () => {
  const file = pfpInput.files[0]; // get the first selected file
  if (!file) return;

  const reader = new FileReader();

  // when file is read, show preview
  reader.onload = (e) => {
    pfppreview.src = e.target.result; // this is a base64 data URL
  };

  reader.readAsDataURL(file); // reads file as Base64
});

// now handle the toggle for an image or not

const postimageToggle = document.getElementById("postimage_checkbox");
let post_image_li = document.querySelector("#post_image_li");
postimagepreview = document.getElementById("post_image_preview");
postimage = blurb.querySelector("#postimage");

function toggle_imageselecting() {
  console.log("Trying to toggle icons");
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
  };

  reader.readAsDataURL(file); // reads file as Base64
});

// now handle submit logic for pfp and post images

submitBtn.addEventListener("click", () => {
  const pfpimage = blurb.querySelector("#pfpimage");
  // just take the src from preview
  const path = window.location.pathname;

  pfpsrcexists =
    pfppreview.src &&
    pfppreview.src.trim() !== "" &&
    !pfppreview.src.endsWith("/");

  postimagesrcexists =
    postimagepreview.src &&
    postimagepreview.src.trim() !== "" &&
    !postimagepreview.src.endsWith("/");

  //
  if (path.endsWith("swiden.html") || path.endsWith("swiden")) {
    // now the default pfp for my template should be my pfp
    if (pfpsrcexists) {
      console.log("on swiden but not setting default");
      pfpimage.src = pfppreview.src;
    } else {
      console.log("on swiden setting default pfp");
      pfpimage.src = "../images/pfp1.png";
    }
  } else {
    // pass for now - this is for other templates not swiden
    if (pfpsrcexists) {
      console.log("setting src to user pfp");

      pfpimage.src = pfppreview.src;
    } else {
      // pfpimage.style.visibility = "hidden";
      // the default one that people don't have
      console.log("setting default grey pfp");
      pfpimage.src = "../images/nopfp.webp";
    }
  }
  postimage = blurb.querySelector("#postimage");
  // just take the src from preview

  // now opacity only becomes 1 if the src exists
  // untoggle this (just remove the if) to have the alt show up
  if (postimagesrcexists) {
    postimage.src = postimagepreview.src;
    postimage.style.height = "auto";

    // it should fade in
    // using this same logic I can add other animations as we submit it
    postimage.style.opacity = "1";
  }
});
