//api key info
const apiKey = "e7ca8185618532a2e81ecd059e79faa2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#text");
const searchBtn = document.querySelector("#search");
const weatherIcon = document.querySelector(".weather-icon");
const mapIcon = document.querySelector("#pin");

// pulls weather info from api
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();
    

    document.querySelector("#city").innerHTML = data.name + ", " + data.sys.country;
    document.querySelector("#main-temp").innerHTML = Math.round(data.main.temp) + "&degC";
    document.querySelector("#humidity").innerHTML = data.main.humidity + " %";
    document.querySelector("#wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector("#feel-like").innerHTML = Math.round(data.main.feels_like) + "&degC";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "./assets/img/weather_icons/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "./assets/img/weather_icons/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "./assets/img/weather_icons/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "./assets/img/weather_icons/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "./assets/img/weather_icons/mist.png";
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "./assets/img/weather_icons/snow.png";
    }
    
}


// input by onclick button
searchBtn.addEventListener("click", () => {checkWeather(searchBox.value)})

//input onkeypress 
searchBox.addEventListener("keyup", setInput);
function setInput(evt) {
    if (evt.keyCode == 13) {
        checkWeather(searchBox.value);
    }
}


checkWeather()

// shows current date
window.onload = () => {
    const date = new Date();
    let months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let currentDay = String(date.getDate()).padStart(2, '0');
    let currentMonth = months[date.getMonth()];
    let currentYear = date.getFullYear();
  
    document.querySelector("#date").innerHTML = `${currentMonth} ${currentDay}, ${currentYear}`;
};




//get  Weather by user location
const locationBtn = document.querySelector("#location");
const infoTxt = document.querySelector(".info-txt");

locationBtn.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else {
            alert("Your browser do not support geolocation api");
        }
    });

    function onSuccess(position){
        const {latitude, longitude} = position.coords;
        let api = `http://api.openweathermap.org/geo/1.0/reverse?
        lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        
        

        fetch(api)
        .then(response => response.json())
        .then(data => {
            console.log(data);
           document.querySelector("#city").innerHTML = data.name + `${latitude}` + `${longitude}`
            
            
        })
       
    }

    function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
    }

checkWeather()


