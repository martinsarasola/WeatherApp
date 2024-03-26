/*const key = "1173d6d22dd361c0076879003f04fa4d"*/
const api_url = "https://api.open-meteo.com/v1/forecast?latitude=-29.411&longitude=-66.8507&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&timezone=auto"

const inputBox = document.querySelector(".input");
const inputButton = document.querySelector(".button");
const weather = document.querySelector(".weather");
const card = document.querySelector(".card");

async function checkWeather(city) {
    const response2 = await fetch(`https://geocode.maps.co/search?q=${city}&api_key=65fe321fcf245956610051tlb1e30c8`);


    var data2 = await response2.json();

    console.log(data2);

    const name = document.querySelector(".name");
    const icon = document.querySelector(".wicon");
    const degree = document.querySelector(".degree");
    const humidity = document.querySelector(".precipitation");
    const wind = document.querySelector(".wind"); 
    const lat = data2[0].lat;
    const lon = data2[0].lon;

    console.log(lat);
    console.log(lon);

    const response3 = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=76b4d10a5ef147018f27dbadc496d8b4`);

    var data3 = await response3.json();
    console.log(data3);

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=auto`);

    var data = await response.json();

    console.log(data);

    const weatherCode = data.current.weather_code;

    console.log(weatherCode);

    name.innerHTML = data3.features[0].properties.state + ", " + data3.features[0].properties.country;
    degree.innerHTML = Math.round(data.current.temperature_2m) + "°C";
    humidity.innerHTML = "Precipitación" + "<br>" + Math.floor(data.current.precipitation) + "%";
    wind.innerHTML = "Viento" + "<br>" + Math.floor(data.current.wind_speed_10m) + " Km/h";
    
    switch (weatherCode) {
        case 0:
            icon.src = "./images/sun.png";
            break;
        case 1:
        case 2:
        case 3:
            icon.src = "./images/suncloud.png";
            break;
        case 45:
        case 48:
        case 51:
            icon.src = "./images/cloud.png"
            break;
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
            icon.src = "./images/rain.png";
            break;
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            icon.src ="./images/snowcloud.png";
            break;
        case 95:
        case 96:
        case 99:
            icon.src ="./images/lightrain.png"
            break;
    };

    card.style.height = null;
    card.style.maxHeight = '90vh';
}

card.style.maxHeight = '5vh';

inputButton.addEventListener('click', () => {
    checkWeather(inputBox.value);
})