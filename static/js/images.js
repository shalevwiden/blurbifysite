fetch("./images.json")
  .then((res) => res.json())
  .then((images) => {
    // use the JSON object
    document.getElementById("hero_blurb").src = images.hero_blurb;
    console.log(document.getElementById("hero_blurb").src);
    console.log("tried");
  });
