/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import Banner from './Banner';

describe('Banner component', () => {
  beforeEach(() => {
    render(<Banner />);
  });

  test('render h1 conduit', () => {
    const h1tag = screen.getByText(/conduit/i);
    expect(h1tag).toBeInTheDocument();
  });

  test('Banner contains title and text', () => {
    const banner = screen.getByRole('banner');
    expect(banner).toHaveTextContent(/conduit/i);
    expect(banner).toHaveTextContent('A place to share your knowledge');
  });

  test('Banner is match with snapshot', () => {
    const banner = screen.getByRole('banner');
    expect(banner).toMatchSnapshot();
  });
});
