import React from "react";
import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <a className={styles.brand} href="#/">
          conduit
        </a>

        <ul className={styles.nav}>
          <li className={styles.navitem}>
            <a className={styles.link} href="#/">
              Home
            </a>
          </li>

          <li className={styles.navitem}>
            <a className={styles.link} href="#/login">
              Sign in
            </a>
          </li>

          <li className={styles.navitem}>
            <a className={styles.link} href="#/register">
              Sign up
            </a>
          </li>
        </ul>

        {/* <ul show-authed="true" class="nav navbar-nav pull-xs-right" style="display: none;">

      <li class="nav-item">
        <a class="nav-link active" ui-sref-active="active" ui-sref="app.home" href="#/">
          Home
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" ui-sref-active="active" ui-sref="app.editor" href="#/editor/">
          <i class="ion-compose"></i>&nbsp;New Article
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" ui-sref-active="active" ui-sref="app.settings" href="#/settings">
          <i class="ion-gear-a"></i>&nbsp;Settings
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link ng-binding" ui-sref-active="active" ui-sref="app.profile.main({ username: $ctrl.currentUser.username })" href="#/@">
          <img class="user-pic"/>
          
        </a>
      </li>

    </ul> */}
      </div>
    </div>
  );
};
