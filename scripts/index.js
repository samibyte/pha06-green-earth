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
            <button class="btn w-full rounded-full bg-[#15803D] text-white">
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

const cart = document.getElementById("cart-panel");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  console.log(scrollY);

  if (scrollY >= 550) {
    // stick drawer below navbar
    cart.style.position = "sticky";
    cart.style.top = 85 + "px";
    cart.style.height = `calc(100vh - ${85}px)`;
  } else {
    // normal drawer position
    cart.style.position = "static";
    cart.style.top = "auto";
    cart.style.height = "calc(100vh - 0px)";
  }
});
