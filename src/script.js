const cityTemperature = document.querySelector('#city-temperature')
const temperature = document.querySelector('#temperature')
const feelsLike = document.querySelector('#feels-like')
const humidity = document.querySelector('#humidity')
const windSpeed = document.querySelector('#wind-speed')
const errorSpan = document.querySelector('#error')
const icons = document.querySelectorAll('.icon')

const app = document.querySelector('.app')

function hideIcons() {
  icons.forEach(icon => icon.style.display = 'none')
}

function showIcons() {
  icons.forEach(icon => icon.style.display = 'block')
}

function validateResp(resp) {
  if (resp.hasOwnProperty('success')) {
    hideIcons()
    errorSpan.innerHTML = 'Não foi possível encontrar a sua cidade, tente novamente.'
    return
  } else {
    return resp
  }
}

function render(weather) {
  cityTemperature.innerHTML += `${weather.request.query} ${weather.current.temperature}ºC`
  feelsLike.innerHTML += `Sensação termica de ${weather.current.feelslike}ºC`
  humidity.innerHTML += `Umidade ${weather.current.humidity}%`
  windSpeed.innerHTML += `Velocidade do vento ${weather.current.wind_speed}Km/h`
  showIcons()
  console.log(weather)
}

function getWeather(query) {

  return fetch(`http://api.weatherstack.com/current?access_key=9e6643dd39483edcf2f0359b0a28080b&query=${query}`)
    .then(resp => resp.json())
    .then(obj => validateResp(obj))
    .then(weather => render(weather))
}

function start() {
  const query = document.querySelector('#query').value || 'Brasília'


  if (query.length === 0) {
    alert('Por favor, informe uma cidade.')
  } else {
    // Cleaning the page to re-render 
    errorSpan.innerHTML = ''
    cityTemperature.innerHTML = ''
    feelsLike.innerHTML = ''
    humidity.innerHTML = ''
    windSpeed.innerHTML = ''
    hideIcons()
    getWeather(query)
  }

}

// initializing the elements
start()