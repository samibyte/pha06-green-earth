const loadPlant = () => {
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

loadPlant();
