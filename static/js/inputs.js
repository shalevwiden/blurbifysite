// change the content of the Blurb

const submitBtn = document.getElementById("submitBtn");
const blurb = document.querySelector(".blurbifydiv");

submitBtn.addEventListener("click", () => {
  const name = document.getElementById("nameInput").value;
  const verified = document.getElementById("verifiedInput").checked;
  const username = document.getElementById("usernameInput").value;
  const content = document.getElementById("contentInput").value;

  //   now get the blurb variables
  function changeBlurb() {
    const name = blurb.querySelector("#name");
    const username = blurb.querySelector("#name");
  }
  changeBlurb();
  // Example: dynamically show it

  // Optional: save it in localStorage
  //   hmmm
  localStorage.setItem(
    "blurbData",
    JSON.stringify({ name, verified, username, content })
  );
});
