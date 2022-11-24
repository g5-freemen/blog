import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { TbBasketOff } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteArticle } from '../../utils/httpServices/feedServices';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import styles from './DeleteBtn.module.css';

export default function DeleteBtn() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const cookies = new Cookies();
  const token: string = cookies.get('token');
  const [isDeleting, setIsDeleting] = useState(false);

  const onClick = async () => {
    if (slug) {
      setIsDeleting(true);
      await deleteArticle(slug, token);
      setIsDeleting(false);
      navigate('/');
    }
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
          {' Delete Article'}
        </>
      )}
    </Button>
  );
}
