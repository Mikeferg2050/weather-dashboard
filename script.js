const apiKey = "33b7cdb5f4eac91124c3db15b190a521";

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("city-input").value;
    getWeather(city);
    saveCity(city);
    displayPrevCity();
  });

// save this
function saveCity(city) {
  let allSavedCitys = JSON.parse(localStorage.getItem("savedCitys")) || [];
  allSavedCitys.push(city);
  localStorage.setItem("savedCitys", JSON.stringify(allSavedCitys));
}

function displayPrevCity() {
  let allSavedCitys = JSON.parse(localStorage.getItem("savedCitys")) || [];
  console.log(allSavedCitys);
  for (let i = 0; i < allSavedCitys.length; i++) {
    let citybutton = document.createElement("button");
    citybutton.textContent = allSavedCitys[i];
    citybutton.addEventListener("click", funtion());
    document.getElementById("allSavedCitys").appendChild(citybutton);
  }
}

displayPrevCity();

function getWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      displayCurrentWeather(data);
      return fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
    })
    .then((response) => response.json())
    .then((data) => {
      displayForecast(data);
    })
    .catch((error) => console.log("Error:", error));
}

function displayCurrentWeather(data) {
  const currentWeatherDiv = document.getElementById("current-weather");
  currentWeatherDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";
  for (let i = 0; i < data.list.length; i += 8) {
    const forecastData = data.list[i];
    forecastDiv.innerHTML += `
            <div class="forecast-item">
                <h3>${new Date(
                  forecastData.dt * 1000
                ).toLocaleDateString()}</h3>
                <p>Temperature: ${forecastData.main.temp}°C</p>
                <p>Humidity: ${forecastData.main.humidity}%</p>
                <p>Wind Speed: ${forecastData.wind.speed} m/s</p>
            </div>
        `;
  }
}
