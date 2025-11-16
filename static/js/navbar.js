const nav = document.querySelector("nav.navbar");
const hideVal = window.innerHeight; // this = 100vh in px

window.addEventListener("scroll", () => {
  if (window.scrollY >= hideVal) {
    nav.classList.add("hidden");
  } else {
    nav.classList.remove("hidden");
  }
});
