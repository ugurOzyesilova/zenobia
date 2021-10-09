const API_KEY = "563492ad6f91700001000001a3efbc496be74221bb0eb5b84b1adc12";
// GET https://api.pexels.com/v1/curated?page=2&per_page=40
const gallery = document.querySelector(".gallery");
const search = document.querySelector(".search__input");
const searchButton = document.querySelector(".fa-search");
const formOpener = document.querySelector(".fa-question-circle");
const formCloser = document.querySelector(".form__close")
const formBg = document.querySelector(".form__bg")
let searchValue;



formOpener.onclick = () => {
  formBg.classList.add("form__bg__active");
}

formCloser.onclick = () => {
  formBg.classList.remove("form__bg__active")
}








search.addEventListener("input", function (e) {
  console.log(e.target.value);
  searchValue = e.target.value;
});


searchButton.addEventListener("click", async function (e) {
  e.preventDefault();
  let data = await searchPhoto(searchValue);
  console.log(data);
  gallery.innerHTML = "";
  await data.photos.forEach((photo) => {
    //console.log(photo)
    /*const galleryPhoto = document.createElement("div");
        galleryPhoto.classList.add("gallery__photo");*/
    let photo_img = `
          <div class="gallery__photo">
            <img src = ${photo.src.large}></img>
            <div class = "photo__info">
              <h2>${photo.photographer}</h2>
            </div>
          </div>
        `;
    gallery.innerHTML += photo_img;
  });
  console.log(searchValue);
});

const getPhotos = () => {
  fetch("https://api.pexels.com/v1/curated?page=1&per_page=80", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.photos);
      data.photos.forEach((photo) => {
        //console.log(photo)
        let photo_img = `
          <div class="gallery__photo">
            <img src = ${photo.src.large}></img>
            <div class = "photo__info">
              <h2>${photo.photographer}</h2>
            </div>
          </div>
        `;

        gallery.innerHTML += photo_img;
      });
    });
};

const searchPhoto = (query) => {
  return fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=40page=1`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: API_KEY,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

getPhotos();



