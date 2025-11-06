// this handles alot of animations and the views stuff
window.flyingon = false;
bg_anims = false;
border_anims = false;

//

// icons stuff first

const viewsicon = document.querySelector("#viewchart");

const borderbutton = document.querySelector("#borderbutton");
const blurb_bg_button = document.querySelector("#blurb_bg_button");
const spinbutton = document.querySelector("#spin");
const unblur_button = document.querySelector("#unblur_button");
const zoomup_button = document.querySelector("#zoomup_button");

// flying button is in its own div rn:
const flyingbutton = document.querySelector("#flyingbutton");

const blurbdiv = document.querySelector(".blurbdiv");

const og_button_bg = getComputedStyle(blurb_bg_button).backgroundColor;

// dont declare it because its already declared in inputs.js and exported
// const blurbify_bg_div = document.querySelector(".blurbify_bg_div");

const pfpid = document.querySelector("#pfpid");

// get a whole element
const body = document.querySelector("body");
let flying_wrapper1 = document.querySelector("#flying_wrapper1");

flyingimage = document.querySelector("#flyingimage1");

// now the toggling logic here

blurb_bg_button.addEventListener("click", () => {
  const originalText = "Blurb Background Animations";
  console.log("toggling bg animations for blurb");

  // updates fr

  blurbify_bg_div.classList.toggle("div_background_class");
  bg_anims = !bg_anims;
  if (!bg_anims) {
    blurb_bg_button.innerText = `${originalText} Off`;
    blurb_bg_button.style.background = og_button_bg;
  } else {
    blurb_bg_button.innerText = `${originalText} On`;
    blurb_bg_button.style.background = "#564ce7ff";
  }
});

flyingbutton.addEventListener("click", () => {
  console.log("toggling flying object");
  // switch the state for flyingimage.js to reference
  window.flyingon = !window.flyingon;
  console.log(`Window flying on is ${window.flyingon}`);
  // now handle the animations
  if (!window.switch_animationDirection) {
    // ensure flipped class is removed if present
    flying_wrapper1.classList.remove("flying_class_flipped");
    // toggle the normal direction
    flying_wrapper1.classList.toggle("flying_class");
  } else {
    // ensure normal class is removed if present
    flying_wrapper1.classList.remove("flying_class");
    // toggle the flipped direction
    flying_wrapper1.classList.toggle("flying_class_flipped");
  }
});

spinbutton.addEventListener("click", () => {
  const originalText = "Spin the Blurb";
  console.log("toggling spin");
  spinbutton.innerText = `${originalText} On`;
  spinbutton.style.background = "#564ce7ff";

  // Add the class
  blurbdiv.classList.add("spin_class");

  // Remove the class after animation duration so it can be retriggered
  setTimeout(() => {
    blurbdiv.classList.remove("spin_class");
    spinbutton.innerText = `${originalText} Off`;
    spinbutton.style.background = og_button_bg;
  }, 7000); // 5000ms = your animation duration + the delay
});

unblur_button.addEventListener("click", () => {
  const originalText = "Unblur Animation";
  console.log("toggling unblur animation");
  unblur_button.innerText = `${originalText} On`;
  unblur_button.style.background = "#564ce7ff";

  // Add the class
  blurbdiv.classList.add("unblur_class");

  // Remove the class after animation duration so it can be retriggered
  setTimeout(() => {
    blurbdiv.classList.remove("unblur_class");
    unblur_button.innerText = `${originalText} Off`;
    unblur_button.style.background = og_button_bg;
  }, 10000);
});

// a lot nicer styling
zoomup_button.addEventListener("click", () => {
  console.log("toggling zoom up animation");
  const originalText = "Zoom Up";
  zoomup_button.innerText = `${originalText} On`;
  zoomup_button.style.background = "#564ce7ff";

  // Add the class
  blurbdiv.classList.add("zoom_up_class");

  // Remove the class after animation duration so it can be retriggered
  setTimeout(() => {
    blurbdiv.classList.remove("zoom_up_class");
    zoomup_button.innerText = `${originalText} Off`;
    zoomup_button.style.background = og_button_bg;
  }, 9000);
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
borderbutton.addEventListener("click", () => {
  blurbdiv.classList.toggle("border_class");
  const originalText = "Border Animations";
  console.log("toggling border animations for blurb");

  // updates fr
  // update state
  border_anims = !border_anims;
  if (!border_anims) {
    borderbutton.innerText = `${originalText} Off`;
    borderbutton.style.background = og_button_bg;
  } else {
    borderbutton.innerText = `${originalText} On`;
    borderbutton.style.background = "#564ce7ff";
  }
  // READ THIS - this line applies spin to the pfp
  // pfpid.classList.toggle("spin_class");

  // this line adds the view count delay
  // countUp(views, viewcount, 5000);
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
