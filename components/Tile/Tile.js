import PropTypes from 'prop-types';
import styles from '../../styles/Home.module.css';

export default function Tile({ location, temp, href }) {
  return (
    <a href={href} className={styles.card}>
      <h2>{location} &rarr;</h2>
      <p>{temp}</p>
    </a>
  )
}

Tile.propTypes = {
  location: PropTypes.string.isRequired,
  temp: PropTypes.number,
  href: PropTypes.string
};

Tile.defaultProps = {
  location: null,
  temp: null,
  href: null
};