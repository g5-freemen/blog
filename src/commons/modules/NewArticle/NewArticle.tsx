import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button/Button';
import { ErrorMsg } from '../../components/ErrorMsg/ErrorMsg';
import { Input } from '../../components/Input/Input';
import { TextArea } from '../../components/TextArea/TextArea';
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

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const cookieToken = cookies.get('token');
    const fetchData = await createArticle(formData, cookieToken);

    if (typeof fetchData === 'string') {
      toast('Article has been created!', {
        type: 'success',
        autoClose: 2500,
      });
      return navigate('/');
    }

    toast(fetchData, { type: 'warning' });
    return false;
  }

  const handleInput = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });

    const msg = validate(name, value, requiredFields);
    setErrors((prev: NewArticleType) => ({ ...prev, [name]: msg }));
  };

  return (
    <div className={styles.container}>
      <form noValidate className={styles.form} onSubmit={onSubmit}>
        <Input
          placeholder="Article Title"
          name="title"
          autoComplete="title"
          onChange={handleInput}
          value={formData.title || ''}
        />
        <ErrorMsg>{errors.title}</ErrorMsg>
        <Input
          small
          placeholder="What's this article about?"
          name="about"
          autoComplete="about"
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
          autoComplete="tags"
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
    </div>
  );
}
