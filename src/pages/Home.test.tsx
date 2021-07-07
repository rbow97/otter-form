import { render } from '@testing-library/react';
import React from 'react';
import Home from './Home';

describe('Home', () => {
  it('should match snapshot', () => {
    const {container} = render(
      <Home />
    );
    expect(container).toMatchSnapshot();
  });
  it('should render without error', () => {
      const renderedText = 'Copywrite 2020 Otter Limited'
    const {container} = render(
      <Home/>
    )
    expect(container).toBeInstanceOf(HTMLElement);
    expect(renderedText).toBeTruthy();
  });
})
