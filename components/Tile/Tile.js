import PropTypes from 'prop-types';
import Link from "next/link"
import styles from '../../styles/Home.module.css';

export default function Tile({ location, href }) {
  return (
    <Link href={href} passHref>
      <a className={`${styles.card}`}>
        <h2>{location} &rarr;</h2>
      </a>
    </Link>
  )
}

Tile.propTypes = {
  location: PropTypes.string.isRequired,
  href: PropTypes.object
};

Tile.defaultProps = {
  location: null,
  href: null
};