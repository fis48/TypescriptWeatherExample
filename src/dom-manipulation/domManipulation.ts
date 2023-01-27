import { DayOfWeek, Main, Weather, WeatherIcon, WeatherIcontype, WeatherResponse } from "../model/weatherResponse";


// TODO: Create references for all the html elements
export const buttonClick = document.getElementById("button-location");
const WeatherIconPng = document.getElementById("weather-icon");
export const cityField = document.getElementById("weather-location-input");
export const dayNameElement = document.getElementById("date-dayname");
export const iconElement = document.getElementById("weather-icon");
export const tempElement = document.getElementById("weather-temp");
export const locationElement = document.getElementById("location-text");
export const descriptionElement = document.getElementById("weather-desc");
export const tempMaxElement = document.getElementById("text-temp-max");
export const tempMinElement = document.getElementById("text-temp-min");
export const humidityElement = document.getElementById("text-humidity");
export const windElement = document.getElementById("text-wind");


// TODO: Create the logic of the function
export const updateInteface = (weather: WeatherResponse) :void => {
    const dateStr = getDate();
    const day = getDayOfWeek();
    if (dayNameElement) {
        dayNameElement.innerHTML = day;
    }
    // icon
    const data = {...weather};
    if (tempElement && locationElement && descriptionElement && 
        humidityElement && windElement && tempMaxElement && tempMinElement) {
        tempElement.innerHTML = data.main.temp;
        locationElement.innerHTML = data.name;
        const {description} = data.weather[0];
        descriptionElement.innerHTML = description;
        tempMaxElement.innerHTML = `${data.main.temp_max} ${tempMaxElement.innerHTML}`;
        tempMinElement.innerHTML = `${data.main.temp_min} ${tempMinElement.innerHTML}`;
        humidityElement.innerHTML = `${data.main.humidity} ${humidityElement.innerHTML}`;
        const windStr = `${data.wind.speed} ${windElement.innerHTML}`;
        windElement.innerHTML = windStr;
    }

    console.log(data.weather[0].icon);
    console.log(WeatherIcon["04n"]);

    changeWeatherIcon(data.weather[0].icon);

}

// TODO: Get the city from the input element
export function getCity(): string {
    const {value} = <HTMLInputElement>cityField;
    return value;
}

function getDayOfWeek(): string {
    let day = new Date();
    return DayOfWeek[day.getDay()];
}

function getDate(): string {
    let date = new Date();
    return date.toLocaleDateString("es-ES");
}

function changeWeatherIcon(weatherImageRef: string) {
    const weatherMap = [weatherImageRef];
    validateImage(weatherMap);
    const mappedWeather = weatherMap.map(weather => WeatherIcon[weather])[0] ?? WeatherIcon["01d"];
    if(typeof mappedWeather[0] === "string") {
        if (WeatherIconPng) (WeatherIconPng as HTMLImageElement).src = mappedWeather;
    }
}

function validateImage(values: string[]): asserts values is WeatherIcontype[] {
    if (!values.every(isValidImage)) {
        throw Error('invalid image');    
    }
}

function isValidImage(value: string): value is WeatherIcontype {
    return value in WeatherIcon;
}