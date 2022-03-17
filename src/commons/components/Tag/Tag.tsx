import React from 'react';
import styles from './Tag.module.css';

interface TagProps {
  name: string;
}

export default function Tag({ name }: TagProps) {
  return <div className={styles.tag}>{name}</div>;
}
