import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div>
      <nav className={styles.navbar}>
        {/*<Link to="/">
          <Logo />
        </Link>
        <Search
          placeholder="Search a song of your choice"
          searchData={searchData}
        />*/}
        <Logo />
        <Search
          placeholder={"Search an Album of your choice"}
          //searchData={searchData}
        />
        <Button children={"Give Feedback"} />
      </nav>
    </div>
  );
}

export default Navbar;
