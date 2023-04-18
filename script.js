const apikey = "61effed80b1da6b5707f803c7d52395e";

const weatherDatael = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
    
});

async function getWeatherData(cityValue){
    try{
        const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=Metric`)
        if(!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json();
        
        console.log(data);

        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description;
        const icon = data.weather[0].icon

        const details =[
            `Feels like: ${Math.round(data.main.feels_like) }°C`,
            `Humidity: ${data.main.humidity}%`,
            ` wind speed: ${data.wind.speed}m/s`,
        ]

        weatherDatael.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather Icon">`
        weatherDatael.querySelector(".temperature").textContent =`${temperature}°C`


        weatherDatael.querySelector(".description").textContent = description;

        weatherDatael.querySelector(".details").innerHTML = details.map(detail => `<div>${detail}</div>`).join("")


    }catch(error){
        weatherDatael.querySelector(".description").textContent = `An error occured Please try again later`;

    }
    
}


