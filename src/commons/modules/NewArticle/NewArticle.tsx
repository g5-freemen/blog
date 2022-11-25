import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button/Button';
import { ErrorMsg } from '../../components/ErrorMsg/ErrorMsg';
import { Input } from '../../components/Input/Input';
import { TextArea } from '../../components/TextArea/TextArea';
import { TOAST_TIMEOUT } from '../../utils/constants';
import { createOrUpdateArticle, fetchArticle } from '../../utils/httpServices/feedServices';
import { ArticleType } from '../../utils/httpServices/types';
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
  const { slug } = useParams();
  const cookies = new Cookies();
  const token: string = cookies.get('token');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(defaultFormValues);
  const [errors, setErrors] = useState(defaultErrors);
  const [article, setArticle] = useState<ArticleType>();

  const getArticleBySlug = async () => {
    const res = await fetchArticle(slug, token);
    if (typeof res !== 'string' && res?.title) {
      const obj = {
        title: res.title,
        about: res.description,
        content: res.body,
        tags: res.tagList.join(' '),
      };
      setFormData(obj);
      setErrors(defaultErrors);
      setArticle(res);
    }

    if (slug && typeof res === 'string') {
      return navigate('/');
    }

    return res;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const cookieToken: string = cookies.get('token');

    const fetchData = await createOrUpdateArticle(formData, cookieToken, article);

    if (typeof fetchData !== 'string') {
      queryClient.invalidateQueries();
      toast(`Article has been ${slug ? 'updated' : 'created'}!`, {
        type: 'success',
        autoClose: TOAST_TIMEOUT,
      });
      return navigate('/');
    }

    toast(fetchData, { type: 'warning', autoClose: TOAST_TIMEOUT });
    return false;
  };

  const handleInput = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });

    const msg = validate(name, value, requiredFields);
    setErrors((prev: NewArticleType) => ({ ...prev, [name]: msg }));
  };

  useEffect(() => {
    if (slug) getArticleBySlug();
  }, [slug]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{slug ? 'Edit Article' : 'Create New Article'}</h1>
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
            disabled={isAnyError(Object.values(errors)) || !isAllFilled(formData)}
          >
            {`${slug ? 'Update' : 'Publish'} Article`}
          </Button>
        </div>
      </form>
    </main>
  );
}
