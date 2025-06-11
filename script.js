const priceEl = document.getElementById("price");
const countdownEl = document.getElementById("countdown");
const currencyEl = document.getElementById("currency");
const range = document.getElementById("threshold");
const rangeVal = document.getElementById("rangeVal");
const toggleTheme = document.getElementById("toggleTheme");
const soundSelector = document.getElementById("soundSelector");
const playBtn = document.getElementById("playSound");
const audio = document.getElementById("audio");

let seconds = 10;

// 🔄 Live-prisuppdatering
async function updatePrice() {
  const currency = currencyEl.value;
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd`
  );
  const data = await res.json();
  const price = data[currency]?.usd?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  priceEl.textContent = price || "$--";
}

// 🕒 Timer
setInterval(() => {
  countdownEl.textContent = seconds;
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
