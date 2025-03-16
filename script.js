const myWeatherApi = 'dd60c39fc83f47b4ba801321251603';
const cityInput = document.querySelector('#city');
const city = document.querySelector('.weather-result__city');
const searchBtn = document.querySelector('#search-btn');
const weatherCondition = document.querySelector('.weather-result__condition');
const temperature = document.querySelector('.temperature');
const feelsLike = document.querySelector('.feelslike');
const windKph = document.querySelector('.wind-kph');
const humidity = document.querySelector('.humidity');
const degreeSign = '\u00B0';

let cityName = '';

searchBtn.addEventListener('click', async () => {
  cityName = cityInput.value;
  // if (cityName) {
  //   city.textContent = cityName;
  // }
  console.log(cityName);      
  await getWeather();
})

async function getWeather() {

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${myWeatherApi}&q=${cityName}`,
      {
        mode: 'cors',
      }
    )
    const weatherData = await response.json();
    city.textContent = `${weatherData.location.name}, ${weatherData.location.country}`;
    weatherCondition.textContent = weatherData.current.condition.text;
    temperature.textContent = `${weatherData.current.temp_f}${degreeSign}F`;
    feelsLike.textContent = `Feels like: ${weatherData.current.feelslike_f}${degreeSign}F`;
    windKph.textContent = `Wind: ${weatherData.current.wind_kph} kph`;
    humidity.textContent = `Humidity: ${weatherData.current.humidity} %`;


    console.log(weatherData);
    // console.log(weatherData.current.temp_f);
    // console.log(weatherData.current.feelslike_f);
    // console.log(weatherData.current.humidity);
    // console.log(weatherData.current.wind_kph);
    // console.log(weatherData.current.condition.text);

  }
