const apikey = "c6c58888111fed53bbfe72175fb3ebc0";


const formEl = document.querySelector("form");
const cityInputEl = document.getElementById("city-input");
const weatherDataEl =document.getElementById("weather-data");


formEl.addEventListener("submit", (event)=>{

    event.preventDefault();
    const CityValue = cityInputEl.value ;
    weatherApp(CityValue);


});



async function weatherApp(CityValue){

    try {
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CityValue}&appid=${apikey}&units=metric`);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        const Data = await response.json();
        const icon = Data.weather[0].icon ;
        const temperature = Math.round(Data.main.temp);
        const description = Data.weather[0].description ;

        const details = [
            `Country: ${Data.sys.country}`,
            `Feels Like: ${Data.main.feels_like}°C`,
            `Humidity: ${Data.main.humidity}%`,
            `Wind Speed: ${Data.wind.speed} m/s`
        ];


        weatherDataEl.querySelector(".icon").innerHTML = `<div class="icon"><img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon"></div> `;
        weatherDataEl.querySelector(".temperature").textContent= `${temperature}°C`;
        weatherDataEl.querySelector(".description").textContent= description;
        weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=> `<div>${detail}</div>` ).join("");





    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "" ;
        weatherDataEl.querySelector(".description").textContent = "An error happened please try again";
        weatherDataEl.querySelector(".details").innerHTML = "";
    }

}
