// app.js

const gameInput = document.getElementById("gameTitle");
const gameSuggestions = document.getElementById("gameSuggestions");
const discountSelect = document.getElementById("discount");
const searchBtn = document.getElementById("search");
const dealsContainer = document.getElementById("deals");

// Fetch store names once and map them by ID
let storeMap = {};

async function fetchStores() {
  try {
    const res = await fetch("https://www.cheapshark.com/api/1.0/stores");
    const stores = await res.json();
    stores.forEach(store => {
      storeMap[store.storeID] = store.storeName;
    });
  } catch (err) {
    console.error("Failed to fetch store names:", err);
  }
}

function renderDeal(container, deals) {
  container.innerHTML = ""; // Clear previous results

  if (!deals || deals.length === 0) {
    container.innerHTML = "<p>No game available.</p>";
    return;
  }

  deals.forEach((deal) => {
    const dealEl = document.createElement("div");
    dealEl.className = "deal";
    dealEl.innerHTML = `
      <img src="${deal.thumb}" alt="${deal.title}" />
      <div>
        <h3>${deal.title}</h3>
        <p><strong>Store:</strong> ${storeMap[deal.storeID] || "Unknown"}</p>
        <p><strong>Sale Price:</strong> $${deal.salePrice}</p>
        <p><strong>Original Price:</strong> $${deal.normalPrice}</p>
        <p><strong>Discount:</strong> ${parseFloat(deal.savings).toFixed(0)}%</p>
        <a href="https://www.cheapshark.com/redirect?dealID=${deal.dealID}" target="_blank">View Deal</a>
      </div>
    `;
    container.appendChild(dealEl);
  });
}


// Suggest top deals as user types
async function suggestGames(query) {
  try {
    const res = await fetch(`https://www.cheapshark.com/api/1.0/deals?title=${query}&pageSize=5&sortBy=Savings`);
    const data = await res.json();
    gameSuggestions.innerHTML = "";
    data.forEach(deal => {
      const li = document.createElement("li");
      li.textContent = deal.title;
      li.addEventListener("click", () => {
        gameInput.value = deal.title;
        gameSuggestions.innerHTML = "";
      });
      gameSuggestions.appendChild(li);
    });
  } catch (err) {
    console.error("Suggestion error:", err);
  }
}

gameInput.addEventListener("input", () => {
  const query = gameInput.value.trim();
  if (query.length > 2) {
    suggestGames(query);
  } else {
    gameSuggestions.innerHTML = "";
  }
});

// Search for deals based on game title and minimum discount
searchBtn.addEventListener("click", async () => {
  const title = gameInput.value.trim();
  const minDiscount = Number(discountSelect.value);

  try {
    const res = await fetch(`https://www.cheapshark.com/api/1.0/deals?title=${title}&sortBy=Savings`);
    const data = await res.json();

    const filtered = data
      .filter(deal => parseFloat(deal.savings) >= minDiscount)
      .sort((a, b) => parseFloat(b.savings) - parseFloat(a.savings));

    dealsContainer.innerHTML = "";
    filtered.forEach(deal => renderDeal(dealsContainer, deal));
  } catch (err) {
    console.error("Search error:", err);
  }
});

// Init
fetchStores();
