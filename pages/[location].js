import PropTypes from 'prop-types';
import styles from '../styles/Home.module.css';

export default function LocationDetailPage({ location, tempCurrent, tempLow, tempHigh, weather, sunrise, sunset, humidity, visibility }) {
  return (
<div>
  <h1 className={styles.title}>{location}</h1>

    <div className={styles.wrapper}>

        <p className={`${styles.box} ${styles.description} ${styles.weather}`}>{weather}</p>
        <h2 className={`${styles.box} ${styles.title} ${styles.temp}`}>{tempCurrent}</h2>
        <p className={styles.box}>{tempLow}</p>
        <p className={styles.box}>{tempHigh}</p>

        <p className={`${styles.box} ${styles.sunrise}`}>{sunrise}</p>
        <p className={`${styles.box} ${styles.sunset}`}>{sunset}</p>
        <p className={`${styles.box} ${styles.humidity}`}>{humidity}</p>
        <p className={`${styles.box} ${styles.vis}`}>{visibility}</p>

    </div>

  </ div>
  )
}


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