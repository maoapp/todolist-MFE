import { fireEvent, render } from '@testing-library/react';
import List from './';

describe('List component', () => {
  const tasks = [
    { id: '0', description: 'Task 1', completed: false },
    { id: '1', description: 'Task 2', completed: true },
  ];

  const toggleTodoMock = jest.fn();

  it('should render a Card for each task', () => {
    const { getByText, getByTestId } = render(<List data={tasks} toggleTodo={toggleTodoMock} />);

    tasks.forEach((task, index) => {
      const cardElement = getByTestId(`card-${index}`);
      const descriptionElement = getByText(task.description);
      expect(cardElement).toBeInTheDocument();
      expect(descriptionElement).toBeInTheDocument();
    });
  });

  it('should call toggleTodo when toggle button is clicked', () => {
    const { getByTestId } = render(<List data={tasks} toggleTodo={toggleTodoMock} />);

    tasks.forEach((task, index) => {
      const toggleButton = getByTestId(`toggle-${index}`);
      fireEvent.click(toggleButton);
      expect(toggleTodoMock).toHaveBeenCalledWith(task.id);
    });
  });
});
