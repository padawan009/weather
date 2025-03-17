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
let isFahrenheit = true;

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
    
    weatherResultBlock.style.display = 'block';

    changeDegreeBtn.textContent = `${degreeSign}C`;
    changeDegreeBtn.onclick = () => {
      updateDegree(temp_c, temp_f, feelslike_c, feelslike_f);
    };

    // console.log(is_day)
    // console.log(weatherData.current.temp_f);
    // console.log(weatherData.current.feelslike_f);
    // console.log(weatherData.current.humidity);
    // console.log(weatherData.current.wind_kph);
    // console.log(weatherData.current.condition.text);

  } catch (error) {
    alert(`${error}. Try again later.`)
  }
}

function updateDegree(temp_c, temp_f, feelslike_c, feelslike_f) {
  if (isFahrenheit) {
    temperature.textContent = `${temp_c} ${degreeSign}C`;
    feelsLike.textContent = `Feels like: ${feelslike_c} ${degreeSign}C`;
    changeDegreeBtn.textContent = `${degreeSign}F`;
  } else {
    temperature.textContent = `${temp_f} ${degreeSign}F`;
    feelsLike.textContent = `Feels like: ${feelslike_f} ${degreeSign}F`;
    changeDegreeBtn.textContent = `${degreeSign}C`;
  }
  isFahrenheit = !isFahrenheit;
}

function updateBackgroundVideo(is_day) {
  let currentVideo = document.querySelector('.weather-video');
  let currentBodyVideo = document.querySelector('.weather-video-body')

  const videoDaySrc = './assets/0_Sunset_Clouds_1280x720.mp4';
  const videoNightSrc = './assets/0_Night Sky_Stars_1280x720.mp4';

  const videoSrc = is_day ? videoDaySrc : videoNightSrc;
  const videoOpacity = is_day ? '0.6' : '0.8';

  if (!currentVideo) {
    currentVideo = document.createElement('video');
    currentVideo.classList.add('weather-video');
    currentVideo.autoplay = true;
    currentVideo.muted = true;
    currentVideo.loop = true;
    currentVideo.src = videoSrc;
    currentVideo.style.opacity = videoOpacity;
    weatherResultBlock.prepend(currentVideo); 
  }
  else {
    if (currentVideo.src !== videoSrc) {
      currentVideo.src = videoSrc;
      currentVideo.style.opacity = videoOpacity;
    }
  }

  if(!currentBodyVideo) {
    currentBodyVideo = document.createElement('video');
    currentBodyVideo.classList.add('weather-video-body')
    currentBodyVideo.autoplay = true;
    currentBodyVideo.muted = true;
    currentBodyVideo.loop = true;
    currentBodyVideo.src = videoSrc;
    currentBodyVideo.style.opacity = videoOpacity;
    document.body.appendChild(currentBodyVideo);
  }
  else {
    if (currentBodyVideo.src !== videoSrc) {
      currentBodyVideo.src = videoSrc;
      currentBodyVideo.style.opacity = videoOpacity;
    }
  }
}

