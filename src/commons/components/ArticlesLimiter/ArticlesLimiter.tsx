import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectLimit, setLimit } from '../../redux/reducers/globalReducer';

const Select = styled.select`
  margin: 0 0 8px auto;
  color: #55595c;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.3rem;
  outline: none;

  &:hover {
    border-radius: 0.3rem 0.3rem 0 0;
  }
`;

interface ArticlesLimiterProps {
  limits: number[];
  defaultValue: number;
}

export default function ArticlesLimiter(props: ArticlesLimiterProps) {
  const { limits, defaultValue } = props;
  const dispatch = useDispatch();
  const limit: number = useSelector(selectLimit);

  useEffect(() => {
    dispatch(setLimit(defaultValue));
  }, []);

  return (
    <Select
      aria-label="articles limit"
      onChange={(ev) => dispatch(setLimit(+ev.target.value))}
      value={limit}
    >
      {limits.map((el) => (
        <option key={`limit-${el}`}>{el}</option>
      ))}
    </Select>
  );
}
