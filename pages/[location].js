import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function LocationDetailPage() {
  //Get location information from router to initiate API request.
  const router = useRouter();
  const { location } = router.query;

  //Convert url slug into page title and appropriate query string ("new-york" becomes "New York").
  const capitalizedLocation = location.split('-').map( w =>  w.substring(0,1).toUpperCase()+ w.substring(1)).join(' ');

  const [locationName, setLocationName] = useState(capitalizedLocation); 
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
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY;
  const searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=metric&appid=${apiKey}`;

  useEffect(() => {
    fetch(searchUrl).then(res => res.json()).then(data => {

      const { weather, main, sys, visibility } = data;

      //Format some of the data received to be more readable for user
      const convertMToKm = meter => (meter/1000).toFixed(1);
      const parseTimestamp = timestamp => {
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
        sunrise: parseTimestamp(sys.sunrise),
        sunset: parseTimestamp(sys.sunset),
        humidity: main.humidity,
        visibility: convertMToKm(visibility)
      });
      setIsLoaded(true);

    }).catch(err => {
      setIsLoaded(true);
      setShowErrorMessage(true);
    })
  }, [searchUrl]);

  const { description, tempCurrent, tempLow, tempHigh, sunrise, sunset, humidity, visibility } = weatherData;

  return (
    !isLoaded ? (
      <div>
        <h1 className={styles.title}>Loading...</h1>
      </div>
    ) : (
      showErrorMessage ? 
        (<h1 className={styles.error}>
          There was an error with your request. <br />
          <Link href='/'>Click here to return to the start page</Link>.
          </h1>
        )
        : (
        <div>
          <h1 className={styles.title}>{locationName}</h1>

          <div className={styles.wrapper}>
            <div className={styles.halfContainer}>
              <p className={`${styles.box}`}>{description}</p>
              <h2 className={`${styles.box} ${styles.title} ${styles.temp}`}>{tempCurrent}&deg;C</h2>
              <div className={styles.temp}>
                <p className={styles.box}>Low: {tempLow}&deg;C</p>
                <p className={styles.box}>High: {tempHigh}&deg;C</p>
              </div>
              
            </div>
            <div className={styles.halfContainer}>
              <div className={styles.temp}>
                <p className={`${styles.box}`}>Sunrise: {sunrise}</p>
                <p className={`${styles.box}`}>Sunset: {sunset}</p>
              </div>
              <div className={styles.temp}>
                <p className={`${styles.box}`}>Humidity: {humidity}%</p>
                <p className={`${styles.box}`}>Visibility: {visibility} km</p>
              </div>
            </div>
          </div>

        </ div>
      )
    )
  )
};