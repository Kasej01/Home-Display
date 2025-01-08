const openWeatherMapApiKey = "<%= OWM_API_KEY %>";
const theNewsApiKey = "<% TNA_API_KEY%>";

function getWeatherIcons(data){
//All icons for weather

//Clouds
let heavy_clouds = document.createElement('img');
heavy_clouds.src="./images/heavy_clouds.svg";
heavy_clouds.alt="Very Cloudy Icon";

let clouds = document.createElement('img');
clouds.src = "./images/clouds.svg";
clouds.alt = "Cloudy Icon";

let partly_cloudy = document.createElement('img');
partly_cloudy.src = "./images/partly_cloudy.svg";
partly_cloudy.alt = "Partly Cloudy Icon";

//Sunny
let sunny = document.createElement('img');
sunny.src = "./images/sunny.svg";
sunny.alt = "Sunny Icon";

//Snow
let snow = document.createElement('img');
snow.src = "./images/snow.svg";
snow.alt = "Snow Icon";

//Rain
let rain = document.createElement('img');
rain.src = "./images/rain.svg";
rain.alt = "Rain Icon";

//Storms
let thunderstorms = document.createElement('img');
thunderstorms.src = "./images/thunderstorms.svg";
thunderstorms.alt = "Thunderstorms Icon";

let lightning = document.createElement('img');
lightning.src = "./images/lightning.svg";
lightning.alt = "Lightning Icon";

//Temperature
let cold = document.createElement('img');
cold.src = "./images/cold.svg";
cold.alt = "Cold Thermometer Icon";

let warm = document.createElement('img');
warm.src = "./images/warm.svg";
warm.alt = "Warm Thermometer Icon";

let hot = document.createElement('img');
hot.src = "./images/hot.svg";
hot.alt = "Hot Thermometer Icon";


//Ids:
// 800: Clear
// 801: Few Clouds
// 802: Scattered Clouds
// 803: Broken Clouds
// 804: Overcast Clouds

let current_temp = Math.round(data.current.temp);


for( let i = 0; i < data.current.weather.length; i++){
    let weatherId = data.current.weather[i].id;
    //Logic for weather icon addition
    if(weatherId == 804){
        document.getElementById("icons").appendChild(heavy_clouds);
    }
    else if(weatherId == 803){
        document.getElementById("icons").appendChild(clouds);
    }
    else if(weatherId == 802){
        document.getElementById("icons").appendChild(partly_cloudy);
    }
    else if(weatherId == 801 || weatherId == 800){
        document.getElementById("icons").appendChild(sunny);
    }
    if(weatherId >= 600 && weatherId <= 622){
        document.getElementById("icons").appendChild(snow);
    }
    if(current_temp<45){
        document.getElementById("icons").appendChild(cold);
    }
    else if(current_temp>=45 && current_temp<60){
        document.getElementById("icons").appendChild(warm);
    }
    else if(current_temp>=60){
        document.getElementById("icons").appendChild(hot);
    }

    if(weatherId >=300 && weatherId <=321 || weatherId >= 500 && weatherId <=531){
        document.getElementById("icons").appendChild(rain);
    }
}

}

function getDateTime(){
    const now = new Date();

    const currentDateTime = now.toLocaleString();
    
    document.querySelector("#timestamp").textContent = currentDateTime;
}

function updatePhoto(){
    const noaaImage = document.getElementById("noaa-image");
    noaaImage.src = "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/678x678.jpg";
    console.log("Updated photo");
}

function getWeather(){
    //Gets the city from json and uses it to get the lon and lat coords of the city for returning weather information
    fetch("./config.json")
    .then((result) => {
        if (!result.ok){
            throw new Error (`HTTP Error! ${result.status}`);
        }
        return result.json();
    })
    .then((jsonData) => {
        let city = jsonData.city;
        let state = jsonData.state;
        let country = jsonData.country;

        let openWeatherMapGeoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${openWeatherMapApiKey}`;

        fetch(openWeatherMapGeoApiUrl)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                throw new Error('Response not returned from openweathermap geolocation');
            }})
            .then(geoData => {
                let cityGeo = geoData[0];
                let cityName = cityGeo.name;
                let cityState = cityGeo.state;
                const weatherApiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=` + cityGeo.lat + `&lon=` + cityGeo.lon + `&units=Imperial&appid=${openWeatherMapApiKey}`
                fetch(weatherApiURL)
                .then(response => {
                    if(response.ok){ return response.json(); }
                    else{ throw new Error('Response not returned from openweathermap'); }})
                .then(data => {
                    let current_temp = Math.round(data.current.temp);
                    let feels_like = Math.round(data.current.feels_like);
                    let todays_min = Math.round(data.daily[0].temp.min);
                    let todays_max = Math.round(data.daily[0].temp.max);
                    let todays_desc = data.daily[0].summary;
            
                    document.getElementById("city").textContent = cityName + ", " + cityState;
                    document.getElementById("temp").textContent = current_temp + String.fromCharCode(176);
                    document.getElementById("feels-like").textContent = feels_like + String.fromCharCode(176);
                    document.getElementById("min").textContent = todays_min + String.fromCharCode(176);
                    document.getElementById("max").textContent = todays_max + String.fromCharCode(176);
                    document.getElementById("desc").textContent = todays_desc;
                    console.log(data);
                    getWeatherIcons(data);
                })
                .catch(error => console.error('Error: ', error));
            })
        .catch(error => console.error('Error: ', error));
    })
}

function getNews(){
    let newsApiUrl = `https://api.thenewsapi.com/v1/news/top?api_token=${theNewsApiKey}&locale=us&limit=3`;

    fetch(newsApiUrl)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error('Response not returned from theNewsApi');
        }})
        .then(newsData => {
            let title = [];
            let source = [];
            
            for(let i=0; i < 3; i++){
                title[i] = newsData.data[i].title;
                source[i] = newsData.data[i].source;
                document.getElementById(`title${i+1}`).textContent = title[i];
                document.getElementById(`source${i+1}`).textContent = source[i];
            }
        })
}

getDateTime();
updatePhoto();
getWeather();
getNews();
document.addEventListener('DOMContentLoaded', () => {
    //updates the time every second
    setInterval(getDateTime, 1000);
    //Update the world photo every 10 minutes
    setInterval(updatePhoto, 600000);
    //Update the weather every 45 minutes
    setInterval(getWeather, 2700000);
    //Update the news every 3 hours
    setInterval(getNews, 18000000);
}
)