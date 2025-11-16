const nav = document.querySelector("nav.navbar");
const hideVal = window.innerHeight; // this = 100vh in px

window.addEventListener("scroll", () => {
  if (window.scrollY >= hideVal) {
    nav.classList.add("hidden");
  } else {
    nav.classList.remove("hidden");
  }
});
const navbar = document.querySelector(".navbar");

const ul = navbar.querySelector("ul");
const lis = ul.querySelectorAll("li");

lis.forEach((li) => {
  const link = li.querySelector("a");
  if (!link) return; // skip malformed items

  li.addEventListener("click", () => {
    window.open(link.href, "_self");
  });
});
