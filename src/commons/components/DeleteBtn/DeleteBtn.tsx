import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { TbBasketOff } from 'react-icons/tb';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { errorsToasts } from '../../utils/errorsToasts';
import { deleteArticle } from '../../utils/httpServices/feedServices';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import styles from './DeleteBtn.module.css';

interface Props {
  small?: boolean;
  slug?: string;
}

export default function DeleteBtn(props: Props) {
  const { slug: articleSlug, small } = props;
  const navigate = useNavigate();
  const { slug } = useParams();
  const cookies = new Cookies();
  const token: string = cookies.get('token');
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const onClick = async () => {
    const mySlug = slug || articleSlug;
    if (mySlug) {
      setIsDeleting(true);
      const { response, data } = await deleteArticle(mySlug, token);
      setIsDeleting(false);
      if (response && !response.ok) {
        errorsToasts(data);
        return false;
      }
      setTimeout(() => queryClient.invalidateQueries(), 100);
      return navigate('/');
    }
    return false;
  };

  return (
    <Button
      small
      type="button"
      className={styles.btn}
      onClick={onClick}
      onKeyDown={onClick}
      disabled={isDeleting}
    >
      {isDeleting ? (
        <Spinner />
      ) : (
        <>
          <TbBasketOff />
          {!small && ' Delete Article'}
        </>
      )}
    </Button>
  );
}
