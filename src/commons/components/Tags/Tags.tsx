import React from 'react';
import { useDispatch } from 'react-redux';
import { setActivePill } from '../../redux/reducers/feedReducer';
import Tag from '../Tag/Tag';
import styles from './Tags.module.css';

interface TagsProps {
  tagsList: string[];
}

export default function Tags(props: TagsProps) {
  const { tagsList } = props;
  const dispatch = useDispatch();

  return (
    <aside className={styles.column}>
      <div className={styles.sidebar}>
        <p className={styles.p}>Popular Tags</p>
        <ul>
          {tagsList.map((el) => (
            <Tag key={`tag-${el}`} name={el} onClick={() => dispatch(setActivePill(`#${el}`))} />
          ))}
        </ul>
      </div>
    </aside>
  );
}
