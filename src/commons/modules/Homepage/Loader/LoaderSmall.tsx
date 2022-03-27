import React from 'react';
import styled from 'styled-components';
import styles from './LoaderSmall.module.css';

export type LoaderType = {
  height?: number;
};

const padding = 10;

export const LoaderSmall: React.FC<LoaderType> = ({ height = 60 }) => (
  <div
    style={{
      width: '100%',
      height: `${height + padding * 2}px`,
      overflow: 'hidden',
    }}
  >
    <div
      className={styles.loader}
      style={{
        width: `${height}px`,
        height: `${height}px`,
        margin: `${padding}px auto`,
      }}
    ></div>
  </div>
);
