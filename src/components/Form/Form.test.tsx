import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from './';

describe('Form component', () => {
  it('should render the form', () => {
    const { getByTestId } = render(<Form addTodo={jest.fn()} />);
    const formElement = getByTestId('form');
    const inputElement = getByTestId('form-input');
    const buttonElement = formElement.querySelector('button');

    expect(formElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should update the input value when typed into', () => {
    const { getByTestId } = render(<Form addTodo={jest.fn()} />);
    const inputElement = getByTestId('form-input') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'New task' } });
    expect(inputElement.value).toBe('New task');
  });

  it('should call addTodo with the input value when form is submitted', () => {
    const addTodoMock = jest.fn();
    const { getByTestId } = render(<Form addTodo={addTodoMock} />);
    const inputElement = getByTestId('form-input') as HTMLInputElement;
    const formElement = getByTestId('form');

    fireEvent.change(inputElement, { target: { value: 'New task' } });
    fireEvent.submit(formElement);

    expect(addTodoMock).toHaveBeenCalledWith('New task');
    expect(inputElement.value).toBe(''); // Check if input is cleared
  });

  it('should not call addTodo if input is empty', () => {
    const addTodoMock = jest.fn();
    const { getByTestId } = render(<Form addTodo={addTodoMock} />);
    const formElement = getByTestId('form');

    fireEvent.submit(formElement);

    expect(addTodoMock).not.toHaveBeenCalled();
  });
});
