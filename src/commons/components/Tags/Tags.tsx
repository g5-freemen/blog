import React from 'react';
import Tag from '../Tag/Tag';
import styles from './Tags.module.css';

import { testTags } from './mocks';

interface TagsProps {
  tagsList?: string[];
}

export default function Tags({ tagsList = testTags }: TagsProps) {
  return (
    <aside className={styles.column}>
      <ul className={styles.sidebar}>
        <p>Popular Tags</p>
        {tagsList.map((el) => (
          <Tag name={el} />
        ))}
      </ul>
    </aside>
  );
}
