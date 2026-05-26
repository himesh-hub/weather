let india = "https://api.open-meteo.com/v1/forecast?latitude=22&longitude=79&daily=sunrise,sunset,weather_code&hourly=temperature_2m,rain,wind_speed_10m,weather_code&current=temperature_2m,is_day,rain,wind_speed_10m,weather_code&timezone=auto"
let temp = document.querySelector(".temp");
let unit = document.querySelector(".unit");
let time = document.querySelector(".time");
let rain = document.querySelector(".rain");
let dayNight = document.querySelector(".dayNight");
let weatherCode = document.querySelector(".weather")

async function getData() {
    let response = await fetch(india);
    let data = await response.json();
    let current = data.current;
    await console.log(current);
    let currTemp = data.current.temperature_2m;
    temp.innerText = currTemp;
    unit.innerText = data.current_units.temperature_2m;
    time.innerText = current.time;
    rain.innerText = current.rain;
    if(current.is_day === 1){
        dayNight.innerText = "Day";
    }else{
        dayNight.innerText = "Night";
    }
    console.log(data);
    weather_code()
}

async function weather_code() {
    let response = await fetch(india);
    let data = await response.json();
    let current = data.current;
    let weather = current.weather_code;
    console.log(weather);
    if(weather === 0 ){
       weatherCode.innerText = "clear"; 
    }else if (weather > 0 && weather < 2) {
        weatherCode.innerText = "Partly cloudy";
    }else if (weather > 1 && weather < 3) {
        weatherCode.innerText = "few clouds";
    }else if (weather > 2 && weather < 4 ) {
        weatherCode.innerText = "overcast";
    }else if(weather > 3 && weather < 46){
        weatherCode.innerText = "Fog";
    }else if(weather > 45 && weather < 49 ){
        weatherCode.innerText = "freezing fog";
    }else if(weather > 48 && weather < 52 ){
        weatherCode.innerText = "Drizzle";
    }else if(weather > 51 && weather < 54){
        weatherCode.innerText = "moderate Drizzle";
    }else if(weather > 53 && weather < 56 ){
        weatherCode.innerText = "heavy Drizzle";
    }else if(weather > 55 && weather < 57 ){
        weatherCode.innerText = "Freezing drizzle";
    }else if(weather > 60 && weather < 71 ){
        weatherCode.innerText = "Rain";
    }else if(weather > 70 && weather < 77){
        weatherCode.innerText = "snow";
    }else if(weather > 76 && weather < 78 ){
        weatherCode.innerText = "Ice pellets";
    }else if(weather > 79 && weather < 85){
        weatherCode.innerText = "shower";
    }else if(weather > 85 && weather < 87){
        weatherCode.innerText = "snow shower";
    }else if(weather > 94 && weather < 96){
        weatherCode.innerText = "Thunderstorm";
    }else if(weather > 94 && weather < 96){
        weatherCode.innerText = "Thunderstorm with hail";
    }
}