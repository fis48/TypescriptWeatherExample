
// Style import
import './styles/main.scss';

// Import the API request method
import { buttonClick, getCity, updateInteface } from './dom-manipulation/domManipulation';

// Add an event listener to the button
buttonClick?.addEventListener("click", async () => {
  try {
    const city = getCity();
    const data = await getData(city);
    updateInteface(data);
  } catch (error) {
    console.log("Error getting data:", error);
  }
});




// Create an async function to call the API method
const getData = async (city:string) => {
  const appid = "148b55dd87b90ab8d62698565f34ce98";
  const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`);
  const data = await resp.json();
  return data;
}