import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from './';

describe('Card component', () => {
  const task = { id: '1', description: 'Task 1', completed: false };
  const toggleTodoMock = jest.fn();

  it('should render the task description and checkbox', () => {
    const { getByTestId } = render(<Card task={task} toggleTodo={toggleTodoMock} index={0} />);

    const cardElement = getByTestId('card-0');
    const checkbox = getByTestId('toggle-0');
    const description = cardElement.querySelector('span');

    expect(cardElement).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent('Task 1');
  });

  it('should toggle the task when checkbox is clicked', () => {
    const { getByTestId } = render(<Card task={task} toggleTodo={toggleTodoMock} index={0} />);

    const checkbox = getByTestId('toggle-0');
    fireEvent.click(checkbox);

    expect(toggleTodoMock).toHaveBeenCalledWith('1');
  });

  it('should apply line-through style for completed tasks', () => {
    const completedTask = { ...task, completed: true };
    const { getByTestId } = render(<Card task={completedTask} toggleTodo={toggleTodoMock} index={0} />);

    const description = getByTestId('card-0').querySelector('span');

    expect(description).toHaveStyle('text-decoration: line-through');
  });

  it('should not apply line-through style for incomplete tasks', () => {
    const { getByTestId } = render(<Card task={task} toggleTodo={toggleTodoMock} index={0} />);

    const description = getByTestId('card-0').querySelector('span');

    expect(description).not.toHaveStyle('text-decoration: line-through');
  });
});
