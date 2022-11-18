import React from 'react';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import styles from './Spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles.wrapper}>
      <CgSpinnerTwoAlt />
    </div>
  );
}
