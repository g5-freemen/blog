import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { TbTrashOff } from 'react-icons/tb';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUser } from '../../redux/reducers/userReducer';
import { deleteComment } from '../../utils/httpServices/feedServices';
import { CommentType } from '../../utils/httpServices/types';
import { Avatar } from '../Author/Author';
import { Spinner } from '../Spinner/Spinner';
import styles from './Comment.module.css';

interface Props {
  data: CommentType;
}

export default function Comment(props: Props) {
  const { data } = props;
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const cookies = new Cookies();
  const token: string = cookies.get('token');
  const user = useSelector(selectUser);
  const [isDeleting, setIsDeleting] = useState(false);

  const onRemove = async () => {
    setIsDeleting(true);
    if (slug && data) {
      await deleteComment(slug, data.id, token);
      queryClient.invalidateQueries(`getComments-${slug}`);
    }
    setIsDeleting(false);
  };

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
        {user?.username === data?.author?.username && (
          <button
            type="button"
            onClick={onRemove}
            onKeyDown={onRemove}
            disabled={isDeleting}
            className={styles.deleteBtn}
          >
            {isDeleting ? <Spinner /> : <TbTrashOff size="24px" />}
          </button>
        )}
      </div>
    </div>
  );
}
