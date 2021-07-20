import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Home.module.css';

export default function LocationDetailPage({ providedLocation }) {
  const [weatherData, setWeatherData] = useState({
    description: '',
    tempCurrent: '',
    tempLow: '',
    tempHigh: '',
    sunrise: '',
    sunset: '',
    humidity: '',
    visibility: ''
  });
  const [location, setLocation] = useState(providedLocation || 'london');

  const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY;
  const searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  useEffect(() => {
    fetch(searchUrl).then(res => res.json()).then(data => {
      
      const { weather, main, sys, visibility } = data;

      const convertMToKm = meter => (meter/1000).toFixed(1);
      const convertTimestamp = timestamp => {
        const date = new Date(timestamp * 1000);
        const slicedTimeStamp = date.toISOString().slice(-13, -5);
        return slicedTimeStamp;
      };
      const roundTemp = temp => temp.toFixed(1);

      setWeatherData({
        description: weather[0].main,
        tempCurrent: roundTemp(main.temp),
        tempLow: roundTemp(main.temp_min),
        tempHigh: roundTemp(main.temp_max),
        sunrise: convertTimestamp(sys.sunrise),
        sunset: convertTimestamp(sys.sunset),
        humidity: main.humidity,
        visibility: convertMToKm(visibility)
      });

    })
  }, [searchUrl]);

  const { description, tempCurrent, tempLow, tempHigh, sunrise, sunset, humidity, visibility } = weatherData;

  return (
    <div>
      <h1 className={styles.title}>{location}</h1>

      <div className={styles.wrapper}>

          <p className={`${styles.box} ${styles.description} ${styles.weather}`}>{description}</p>
          <h2 className={`${styles.box} ${styles.title} ${styles.temp}`}>{tempCurrent}&deg;C</h2>
          <p className={styles.box}>{tempLow}&deg;C</p>
          <p className={styles.box}>{tempHigh}&deg;C</p>

          <p className={`${styles.box} ${styles.sunrise}`}>{sunrise}</p>
          <p className={`${styles.box} ${styles.sunset}`}>{sunset}</p>
          <p className={`${styles.box} ${styles.humidity}`}>{humidity}%</p>
          <p className={`${styles.box} ${styles.vis}`}>{visibility} km</p>

      </div>

    </ div>
  )
};


LocationDetailPage.propTypes = {
  location: PropTypes.string.isRequired,
  weather: PropTypes.string,
  tempCurrent: PropTypes.number,
  tempLow: PropTypes.number,
  tempHigh: PropTypes.number,
  sunrise: PropTypes.string,
  sunset: PropTypes.string,
  humidity: PropTypes.string,
  visibility: PropTypes.string
};

LocationDetailPage.defaultProps = {
  location: "Los Angeles",
  weather: "Sunny",
  tempCurrent: 27,
  tempLow: 16,
  tempHigh: 32,
  sunrise: "5:07",
  sunset: "19:23",
  humidity: "15%",
  visibility: "16.2 km"
};