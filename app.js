// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}

const weatherApi = {
    key: "0df00e00143f04d540285cb87aad9676",
    baseUrl: "http://api.openweathermap.org/data/2.5/weather",
}

const searchInput = document.getElementById('input-box');

searchInput.addEventListener('keypress', (event) => {

    if(event.keyCode == 13) {
        console.log(searchInput.value);
        getWeatherReport(searchInput.value);
        document.querySelector('.content').style.display = "block";
    }
    
});


function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`) 
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}


function showWeatherReport(weather) {
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`; 
    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `Max:${Math.ceil(weather.main.temp_max)}&deg;C  Min:${Math.floor(weather.main.temp_min)}&deg;C`;

    document.getElementById("min-max").style.wordSpacing = "20px";

    let weatherType = document.getElementById('report');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('./img/clear.jpg')"; 
    } 
    else if(weatherType.textContent == 'Clouds') {
         document.body.style.backgroundImage = "url('./img/clouds.jpg')";
    }
     else if(weatherType.textContent == 'Haze') {
        document.body.style.backgroundImage = "url('./img/Haze.jpg')";
    } 
    else if(weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('./img/rain.jpg')";
    }
     else if(weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('./img/snow.jpg')";
    } 
    else if(weatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url('./img/thunderstom.jpg')";
    }
}


function dateManage(dateArgument) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 
    let months = [01,02,03,04,05,06,07,08,09,10,11,12];

    let day = days[dateArgument.getDay()];
    let date = dateArgument.getDate();
    let month = months[dateArgument.getMonth()];
    let year = dateArgument.getFullYear();

    document.getElementById("date").style.wordSpacing = "10px";

    return `${day}, ${date}-${month}-${year}`;
}