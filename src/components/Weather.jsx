import React, { useEffect, useState } from "react";
import { getWeatherData } from "../modules/weather";
import { useTranslation } from 'react-i18next'

const Weather = () => {
  let [weatherError, setWeatherError] = useState("")
  let [gotWeather, setGotWeather] = useState(false)
  let [coords, setCoords] = useState([59.334591, 18.063240])
  let [temp, setTemp] = useState("")
  let [place, setPlace] = useState("")
  let [description, setDescription] = useState("")
  let [country, setCountry] = useState("")
  let [sunrise, setSunrise] = useState("")
  let [sunset, setSunset] = useState("")
  let [feelsLike, setFeelsLike] = useState("")
  const { t } = useTranslation('common')

  const loadWeatherData = async () => {
    let weatherData = await getWeatherData(coords);
    if (!weatherData.isAxiosError) {
      setPlace(weatherData.name)
      setTemp(parseFloat(weatherData.main.temp - 273.15).toFixed(1))
      setDescription(weatherData.weather[0].description)
      setGotWeather(true)
      setCountry(weatherData.sys.country)
      setFeelsLike(weatherData.main.feels_like)
      convertSunrise(weatherData.sys.sunrise)
      convertSunset(weatherData.sys.sunset)
    } else {
      setWeatherError("Loading...")
    }
  }

  const convertSunrise = (time) => {
    let utcSeconds = time;
    let sunrise = new Date(0);
    sunrise.setUTCSeconds(utcSeconds);
    setSunrise(`${sunrise}`)
  }

  const convertSunset = time => {
    let utcSeconds = time;
    let sunset = new Date(0);
    sunset.setUTCSeconds(utcSeconds);
    setSunset(`${sunset}`)
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setCoords([loc.coords.latitude, loc.coords.longitude])
    })
  }

  useEffect(() => {
    getLocation()
  }, []);

  useEffect(() => {
    loadWeatherData()
  }, [coords]);

  const weatherDisplay = () => {
    let array = description.split(' ')
    switch (true) {
      case array.includes("clear"): {
        return (
          <div className="icon sunny">
            <div className="sun">
              <div className="rays"></div>
            </div>
          </div>
        )
      }
      case array.includes("rain"): {
        return (
          <div className="icon rainy">
            <div className="cloud"></div>
            <div className="rain"></div>
          </div>
        )
      }
      default: {
        return (
          <div className="icon cloudy">
            <div className="cloud"></div>
            <div className="cloud"></div>
          </div>
        )
      }
    }
  }
  
  return (
      <>
        <div className="weather-main">
          {gotWeather ? (
            <>
              <h2>{t("weather.header")} {place}, {country}</h2>
              {weatherDisplay()}
              <p id="temp">{temp}&#8451;</p>
              <p>
                {description}
                <br/>
                <span style={{fontWeight: "900"}}>{t("weather.feelsLike")}:</span> {(feelsLike-273.15).toFixed(1)}&#8451;
                <br/>
                <span style={{fontWeight: "900"}}>{t("weather.sunrise")}:</span> {sunrise.substring(0, sunrise.lastIndexOf("G"))}
                <br/>
                <span style={{fontWeight: "900"}}>{t("weather.sunset")}:</span> {sunset.substring(0, sunset.lastIndexOf("G"))}
              </p>
            </>
          ) : (
            <p>Weather not available.</p>
          )}
        </div>
      </>
  );
};

export default Weather;