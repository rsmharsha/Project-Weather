let weatherForm = document.querySelector(".weatherForm");
let cityInput = document.querySelector(".cityInput");
let card = document.querySelector(".card");

let apiKey = "300a61d1be76d6cd7356477c2b6725ad"

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Please enter a city")
    }

})

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("could not fetch weather data")
    }

    return await response.json()
}


function displayWeatherInfo(data){
    const { name:city, 
        main:{temp, humidity},
        weather:[{description, id}],
        wind:{speed}} = data


    card.textContent ="";
    card.style.display="flex";

    // city and Temp

    const cityAndTemp = document.createElement("div")

    const cityDisplay = document.createElement("h1")
    const tempDisplay = document.createElement("p")

    cityAndTemp.classList.add("cityAndTemp")
    cityAndTemp.appendChild(cityDisplay)
    cityAndTemp.appendChild(tempDisplay)


    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp}°C`;

    cityAndTemp.classList.add("cityAndTemp")    
    cityDisplay.classList.add("cityDisplay")
    tempDisplay.classList.add("tempDisplay")

    // Description

    const desc = document.createElement("div")

    const descDisplay = document.createElement("p")

    desc.classList.add("desc")
    desc.appendChild(descDisplay)

    descDisplay.textContent = description;

    desc.classList.add("desc")
    descDisplay.classList.add("descDisplay")

    // Weather Image

    const imgContainer = document.createElement("div")

    imgContainer.innerHTML = getWeatherImg(id);

    imgContainer.classList.add("img-container")



    // Humidity and wind Speed

    const humidityAndWind = document.createElement("div")

    const humidityDisplay = document.createElement("p")
    const windSpeedDisplay = document.createElement("p")

    humidityAndWind.appendChild(humidityDisplay)
    humidityAndWind.appendChild(windSpeedDisplay)

    humidityAndWind.classList.add("humidityAndWind");
    humidityDisplay.classList.add("humidityDisplay");
    windSpeedDisplay.classList.add("windSpeedDisplay");


    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    windSpeedDisplay.textContent = `Wind Speed: ${speed}m/s`;


    card.appendChild(cityAndTemp);
    card.appendChild(desc);
    card.appendChild(imgContainer);
    card.appendChild(humidityAndWind);



}


function getWeatherImg(weatherId){
    if(weatherId >=200 && weatherId < 300){
        let img = `<img src="assets/thunderStorm.svg" alt="Weather Image">`;
        return img;
    }else if(weatherId >=300 && weatherId < 400){
        let img = `<img src="assets/rain.svg" alt="Weather Image">`
        return img;
    }else if(weatherId >=500 && weatherId < 600){
        let img = `<img src="assets/rain-2.svg" alt="Weather Image">`
        return img
    }else if(weatherId >=600 && weatherId < 700){
        let img = `<img src="assets/snow.svg" alt="Weather Image">`
        return img
    }else if((weatherId >=700 && weatherId < 800)){
        let img = `<img src="assets/Fog.svg" alt="Weather Image">`
        return img
    }else if(weatherId === 800){
        let img = `<img src="assets/sunny.svg" alt="Weather Image">`
        return img
    }else if(weatherId >=801 && weatherId < 810){
        let img = `<img src="assets/clouds.svg" alt="Weather Image">`
        return img
    }else{
        let img = `<img src="assets/Asset1.svg" alt="Weather Image">`
        return img
    }
}


function displayError(message){
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay")

    card.textContent="";
    card.style.display ="flex";
    card.appendChild(errorDisplay);
}