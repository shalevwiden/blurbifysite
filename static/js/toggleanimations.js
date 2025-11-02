// this handles alot of animations and the views stuff

//

// icons stuff first

const viewsicon = document.querySelector("#viewchart");

const buttonsDiv = document.querySelector(".animation_buttons");

const blurbifybutton = buttonsDiv.querySelector("#blurbifybutton");
const blurb_bg_button = buttonsDiv.querySelector("#blurb_bg_button");
const flyingbutton = buttonsDiv.querySelector("#flyingbutton");
const spinbutton = buttonsDiv.querySelector("#spin");

const blurbdiv = document.querySelector(".blurbdiv");

// dont declare it because its already declared in inputs.js and exported
// const blurbify_bg_div = document.querySelector(".blurbify_bg_div");

const pfpid = document.querySelector("#pfpid");

// get a whole element
const body = document.querySelector("body");

flyingimage = document.querySelector("#flyingimage1");

// now the toggling logic here

blurb_bg_button.addEventListener("click", () => {
  console.log("toggling bg animations for blurb");
  // updates fr
  blurbify_bg_div.classList.toggle("div_background_class");
});

flyingbutton.addEventListener("click", () => {
  console.log("toggling flying object");
  flyingimage.classList.toggle("flying_class");
});
spinbutton.addEventListener("click", () => {
  console.log("toggling spin");

  // Add the class
  blurbdiv.classList.add("spin_class");

  // Remove the class after animation duration so it can be retriggered
  setTimeout(() => {
    blurbdiv.classList.remove("spin_class");
  }, 7000); // 5000ms = your animation duration + the delay
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
  let month = date.getMonth() + 1; //months are 0 indexed
  let day = date.getDate();
  day = day.toString().padStart(2, "0");
  month = month.toString().padStart(2, "0");
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
  let viewcount = parseInt(output.replace(/,/g, ""), 10);

  return viewcount;
  //
}
const viewcount = getViews(views);

// starting up the animation will do a viewcount animation
// add "yes this is what I do instead of sleeping..."
blurbifybutton.addEventListener("click", () => {
  setTimeout(() => {
    console.log("toggling blurbify");
    blurbdiv.classList.toggle("blurbify_class");

    // READ THIS - this line applies spin to the pfp
    // pfpid.classList.toggle("spin_class");

    // this line adds the view count delay
    // countUp(views, viewcount, 5000);
  }, 1000); // 1000ms = 1 second
});

// Make the duration a little slower
const duration = 10000;

viewsicon.addEventListener("click", () => {
  setTimeout(() => {
    console.log("toggling viewsicon");

    // ok so this is now on the views icon instead of a new button
    countUp(views, viewcount, duration);
  }, 1000);
});
