import React from "react";
import styles from "./Banner.module.css";

export const Banner: React.FC = () => (
  <div className={styles.banner}>
    <div className={styles.container}>
      <h1 className={styles.title}>conduit</h1>
      <p className={styles.content}>A place to share your knowledge.</p>
    </div>
  </div>
);
