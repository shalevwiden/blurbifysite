// change the content of the Blurb

const submitBtn = document.getElementById("submitBtn");
const blurb = document.querySelector(".blurbifydiv");

submitBtn.addEventListener("click", () => {
  console.log("Submit clicked!"); //

  const nameinput = document.getElementById("nameInput").value;
  //   verified is a boolean
  // make display none on the verified icon if the user selects no for the verification

  const verifiedinput = document.getElementById("verifiedInput").checked;
  const usernameinput = document.getElementById("usernameInput").value;
  const contentinput = document.getElementById("contentInput").value;

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
