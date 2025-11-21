fetch("./images.json")
  .then((res) => res.json())
  .then((images) => {
    // this will loop through and assign each one
    const imageIds = [
      "hero_blurb",
      "blurbifyplane",
      "nopfp",
      "direction_arrow",
      "aboveblurb",
      "belowblurb",
      "verified",
    ];

    // Loop through IDs and assign .src safely
    imageIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el && images[id]) {
        el.src = images[id];
        console.log(`Set ${id} to ${images[id]}`);
      }
    });

    // Favicon handled separately since it uses .href instead of .src
    const faviconEl = document.getElementById("favicon");
    if (faviconEl && images.blurbifyverified) {
      faviconEl.href = images.blurbifyverified;
      console.log("Updated favicon");
    }
  })
  .catch((err) => console.error("Image JSON load error:", err));
