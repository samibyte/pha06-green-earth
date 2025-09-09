const categoryActiveState = (id) => {
  const categories = document.querySelectorAll(".category");
  categories.forEach((category) => {
    category.classList.remove("bg-[#15803D]", "text-white");
  });
  const category = document.getElementById(`category-${id}`);
  category.classList.add("bg-[#15803D]", "text-white");
};

const loadPlants = () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlants(data.plants));
};

const displayPlants = (plants) => {
  const plantContainer = document.getElementById("plant-container");
  plantContainer.innerHTML = "";

  plants.forEach((plant) => {
    const plantBox = document.createElement("div");
    plantBox.innerHTML = `
      <div class="rounded-lg">
            <img class="object-cover mb-5 rounded-t-lg w-full h-[350px]" src="${plant.image}" alt="" />
            <div class="mx-4">
              <h4 class="mb-2 text-[14px] font-semibold text-[#1F2937]">
              ${plant.name}
            </h4>
            <p class="line-clamp-3 mb-2 text-[12px] text-[rgba(31,41,55,0.8)]">${plant.description}
            </p>
            <div class="mb-3 flex items-center justify-between">
              <p
                class="giest-font bg-[#DCFCE7] px-3 py-1 text-[14px] font-medium text-[#15803D]"
              >
                ${plant.category}
              </p>
              <p class="text-[14px] font-semibold text-[#1F2937]">
                <i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}
              </p>
            </div>
            <button class="cart-btn btn w-full rounded-full bg-[#15803D] text-white">
              Add to Cart
            </button>
            </div>
          </div>
    `;

    plantContainer.appendChild(plantBox);
  });
};

const loadCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = `<ul>
              <li>
                <a
                  onclick="loadPlants(); categoryActiveState('0')"
                  class="block rounded-[4px] px-2.5 py-2 text-center md:text-left font-medium text-[#1F2937] hover:bg-[#4bd87f] cursor-pointer category"
                  id="category-0"
                  >All Trees</a
                >
              </li>
            </ul>`;

  categories.forEach((category) => {
    const categoryBox = document.createElement("ul");
    categoryBox.innerHTML = `
        <li>
          <a onclick="loadCategoryPlants(${category.id}); categoryActiveState(${category.id})"
            id="category-${category.id}"
            class="category block text-center  md:text-left rounded-[4px] px-2.5 py-2 font-medium text-[#1F2937] hover:bg-[#4bd87f] cursor-pointer"
            >${category.category_name}s</a
          >
        </li>
    `;
    categoryContainer.appendChild(categoryBox);
  });
};

const loadCategoryPlants = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlants(data.plants));
};

loadCategories();
loadPlants();

// add to cart functionality
let totalPrice = 0;
const plantContainer = document.getElementById("plant-container");
plantContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-btn")) {
    const cartItemContainer = document.getElementById("cart-item-container");
    const cartPriceContainer = document.getElementById("cart-price-container");
    cartPriceContainer.innerHTML = "";
    const cartBtn = e.target;

    const plantName = cartBtn.parentNode.children[0].innerText;
    const plantPrice = cartBtn.parentNode.children[2].children[1].innerText;
    const plantPriceNum = Number(plantPrice);

    totalPrice += plantPriceNum;

    const cartDiv = document.createElement("div");
    cartDiv.innerHTML = `
                <div
                  class="mb-2 flex items-center justify-between bg-[#F0FDF4] px-3 py-2"
                >
                  <div class="ml-3">
                    <p class="mb-1 font-semibold text-[#1F2937]">${plantName}</p>
                    <p class="text-[rgba(31,41,55,.5)]">
                      <i class="fa-solid fa-bangladeshi-taka-sign"></i>
                      <span>${plantPrice}</span> x 1
                    </p>
                  </div>
                  <i class="fa-solid fa-xmark cursor-pointer cart-delete-btn"></i>
                </div>
    `;

    const totalPriceDiv = document.createElement("div");
    totalPriceDiv.innerHTML = `
                <div class="mt-4 flex items-center justify-between">
                  <p class="font-medium text-[#1F2937]">Total:</p>
                  <p class="font-medium text-[#1F2937]">
                    <i class="fa-solid fa-bangladeshi-taka-sign"></i>${totalPrice}
                  </p>
                </div>
    `;
    cartItemContainer.appendChild(cartDiv);
    cartPriceContainer.appendChild(totalPriceDiv);
  }
});

const cartContainer = document.getElementById("cart-container");
cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-delete-btn")) {
    const cartItemContainer = document.getElementById("cart-item-container");
    const cartPriceContainer = document.getElementById("cart-price-container");
    cartPriceContainer.innerHTML = "";
    const cartDeleteBtn = e.target;

    const plantPrice =
      cartDeleteBtn.parentNode.children[0].children[1].children[1].innerText;
    console.log(plantPrice);
    const cartDiv = cartDeleteBtn.parentNode.remove();
    const plantPriceNum = Number(plantPrice);

    totalPrice -= plantPriceNum;

    if (totalPrice === 0) {
      cartPriceContainer.innerHTML = "";
    } else {
      const totalPriceDiv = document.createElement("div");
      totalPriceDiv.innerHTML = `
                <div class="mt-4 flex items-center justify-between">
                  <p class="font-medium text-[#1F2937]">Total:</p>
                  <p class="font-medium text-[#1F2937]">
                    <i class="fa-solid fa-bangladeshi-taka-sign"></i>${totalPrice}
                  </p>
                </div>
    `;
      cartPriceContainer.appendChild(totalPriceDiv);
    }
  }
});

// cart list sticky overlap fix
const cart = document.getElementById("cart-panel");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (scrollY >= 550) {
    cart.style.position = "sticky";
    cart.style.top = 85 + "px";
    cart.style.height = `calc(100vh - ${85}px)`;
  } else {
    cart.style.position = "static";
    cart.style.top = "auto";
    cart.style.height = "calc(100vh - 0px)";
  }
});
