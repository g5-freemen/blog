import React from 'react';
import Tag from '../Tag/Tag';
import styles from './Tags.module.css';

interface TagsProps {
  tagsList: string[];
}

export default function Tags({ tagsList }: TagsProps) {
  return (
    <aside className={styles.column}>
      <ul className={styles.sidebar}>
        <p className={styles.p}>Popular Tags</p>
        {tagsList.map((el) => (
          <Tag key={`tag-${el}`} name={el} />
        ))}
      </ul>
    </aside>
  );
}
