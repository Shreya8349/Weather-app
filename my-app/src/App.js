import bg from "./Background.jpg";
import  Descriptions from './components/Descriptions';
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./WeatherService";

function App() {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const[units, setUnits] = useState("metric");
  /*
  const MyComponent = () => {
    const[buttontext, setButtontext] = useState('F');
    const[units, setUnits] = useState("imperial");
  }*/

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);
    };
    
    fetchWeatherData();
  }, [units, city])

  

  const handleUnitsClick = (e) => {
    /*setButtontext((prevText) => (prevText === 'F'? 'C' : 'F'));
    setUnits((prevUnits) => (prevUnits === 'imperial'? 'metric': 'imperial'));*/

    /*const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "F" : "C";
    setUnits(isCelsius? "metric" : "imperial"); */

    setUnits((prevUnits) => (prevUnits === "metric" ? "imperial" : "metric"));
  }

  const enterKeyPressed = (e) => {
    if(e.keyCode === 13){
      setCity(e.currentTarget.value)
      e.currentTarget.blur();
    }
  }

  return (
    <div className="app" style={{backgroundImage : `url(${bg}) `}}>
      <div className="overlay">
        {
          weather && (
            <div className="container">
              <div className="section section__inputs">
                <input onKeyDown = {enterKeyPressed} type="text" name = "city" placeholder="Enter City ..." />
            
                <button onClick = {handleUnitsClick}> {units === "metric"? "F" : "C"}</button>
              </div>
          
              <div className="section section__temperature">
                <div className="icon">
                  <h3> {`${weather.name}, ${weather.country}`} </h3>
                  <img src= {weather.iconURL} alt="Weather icon"/>
                  <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1> {`${weather.temp.toFixed()} ${units === "metric"? "C" :"F"}`}</h1>
              </div>

            </div>

            {/*bottom description*/}
            <Descriptions weather = {weather} units = {units} />
        
          </div>
          )
        }
        
      </div>
    </div>
  );
}

export default App;

