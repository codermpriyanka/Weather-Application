const input_box=document.querySelector('.input-box')
const search_button=document.getElementById('search-button')
const weather_img=document.querySelector('.weather-img')
const temperature=document.querySelector('.temperature')
const description=document.querySelector('.description')
const humidity=document.getElementById('humidity')
const wind_speed=document.getElementById('wind-speed')
const location_not_found=document.querySelector('.location-not-found')
const weather_body=document.querySelector('.weather-body')

async function checkWeather(city){
    const API_KEY="26c4d806a1174dc3bcdaab1933b7e5ec"
    const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    const weather_Data=await fetch(URL)
    const json_weather_data=await weather_Data.json()
    console.log(json_weather_data)
    if(json_weather_data.cod==`404`){
        location_not_found.style.display="flex"
        weather_body.style.display="none"
        return;
    }
    location_not_found.style.display="none"
    weather_body.style.display="flex"
    temperature.innerHTML=`${Math.round(json_weather_data.main.temp-273.15)}°C`
    description.innerHTML=`${json_weather_data.weather[0].description}`
    humidity.innerHTML=`${json_weather_data.main.humidity}%`
    wind_speed.innerHTML=`${json_weather_data.wind.speed}kmph`
    switch(json_weather_data.weather[0].main){
        case 'Clear':
            weather_img.src="/IMAGES/clear.png"
        break;
        case 'Clouds':
            weather_img.src="/IMAGES/cloud.png"
        break;
        case 'Mist':
            weather_img.src="/IMAGES/mist.png"
        break;
        case 'Rain':
            weather_img.src="/IMAGES/rain.png"
        break;
        case 'Snow':
            weather_img.src="/IMAGES/snow.png"
        break;

    }
}

search_button.addEventListener('click',()=>{
    checkWeather(input_box.value)
})