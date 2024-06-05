import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import List from '../../components/List';
import Form from '../../components/Form';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface IHomeProps {
  id: string;
  description: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<IHomeProps[]>({
    key: 'todos',
    initialValue: [],
  });

  const addTask = (description: string) => {
    const newTodo = {
      id: uuidv4(),
      description,
      completed: false,
    };
    setTasks([...tasks, newTodo]);
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <Form addTodo={addTask} />
      <List data-testid="list" data={tasks} toggleTodo={toggleTodo} />
    </div>
  );
};

export default Home;
