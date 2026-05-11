const apiKey = "e400639bdd4162d7c6d09508a25831ed";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const display = document.getElementById("weather-display");

const fetchWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    renderWeather(data);
  } catch (err) {
    display.innerHTML = `<p style="color: #ff4d4d;">${err.message}</p>`;
  }
};

const renderWeather = (data) => {
  const { name } = data;
  const { temp, humidity } = data.main;
  const { description, icon } = data.weather[0];
  const { speed } = data.wind;

  display.innerHTML = `
        <div class="city">${name}</div>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
        <div class="temp">${Math.round(temp)}°C</div>
        <div class="desc">${description.toUpperCase()}</div>
        
        <div class="details">
            <div class="detail-item">
                <i class="fa-solid fa-droplet"></i>
                <p>${humidity}%</p>
                <span>Humidity</span>
            </div>
            <div class="detail-item">
                <i class="fa-solid fa-wind"></i>
                <p>${speed} m/s</p>
                <span>Wind</span>
            </div>
        </div>
    `;
};

searchBtn.addEventListener("click", () => {
  if (cityInput.value) fetchWeather(cityInput.value);
});

// Allow "Enter" key to trigger search
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") fetchWeather(cityInput.value);
});
