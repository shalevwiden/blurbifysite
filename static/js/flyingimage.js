const flyingimageInput = document.getElementById("flyingimageInput");
flying_image_preview = document.getElementById("flying_image_preview");
let flyingimage1 = document.querySelector("#flyingimage1");

flyingimageInput.addEventListener("change", () => {
  const file = flyingimageInput.files[0]; // get the post image uploaded file
  if (!file) return;

  const reader = new FileReader();

  // when file is read, show preview
  reader.onload = (e) => {
    const result = e.target.result; // base64 data URL
    flying_image_preview.src = result;
    flyingimage1.src = result;
  };

  reader.readAsDataURL(file); // reads file as Base64
});
