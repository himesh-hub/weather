let india = "https://api.open-meteo.com/v1/forecast?latitude=22&longitude=79&daily=sunrise,sunset,weather_code&hourly=temperature_2m,rain,wind_speed_10m,weather_code&current=temperature_2m,is_day,rain,wind_speed_10m,weather_code&timezone=auto"
let temp = document.querySelector(".temp");
let unit = document.querySelector(".unit");
let time = document.querySelector(".time");
let rain = document.querySelector(".rain");
let dayNight = document.querySelector(".dayNight");

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
}