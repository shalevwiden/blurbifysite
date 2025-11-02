const flyingimageInput = document.getElementById("flyingimageInput");
flying_image_preview = document.getElementById("flying_image_preview");

flyingimageInput.addEventListener("change", () => {
  const file = flyingimageInput.files[0]; // get the post image uploaded file
  if (!file) return;

  const reader = new FileReader();

  // when file is read, show preview
  reader.onload = (e) => {
    flying_image_preview.src = e.target.result; // this is a base64 data URL
  };

  reader.readAsDataURL(file); // reads file as Base64
});
