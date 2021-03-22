const gallery = document.querySelector("#gallery");
const imageOverlay = document.querySelector("#img-overlay");
const closeOverlayButton = document.querySelector("#close-overlay");
const body = document.querySelector("body");

fetch("https://picsum.photos/v2/list?page=2&limit=12")
  .then((response) => response.json())
  .then((json) => {
    for (let picture of json) {
      let imageContainer = document.createElement("div");

      let image = document.createElement("img");
      image.src = picture.download_url;
      imageContainer.append(image);

      gallery.append(imageContainer);
    }
  });

gallery.addEventListener("click", (event) => {
  let image = document.createElement("img");
  image.src = event.target.src;

  gImages = gallery.getElementsByTagName("img");
  for (let gImage of gImages) gImage.style.filter = "blur(5px)";

  body.style.backgroundColor = "black";

  imageOverlay.style.display = "grid";
  imageOverlay.style.placeItems = "center";

  setTimeout(image.classList.add("appear"), 1000);

  imageOverlay.append(image);
});

function closeOverlay(event) {
  if (event.target.tagName == "IMG") return;

  imageOverlay.innerHTML = "";
  imageOverlay.append(closeOverlayButton);

  gImages = gallery.getElementsByTagName("img");
  for (let gImage of gImages) gImage.style.filter = "";

  body.style.backgroundColor = "white";

  imageOverlay.style.display = "none";
}

closeOverlayButton.addEventListener("click", closeOverlay);
imageOverlay.addEventListener("click", closeOverlay);
