let india = "https://api.open-meteo.com/v1/forecast?latitude=22&longitude=79&daily=temperature_2m_max,sunrise,sunset,weather_code&hourly=temperature_2m,rain,wind_speed_10m,weather_code&current=temperature_2m,is_day,rain,wind_speed_10m,weather_code&timezone=auto"
let temp = document.querySelector(".temp");
let unit = document.querySelector(".unit");
let time = document.querySelector(".time");
let dayNight = document.querySelector(".dayNight");
let weatherCode = document.querySelector(".weather");
let dailytemperature = document.querySelectorAll(".daily-hour");
let hourlytemperature = document.querySelectorAll(".hourlys");

currentData()
dailyData()

async function currentData() {
    let response = await fetch(india);
    let data = await response.json();
    let current = data.current;
    await console.log(current);
    let currTemp = data.current.temperature_2m;
    temp.innerText = currTemp;
    unit.innerText = data.current_units.temperature_2m;
    time.innerText = current.time;
    if (current.is_day === 1) {
        dayNight.innerText = "Day";
    } else {
        dayNight.innerText = "Night";
    }
    console.log(data);
    weather_code();
}

async function dailyData() {
    let response = await fetch(india);
    let data = await response.json();
    let daily = data.daily;
    let dailyTemp = daily.temperature_2m_max;
    dailyTemp.forEach((temperature, i) => {
        if (dailytemperature[i]) {
            dailytemperature[i].innerText = temperature + "°C";
        }
    });
    // dailytemperature.forEach(t => {
    //     let unitD = document.createElement('div');
    //     unitD.classList.add("unitD");
    //     unitD.innerText = "°C";
    //     t.append(unitD);
    //     unitD.style.fontSize = "10px";
    // })
    console.log(dailyTemp);
    hourlyData()
}

async function hourlyData() {
    let response = await fetch(india);
    let data = await response.json();
    let hourly = data.hourly;
    let hourlyTemp = hourly.temperature_2m;
    let hourlyTime = hourly.time;
    updatedHourlyTime = hourlyTime.map(str => str.replaceAll('T', " "));
    // hourlyTime.slice(0, 24).forEach(t => {
    //     let time = document.createElement('div');
    //     time.classList.add('time');
    //     time.innerText = t;
    //     hourlytemperature.appendChild(time);
    // });
    hourlytemperature.forEach((temperature, i) => {
        const hourChunk = hourlyTemp.slice(i * 24, (i * 24) + 24);
        const timeChunk = updatedHourlyTime.slice(i * 24, (i * 24) + 24);
        hourChunk.forEach((item, j) => {
            let hour = document.createElement('div');
            hour.classList.add('hour');
            hour.innerText = item;
            temperature.append(hour);

            let time = document.createElement('div');
            time.classList.add('time-H');
            time.innerText = timeChunk[j];
            temperature.append(time);
        });
    });
    let hideTemp = document.querySelectorAll('.hour');
    hideTemp.forEach(i => {
        i.style.display = 'none';
    });
    let hideTime = document.querySelectorAll('.time-H');
    hideTime.forEach(i => {
        i.style.display = 'none';
    });
    hourlytemperature.forEach(i => {
        i.addEventListener('click', () => {
            hideTemp.forEach(j => {
                j.style.display = 'flex';
            });
        })
    })
}

async function weather_code() {
    let response = await fetch(india);
    let data = await response.json();
    let current = data.current;
    let weather = current.weather_code;
    console.log(weather);
    const weatherDescriptions = {
        0: "Clear",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Freezing fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Heavy drizzle",
        56: "Light freezing drizzle",
        57: "Heavy freezing drizzle",
        61: "Light rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Light snow",
        73: "Moderate snow",
        75: "Heavy snow",
        77: "Snow grains",
        80: "Light showers",
        81: "Moderate showers",
        82: "Heavy showers",
        85: "Light snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm with light hail",
        99: "Thunderstorm with heavy hail",
    };
    weatherCode.innerText = weatherDescriptions[weather] ?? "Unknown";
}
