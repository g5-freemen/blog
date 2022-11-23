import React from 'react';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import styles from './Spinner.module.css';

interface Props {
  size?: string | number;
}

export const Spinner = ({ size = undefined }: Props) => (
  <div className={styles.wrapper}>
    <CgSpinnerTwoAlt size={size} />
  </div>
);
