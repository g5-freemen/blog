import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUser } from '../../redux/reducers/userReducer';
import { postComment } from '../../utils/httpServices/feedServices';
import { Avatar } from '../Author/Author';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import { TextArea } from '../TextArea/TextArea';
import styles from './CommentEditor.module.css';

export default function CommentEditor() {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const cookies = new Cookies();
  const token: string = cookies.get('token');
  const user = useSelector(selectUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState('');

  const onSubmit = async () => {
    setIsSubmitting(true);
    if (slug && token && comment) {
      await postComment(slug, token, comment);
      queryClient.invalidateQueries(`getComments-${slug}`);
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <p className={styles.body}>
        <TextArea
          style={{ minHeight: '4rem' }}
          rows={3}
          placeholder="Write a comment..."
          onChange={(e) => setComment(e.target.value || '')}
          value={comment}
        />
      </p>
      <div className={styles.info}>
        <div className={styles.userInfo}>
          <Avatar url={user.image} />
          <span className={styles.author}>{user.username}</span>
        </div>
        <Button
          className={styles.postBtn}
          type="button"
          onClick={onSubmit}
          onKeyDown={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : 'Post Comment'}
        </Button>
      </div>
    </div>
  );
}
