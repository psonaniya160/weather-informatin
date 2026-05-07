let cityName = document.querySelector(".weather_city");
let w_datetime = document.querySelector(".weather_date_time");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let w_forecast=document.querySelector(".weather_forecast");
let city_name=document.querySelector(".city_name");
let city_search=document.querySelector(".search_weather");



const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDate);
};

let city="indore";
city_search.addEventListener("submit",(e)=>{
  e.preventDefault();
  console.log(city_name.value);
  city=city_name.value;
  fetchWeather();
  city_name.value="";
})

const fetchWeather = async () => {

  
const weatherUrl =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9051d2fff3c5ba63bb4ebf1d17185dff&units=metric`;
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();

    const { name, main, weather, wind, sys, dt } = data;

    cityName.innerText = `${name}, ${getCountryName(sys.country)}`;

    w_datetime.innerText = getDateTime(dt);

    w_temperature.textContent = `Temperature: ${main.temp}°`;

    w_minTem.textContent = `Min Temperature: ${main.temp_min}°`;

    w_maxTem.textContent = `Max Temperature: ${main.temp_max}°`;

    w_feelsLike.textContent = `${main.feels_like}°`;

    w_wind.textContent = `${wind.speed} km/h`;

    w_pressure.textContent = `${main.pressure} hPa`;

    w_humidity.textContent = `${main.humidity}%`;

    w_icon.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />
    `;

    w_forecast.textContent = weather[0].main;

  } catch (error) {
    console.log("There is an error:", error);
  }
};

window.addEventListener("load", fetchWeather);