let wardrobe =
  JSON.parse(localStorage.getItem("wardrobe")) || [];

let savedOutfits =
  JSON.parse(localStorage.getItem("savedOutfits")) || [];

let selectedImage = "";


/* =========================
   ELEMENTS
========================= */

const addClothesBtn =
  document.getElementById("addClothesBtn");

const heroAddBtn =
  document.getElementById("heroAddBtn");

const generateBtn =
  document.getElementById("generateBtn");

const methodModal =
  document.getElementById("methodModal");

const detailsModal =
  document.getElementById("detailsModal");

const closeMethod =
  document.getElementById("closeMethod");

const cancelMethod =
  document.getElementById("cancelMethod");

const closeDetails =
  document.getElementById("closeDetails");

const galleryBtn =
  document.getElementById("galleryBtn");

const cameraBtn =
  document.getElementById("cameraBtn");

const galleryInput =
  document.getElementById("galleryInput");

const cameraInput =
  document.getElementById("cameraInput");

const previewImage =
  document.getElementById("previewImage");

const clothesForm =
  document.getElementById("clothesForm");

const wardrobeElement =
  document.getElementById("wardrobe");

const clothesCount =
  document.getElementById("clothesCount");

const outfitCount =
  document.getElementById("outfitCount");

const heroClothes =
  document.getElementById("heroClothes");

const heroOutfits =
  document.getElementById("heroOutfits");

const styleStatus =
  document.getElementById("styleStatus");

const outfitSection =
  document.getElementById("outfitSection");

const generatedOutfit =
  document.getElementById("generatedOutfit");


/* =========================
   STORAGE
========================= */

function saveData() {

  localStorage.setItem(
    "wardrobe",
    JSON.stringify(wardrobe)
  );

  localStorage.setItem(
    "savedOutfits",
    JSON.stringify(savedOutfits)
  );

}


/* =========================
   ADD CLOTHES MODAL
========================= */

function openAddClothes() {

  methodModal.classList.remove("hidden");

}

addClothesBtn.addEventListener(
  "click",
  openAddClothes
);

heroAddBtn.addEventListener(
  "click",
  openAddClothes
);


/* =========================
   CLOSE METHOD MODAL
========================= */

function closeMethodModal() {

  methodModal.classList.add("hidden");

}

closeMethod.addEventListener(
  "click",
  closeMethodModal
);

cancelMethod.addEventListener(
  "click",
  closeMethodModal
);


/* =========================
   GALLERY
========================= */

galleryBtn.addEventListener(
  "click",
  () => {

    galleryInput.click();

  }
);


/* =========================
   CAMERA
========================= */

cameraBtn.addEventListener(
  "click",
  () => {

    cameraInput.click();

  }
);


/* =========================
   IMAGE HANDLER
========================= */

function handleImage(file) {

  if (!file) return;

  if (!file.type.startsWith("image/")) {

    alert("Please select an image.");

    return;
  }


  const reader =
    new FileReader();


  reader.onload = function(event) {

    selectedImage =
      event.target.result;


    previewImage.src =
      selectedImage;


    methodModal.classList.add(
      "hidden"
    );


    detailsModal.classList.remove(
      "hidden"
    );

  };


  reader.readAsDataURL(file);

}


galleryInput.addEventListener(
  "change",
  () => {

    handleImage(
      galleryInput.files[0]
    );

  }
);


cameraInput.addEventListener(
  "change",
  () => {

    handleImage(
      cameraInput.files[0]
    );

  }
);


/* =========================
   CLOSE DETAILS
========================= */

closeDetails.addEventListener(
  "click",
  () => {

    detailsModal.classList.add(
      "hidden"
    );

    clothesForm.reset();

    selectedImage = "";

    previewImage.src = "";

  }
);


/* =========================
   DISPLAY WARDROBE
========================= */

function displayWardrobe() {

  clothesCount.textContent =
    wardrobe.length;

  heroClothes.textContent =
    wardrobe.length;

  outfitCount.textContent =
    savedOutfits.length;

  heroOutfits.textContent =
    savedOutfits.length;


  if (wardrobe.length === 0) {

    styleStatus.textContent =
      "NEW";


    wardrobeElement.innerHTML = `

      <div class="empty">

        <div class="empty-icon">
          +
        </div>

        <h4>
          Your wardrobe is empty
        </h4>

        <p>
          Add your first clothing item
          to start creating looks.
        </p>

      </div>

    `;

    return;

  }


  styleStatus.textContent =
    "ACTIVE";


  wardrobeElement.innerHTML = "";


  wardrobe.forEach((item) => {

    const card =
      document.createElement("div");

    card.className =
      "clothing-card";


    card.innerHTML = `

      <img
        class="clothing-image"
        src="${item.image}"
        alt="${item.name}"
      >

      <div class="clothing-info">

        <h4>
          ${item.name}
        </h4>

        <p>
          ${item.color}
          ·
          ${item.style}
        </p>

      </div>

    `;


    wardrobeElement.appendChild(card);

  });

}


