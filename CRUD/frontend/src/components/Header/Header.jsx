import { Link } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
        <div className={classes.menu}>
            <Link to="/">Cars</Link>
            <Link to="/create">Create Car</Link>
        </div>
    </header>
  );
};

export default Header;
