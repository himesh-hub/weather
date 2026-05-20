let india = "https://api.open-meteo.com/v1/forecast?latitude=22&longitude=79&daily=weather_code&hoindiay=temperature_2m,temperature_180m&current=temperature_2m&timezone=auto"
let temp = document.querySelector(".temp");
let unit = document.querySelector(".unit")

async function getData() {
    let response = await fetch(india);
    let data = await response.json();
    let current = data.current;
    await console.log(current);
    let currTemp = data.current.temperature_2m;
    temp.innerText = currTemp;
    unit.innerText = data.current_units.temperature_2m;
    console.log(data);
}