/* =========================
   ADD CLOTHING
========================= */

clothesForm.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    if (!selectedImage) {

      alert("Please add a clothing photo first.");

      return;

    }


    const name =
      document.getElementById(
        "clothingName"
      ).value.trim();


    const category =
      document.getElementById(
        "category"
      ).value;


    const color =
      document.getElementById(
        "color"
      ).value;


    const style =
      document.getElementById(
        "style"
      ).value;


    if (
      !name ||
      !category ||
      !color ||
      !style
    ) {

      alert("Please complete all clothing details.");

      return;

    }


    const item = {

      id: Date.now(),

      name: name,

      category: category,

      color: color,

      style: style,

      image: selectedImage

    };


    wardrobe.push(item);

    saveData();

    displayWardrobe();


    clothesForm.reset();

    selectedImage = "";

    previewImage.src = "";


    detailsModal.classList.add(
      "hidden"
    );

  }
);


/* =========================
   GENERATE OUTFIT
========================= */

generateBtn.addEventListener(
  "click",
  () => {

    if (wardrobe.length < 3) {

      alert(
        "Add at least 3 clothing items first."
      );

      return;

    }


    const tops =
      wardrobe.filter(
        item =>
          item.category === "top"
      );


    const bottoms =
      wardrobe.filter(
        item =>
          item.category === "bottom"
      );


    const shoes =
      wardrobe.filter(
        item =>
          item.category === "shoes"
      );


    let outfit = [];


    /*
      If we have Top + Bottom + Shoes,
      create a proper outfit.
    */

    if (
      tops.length > 0 &&
      bottoms.length > 0 &&
      shoes.length > 0
    ) {

      const top =
        tops[
          Math.floor(
            Math.random() *
            tops.length
          )
        ];


      const bottom =
        bottoms[
          Math.floor(
            Math.random() *
            bottoms.length
          )
        ];


      const shoe =
        shoes[
          Math.floor(
            Math.random() *
            shoes.length
          )
        ];


      outfit = [
        top,
        bottom,
        shoe
      ];

    }


    /*
      If categories are not complete,
      still generate an outfit instead
      of showing the old error.
    */

    else {

      const shuffled =
        [...wardrobe].sort(
          () => Math.random() - 0.5
        );


      outfit =
        shuffled.slice(0, 3);

    }


    renderOutfit(outfit);

  }
);


/* =========================
   RENDER OUTFIT
========================= */

function renderOutfit(outfit) {

  generatedOutfit.innerHTML = "";


  const labels = [
    "FIRST PIECE",
    "SECOND PIECE",
    "THIRD PIECE"
  ];


  outfit.forEach(
    (item, index) => {

      const card =
        document.createElement("div");

      card.className =
        "outfit-item";


      card.innerHTML = `

        <img
          class="outfit-image"
          src="${item.image}"
          alt="${item.name}"
        >

        <div class="outfit-info">

          <span>
            ${labels[index]}
          </span>

          <h4>
            ${item.name}
          </h4>

          <p>
            ${item.color}
            ·
            ${item.style}
          </p>

        </div>

      `;


      generatedOutfit.appendChild(
        card
      );

    }
  );


  outfitSection.classList.remove(
    "hidden"
  );


  outfitSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================
   CLOSE MODALS BY BACKGROUND
========================= */

methodModal.addEventListener(
  "click",
  (event) => {

    if (
      event.target === methodModal
    ) {

      closeMethodModal();

    }

  }
);


detailsModal.addEventListener(
  "click",
  (event) => {

    if (
      event.target === detailsModal
    ) {

      detailsModal.classList.add(
        "hidden"
      );

    }

  }
);


/* =========================
   ESC KEY
========================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      methodModal.classList.add(
        "hidden"
      );

      detailsModal.classList.add(
        "hidden"
      );

    }

  }
);


/* =========================
   START APP
========================= */

displayWardrobe();