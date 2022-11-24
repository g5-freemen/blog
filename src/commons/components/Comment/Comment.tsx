import React from 'react';
import { CommentType } from '../../utils/httpServices/types';
import { Avatar } from '../Author/Author';
import styles from './Comment.module.css';

interface Props {
  data: CommentType;
}

export default function Comment(props: Props) {
  const { data } = props;

  return (
    <div className={styles.container}>
      <p className={styles.body}>{data.body}</p>
      <div className={styles.info}>
        <Avatar url={data.author.image} size="20px" />
        <span className={styles.author}>{data.author.username}</span>
        <span className={styles.date}>
          {new Date(data.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
}
