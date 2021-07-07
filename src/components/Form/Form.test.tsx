import { render } from '@testing-library/react';
import React from 'react';
import Form from './Form';

describe('Form', () => {
  it('should match snapshot', () => {
   
    const {container} = render(
         <Form open setOpen={() => {}} />
    );
    expect(container).toMatchSnapshot();
  });
  it('should render without error', () => {
    const {container} = render(
      <Form open setOpen={() => {}} />
    )
    expect(container).toBeInstanceOf(HTMLElement);
  });
  it('should render modal when open is true', () => {
    const { getByTestId } = render(
      <Form open setOpen={() => {}} />
    );
    expect(getByTestId('modal')).toBeTruthy();
  })
})
