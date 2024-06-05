import { render, fireEvent } from '@testing-library/react';

import Home from './';
import { useLocalStorage } from '../../hooks/useLocalStorage';

jest.mock('../../hooks/useLocalStorage');

describe('Home component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock calls before each test
  });

  it('should add a task', () => {
    const setTasksMock = jest.fn();
    (useLocalStorage as jest.Mock).mockReturnValue([[], setTasksMock]);

    const { getByTestId } = render(<Home />);
    const input = getByTestId('form-input') as HTMLInputElement;
    const form = getByTestId('form');

    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.submit(form);

    expect(setTasksMock).toHaveBeenCalledWith([
      { id: expect.any(String), description: 'Task 1', completed: false },
    ]);
  });

  it('should toggle a task', () => {
    const mockTasks = [
      { id: '1', description: 'Task 1', completed: false },
      { id: '2', description: 'Task 2', completed: true },
    ];
    const setTasksMock = jest.fn();
    (useLocalStorage as jest.Mock).mockReturnValue([mockTasks, setTasksMock]);

    const { getByTestId } = render(<Home />);
    const toggleButton = getByTestId('toggle-1');

    fireEvent.click(toggleButton);

    expect(setTasksMock).toHaveBeenCalledWith([
      { id: '1', description: 'Task 1', completed: false },
      { id: '2', description: 'Task 2', completed: false },
    ]);
  });
});
