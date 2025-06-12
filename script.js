const priceEl = document.getElementById("price");
const countdownEl = document.getElementById("countdown");
const currencyEl = document.getElementById("currency");
const range = document.getElementById("threshold");
const rangeVal = document.getElementById("rangeVal");
const toggleTheme = document.getElementById("toggleTheme");
const soundSelector = document.getElementById("soundSelector");
const playBtn = document.getElementById("playSound");
const audio = document.getElementById("audio");
const chartEl = document.getElementById("chart");

let seconds = 10;
let previousPrice = null;

// 🔄 Prisuppdatering
async function updatePrice() {
  const currency = currencyEl.value;
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd`
    );
    const data = await res.json();
    const currentPrice = data[currency].usd;
    priceEl.textContent = `$${currentPrice.toLocaleString("en-US")}`;

    if (previousPrice) {
      const diffPercent = ((currentPrice - previousPrice) / previousPrice) * 100;
      const threshold = parseFloat(range.value);

      if (Math.abs(diffPercent) >= threshold) {
        audio.src = `assets/sounds/${soundSelector.value}.wav`;
        audio.play();
        showAlert(diffPercent.toFixed(2));
      }
    }
    previousPrice = currentPrice;
  } catch {
    priceEl.textContent = "N/A";
  }
}

function showAlert(change) {
  const msg = `⚠ Prisförändring: ${change}%`;
  alert(msg); // Du kan byta ut detta mot en snygg visuell varning i framtiden
}

// ⏱ Timer
setInterval(() => {
  countdownEl.textContent = seconds;
  seconds--;
  if (seconds < 0) {
    seconds = 10;
    updatePrice();
  }
}, 1000);

// 🌗 Tema
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
});
if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark");
}

// 🎚 Tröskel
range.addEventListener("input", () => {
  rangeVal.textContent = `${range.value}%`;
  localStorage.setItem("threshold", range.value);
});
range.value = localStorage.getItem("threshold") || 5;
rangeVal.textContent = `${range.value}%`;

// 🔊 Ljudtest
playBtn.addEventListener("click", () => {
  const sound = soundSelector.value;
  audio.src = `assets/sounds/${sound}.wav`;
  audio.play();
});

// 📈 Diagram
new Chart(chartEl.getContext("2d"), {
  type: "line",
  data: {
    labels: Array.from({ length: 10 }, (_, i) => `-${10 - i}m`),
    datasets: [
      {
        label: "Simulerat pris",
        data: [56100, 56220, 56000, 55800, 55900, 55700, 55850, 55600, 55500, 55450],
        borderColor: "#6366f1",
        borderWidth: 2,
        tension: 0.3,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: false },
    },
  },
});

// ▶ Init
updatePrice();
;
  seconds--;
  if (seconds < 0) {
    seconds = 10;
    updatePrice();
  }
}, 1000);

// 🌗 Mörkt läge
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
});
if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark");
}

// 🎚️ Threshold-slider
range.addEventListener("input", () => {
  rangeVal.textContent = range.value;
  localStorage.setItem("threshold", range.value);
});
rangeVal.textContent = localStorage.getItem("threshold") || range.value;

// 🔊 Spela ljud
playBtn.addEventListener("click", () => {
  const sound = soundSelector.value;
  audio.src = `assets/sounds/${sound}.wav`;
  audio.play();
});

// 📊 Diagram
const ctx = document.getElementById("chart").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: Array.from({ length: 10 }, (_, i) => `-${10 - i}m`),
    datasets: [
      {
        label: "Pris (simulerad)",
        data: [56100, 56220, 56000, 55800, 55900, 55700, 55850, 55600, 55500, 55450],
        borderColor: "#6366f1",
        borderWidth: 2,
        tension: 0.3,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: false },
    },
  },
});

// ⏳ Init
updatePrice();
