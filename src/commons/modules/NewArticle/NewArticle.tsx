import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button/Button';
import { ErrorMsg } from '../../components/ErrorMsg/ErrorMsg';
import { Input } from '../../components/Input/Input';
import { TextArea } from '../../components/TextArea/TextArea';
import { TOAST_TIMEOUT } from '../../utils/constants';
import { createArticle } from '../../utils/httpServices/feedServices';
import { isAllFilled, isAnyError, validate } from '../../utils/validations';
import styles from './NewArticle.module.css';

export type NewArticleType = {
  title: string;
  about: string;
  content: string;
  tags: string;
};

const defaultFormValues: NewArticleType = {
  title: '',
  about: '',
  content: '',
  tags: '',
};
const defaultErrors = { ...defaultFormValues };

const requiredFields = ['title', 'about', 'content', 'tags'];

export default function NewArticle() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(defaultFormValues);
  const [errors, setErrors] = useState(defaultErrors);

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const cookieToken: string = cookies.get('token');
    const fetchData = await createArticle(formData, cookieToken);

    if (typeof fetchData !== 'string') {
      toast('Article has been created!', {
        type: 'success',
        autoClose: TOAST_TIMEOUT,
      });
      return navigate('/');
    }

    toast(fetchData, { type: 'warning', autoClose: TOAST_TIMEOUT });
    return false;
  };

  const handleInput = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });

    const msg = validate(name, value, requiredFields);
    setErrors((prev: NewArticleType) => ({ ...prev, [name]: msg }));
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Create New Article</h1>
      <form noValidate className={styles.form} onSubmit={onSubmit}>
        <Input
          placeholder="Article Title"
          name="title"
          onChange={handleInput}
          value={formData.title || ''}
        />
        <ErrorMsg>{errors.title}</ErrorMsg>
        <Input
          small
          placeholder="What's this article about?"
          name="about"
          onChange={handleInput}
          value={formData.about}
        />
        <ErrorMsg>{errors.about}</ErrorMsg>
        <TextArea
          small
          rows={8}
          placeholder="Write your article (in markdown)"
          name="content"
          onChange={handleInput}
          value={formData.content}
        />
        <ErrorMsg>{errors.content}</ErrorMsg>
        <Input
          small
          placeholder="Enter tags"
          name="tags"
          onChange={handleInput}
          value={formData.tags}
        />
        <ErrorMsg>{errors.tags}</ErrorMsg>
        <div className={styles.row}>
          <Button
            type="submit"
            disabled={
              isAnyError(Object.values(errors)) || !isAllFilled(formData)
            }
          >
            Publish Article
          </Button>
        </div>
      </form>
    </main>
  );
}
