saveblurb = document.querySelector("#saveblurb");

saveblurb.addEventListener("click", () => {
  const flying = document.querySelector(".flyingimagesdiv");
  const postImage = document.getElementById("postimage");
  let removedPostImage = false;

  // If no image is set → remove it to prevent load errors
  if (!postImage.complete || postImage.naturalWidth === 0) {
    removedPostImage = true;
    postImage.remove();
  }
  const blurb_and_bg = blurbify_bg_div.cloneNode(true);

  sitecontainer = document.querySelector(".sitecontainer");

  const container = document.createElement("div");
  container.style.position = "absolute";
  //   make it off screen
  container.style.left = "-9999px";
  container.appendChild(blurb_and_bg);
  sitecontainer.appendChild(container);

  copyAllComputedStyles(blurbify_bg_div, blurb_and_bg); // copy from original → clone

  blurbdiv2 = blurb_and_bg.querySelector(".blurbdiv");
  const computed = getComputedStyle(blurbdiv2);
  console.log(`border color is \n: ${computed.borderColor}`);

  //   already globally declared
  oldStyle = blurbdiv2.getAttribute("style") || "";

  if (window.innerWidth <= 450) {
    // Scale blurb
    blurbdiv2.style.margin = "10px";
    blurbdiv2.style.transform = "scale(.9)";
    // Padding around container
    blurb_and_bg.style.paddingTop = "100px";
    blurb_and_bg.style.paddingBottom = "100px";
    blurb_and_bg.style.paddingLeft = "20px";
    blurb_and_bg.style.paddingRight = "20px";
  } else {
    blurbdiv2.style.margin = "10px";
    blurb_and_bg.style.paddingTop = "100px";
    blurb_and_bg.style.paddingBottom = "100px";
    blurb_and_bg.style.paddingLeft = "0px";
    blurb_and_bg.style.paddingRight = "0px";
  }

  replaceAllIcons(blurb_and_bg);

  htmlToImage
    .toPng(blurb_and_bg, {
      imgPlaceholder: "", // ignore broken image instead of throwing,
    })
    .then((dataUrl) => {
      sitecontainer.removeChild(container); // clean up

      // put back post image
      if (removedPostImage) {
        document.getElementById("imagesection").appendChild(postImage);
      }

      blurbdiv2.setAttribute("style", oldStyle);

      const link = document.createElement("a");
      link.download = "blurb.png";
      link.href = dataUrl;
      link.click();
    })
    .catch((error) => {
      console.error("Error saving image:", error);
    });
});
// Generic Material Symbols mapping

// these are svgs from the website
const materialSvgMap = {
  // Outlined
  bar_chart:
    '<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill="currentColor"><path d="M662-135v-316h164v316H662Zm-263 0v-691h162v691H399Zm-264 0v-491h163v491H135Z"/></svg>',
  ios_share:
    '<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M266.59-87.87q-34.5 0-58.61-24.26t-24.11-58.74v-366.3q0-34.49 24.26-58.75 24.26-24.25 58.74-24.25H378.5v83H266.87v366.3h426.26v-366.3H581.5v-83h111.63q34.78 0 58.89 24.25 24.11 24.26 24.11 58.75v366.3q0 34.48-24.27 58.74-24.27 24.26-58.77 24.26h-426.5ZM438.5-327.63v-435.13l-57 57-58.65-58.41L480-921.57l157.15 157.4-58.65 58.41-57-57v435.13h-83Z"/></svg>',

  // Rounded
  bookmark:
    '<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="m480-240-186.67 80Q260-145.67 230-165.34T200-221v-555.67q0-27 19.83-46.83 19.84-19.83 46.84-19.83h426.66q27 0 46.84 19.83Q760-803.67 760-776.67V-221q0 35.99-30 55.66-30 19.67-63.33 5.34L480-240Zm0-72 213.33 90.67v-555.34H266.67v555.34L480-312Zm0-464.67H266.67h426.66H480Z"/></svg>',
};

// Replace all icons inside a container with inline SVGs
function replaceAllIcons(container) {
  function copyStyles(source, target, props) {
    const computed = getComputedStyle(source);
    props.forEach((prop) => {
      target.style[prop] = computed[prop];
    });
  }
  // Font Awesome

  // Material Symbols
  container
    .querySelectorAll('span[class^="material-symbols"]')
    .forEach((icon) => {
      const name = icon.textContent.trim();
      if (materialSvgMap[name]) {
        const svgWrapper = document.createElement("span");
        svgWrapper.className = "svg-icon-wrapper";
        svgWrapper.innerHTML = materialSvgMap[name];
        svgWrapper.style.display = "inline-block";

        // Copy important styles
        copyStyles(icon, svgWrapper, [
          "color",
          "fontSize",
          "marginTop",
          "marginBottom",
          "marginLeft",
          "marginRight",
          "verticalAlign",
          "margin",
        ]);

        icon.replaceWith(svgWrapper);
        if (name.includes("bookmark")) {
          svgWrapper.style.marginTop = "12px";
        }
        if (name.includes("share")) {
          svgWrapper.style.marginTop = "7px";
        }
        if (name.includes("chart")) {
          svgWrapper.style.marginTop = "7px";
        }
      }
    });
}
function copyAllComputedStyles(source, target) {
  const computed = getComputedStyle(source);
  for (const key of computed) {
    target.style[key] = computed.getPropertyValue(key);
  }
}
