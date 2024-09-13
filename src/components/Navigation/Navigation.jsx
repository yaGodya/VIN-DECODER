import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => (
    <nav className={styles.nav}>
        <ul className={styles.navList}>
            <li className={styles.navItem}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.navLink} ${styles.active}`
                            : styles.navLink
                    }
                >
                    Home
                </NavLink>
            </li>

            <li className={styles.navItem}>
                <NavLink
                    to="/variables"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.navLink} ${styles.active}`
                            : styles.navLink
                    }
                >
                    Variables
                </NavLink>
            </li>
        </ul>
    </nav>
);

export default Navigation;
