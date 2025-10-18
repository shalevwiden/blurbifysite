// change the content of the Blurb

const submitBtn = document.getElementById("submitBtn");
const blurb = document.querySelector(".blurbifydiv");

submitBtn.addEventListener("click", () => {
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
  function changeBlurb() {
    name.innerText = nameinput;

    username.innerText = `@${usernameinput}`;
    textcontent.innerText = contentinput;
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
