import React from 'react';
import classes from './Header.module.scss';
const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}> Paper Scissor Rock</div>
    </header>
  );
};
export default Header;
