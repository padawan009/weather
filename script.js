const myWeatherApi = 'dd60c39fc83f47b4ba801321251603';
const cityInput = document.querySelector('#city');
const weatherResultBlock = document.querySelector('.weather-result')
const weatherForm = document.querySelector('.weather-form')
const city = document.querySelector('.weather-result__city');
const searchBtn = document.querySelector('#search-btn');
const weatherCondition = document.querySelector('.weather-result__condition');
const temperature = document.querySelector('.temperature');
const feelsLike = document.querySelector('.feelslike');
const windKph = document.querySelector('.wind-kph');
const airHumidity = document.querySelector('.humidity');
const changeDegreeBtn = document.querySelector('.change-degree')
const degreeSign = '\u00B0';
let cityName = '';

searchBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  weatherResultBlock.style.display = 'none';
  cityName = cityInput.value.trim();
  if (!cityName) {
    alert("Please enter the name of the city");
    return;
  }
  cityInput.value = '';
  console.log(cityName);      
  await getWeather();
})

async function getWeather() {
  try {
      const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${myWeatherApi}&q=${cityName}`,
      {
        mode: 'cors',
      }
    )
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const weatherData = await response.json();
    weatherForm.style.cssText = 'transform: translate(700px, -400px) scale(0.7); background-image: none; background-color: rgb(195, 196, 196); transition: all 1.8s ease-out;';

    const {
      location: { name, country },
      current: { condition, temp_f, temp_c, feelslike_f, feelslike_c, wind_kph, humidity, is_day },
    } = weatherData;

    updateBackgroundVideo(is_day);
    
    city.textContent = `${name}, ${country}`;
    weatherCondition.textContent = condition.text;
    temperature.textContent = `${temp_f} ${degreeSign}F`;
    feelsLike.textContent = `Feels like: ${feelslike_f} ${degreeSign}F`;
    windKph.textContent = `Wind: ${wind_kph} kph`;
    airHumidity.textContent = `Humidity: ${humidity}%`;

    let isFahrenheit = true;
    changeDegreeBtn.textContent = '°C';
    
    changeDegreeBtn.onclick = () => {
      if (isFahrenheit) {
        temperature.textContent = `${temp_c} ${degreeSign}C`;
        feelsLike.textContent = `Feels like: ${feelslike_c} ${degreeSign}C`;
        changeDegreeBtn.textContent = '°F';
      } else {
        temperature.textContent = `${temp_f} ${degreeSign}F`;
        feelsLike.textContent = `Feels like: ${feelslike_f} ${degreeSign}F`;
        changeDegreeBtn.textContent = '°C';
      }
      isFahrenheit = !isFahrenheit;
    };

    // console.log(is_day)
    // console.log(weatherData.current.temp_f);
    // console.log(weatherData.current.feelslike_f);
    // console.log(weatherData.current.humidity);
    // console.log(weatherData.current.wind_kph);
    // console.log(weatherData.current.condition.text);

    weatherResultBlock.style.display = 'block';

  } catch (error) {
    alert(`${error}. Try again later.`)
  }
}

function updateBackgroundVideo(is_day) {
  const currentVideo = document.querySelector('.weather-video');
  const currentBodyVideo = document.querySelector('.weather-video-body')

  if(currentVideo) {
    currentVideo.remove();
  }
  if (currentBodyVideo) {
    currentBodyVideo.remove();
  }

  const video = document.createElement('video');
  video.classList.add('weather-video');
  video.autoplay = true;
  video.muted = true;
  video.loop = true;

  const bodyVideo = document.createElement('video');
  bodyVideo.classList.add('weather-video-body')
  bodyVideo.autoplay = true;
  bodyVideo.muted = true;
  bodyVideo.loop = true;

  if (is_day) {
    video.src = './assets/0_Sunset_Clouds_1280x720.mp4';
    bodyVideo.src = './assets/0_Sunset_Clouds_1280x720.mp4';
    bodyVideo.style.opacity = '0.6';
    
  }
  else {
    video.src = './assets/0_Night Sky_Stars_1280x720.mp4';
    bodyVideo.src = './assets/0_Night Sky_Stars_1280x720.mp4';
    bodyVideo.style.opacity = '0.8';

  }

  weatherResultBlock.prepend(video); 
  document.body.appendChild(bodyVideo);
}

