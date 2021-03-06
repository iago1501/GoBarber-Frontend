import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import 'jest-styled-components';
import Input from '../../components/Input';

// passando ícone, não passando ícone
// passando erro e vendo se ele mostra o alerta

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render highlight on input focus or blur', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);
    await waitFor(() => {
      expect(containerElement).toHaveStyleRule('border-color: #ff9000');
      expect(containerElement).toHaveStyleRule('color: #ff9000');
    });

    fireEvent.blur(inputElement);
    await waitFor(() => {
      expect(containerElement).not.toHaveStyleRule('border-color: #ff9000');
      expect(containerElement).not.toHaveStyleRule('color: #ff9000');
    });
  });

  it('should keep input border highlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com' },
    });

    fireEvent.blur(inputElement);
    await waitFor(() => {
      expect(containerElement).toHaveStyleRule('color: #ff9000');
    });
  });
});
