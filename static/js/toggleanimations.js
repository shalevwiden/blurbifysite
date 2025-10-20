// this handles alot of animations and the views stuff

//

const buttonsDiv = document.querySelector(".buttons");

const blurbifybutton = buttonsDiv.querySelector("#blurbifybutton");
const Backgroundbutton = buttonsDiv.querySelector("#Backgroundbutton");
const flyingbutton = buttonsDiv.querySelector("#flyingbutton");
const spinbutton = buttonsDiv.querySelector("#spin");
const viewsbutton = buttonsDiv.querySelector("#viewsbutton");

const blurbifydiv = document.querySelector(".blurbifydiv");
const pfpid = document.querySelector("#pfpid");

const body = document.querySelector("body");

const flyingimage = document.querySelector("img.flyingimage");

// now the toggling logic here

Backgroundbutton.addEventListener("click", () => {
  console.log("toggling background");
  body.classList.toggle("background_class");
});

flyingbutton.addEventListener("click", () => {
  console.log("toggling flying object");
  flyingimage.classList.toggle("flying_class");
});

spinbutton.addEventListener("click", () => {
  console.log("toggling spin");
  blurbifydiv.classList.toggle("spin_class");
});
function easeOutQuad(t) {
  return t * (2 - t);
}

function countUp(element, target, duration = 2000) {
  // this makes the view count animation
  const start = 0;
  const range = target - start;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuad(progress);
    const value = Math.floor(start + range * eased);

    element.textContent = value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// if its true set the views in the html

const views = document.querySelector("#count");
const originalviews = views.innerText;

function getViews(views) {
  if (!views) return 0;

  const date = new Date();
  const month = date.getMonth() + 1; //months are 0 indexed
  const day = date.getDate();
  let year = date.getFullYear();

  year = date.getFullYear().toString().slice(1);

  // combine and format
  const output = `${month},${day}2,${year}`;

  // this should set it
  views.innerText = output;

  manualviews = false;

  if (manualviews) {
    views.innerText = originalviews;
  }

  viewcount = output;
  return viewcount;
  //
}
const viewcount = getViews(views);

// starting up the animation will do a viewcount animation
// add "yes this is what I do instead of sleeping..."
blurbifybutton.addEventListener("click", () => {
  setTimeout(() => {
    console.log("toggling blurbify");
    blurbifydiv.classList.toggle("blurbify_class");

    // READ THIS - this line applies spin to the pfp
    // pfpid.classList.toggle("spin_class");

    // this line adds the view count delay
    // countUp(views, viewcount, 5000);
  }, 1000); // 1000ms = 1 second
});

// Make the duration a little slower
const duration = 10000;

viewsbutton.addEventListener("click", () => {
  setTimeout(() => {
    console.log("toggling viewsbutton");
    // blurbifydiv.classList.toggle("blurbify_class");
    // pfpid.classList.toggle("spin_class");
    countUp(views, viewcount, duration);
  }, 3000);
});
