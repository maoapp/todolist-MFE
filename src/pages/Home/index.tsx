import React, { useState } from 'react';
import List from '../../components/List';
import Form from '../../components/Form';

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (description: string) => {
    const newTodo = {
      id: todos.length + 1,
      description,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <Form addTodo={addTodo} />
      <List todos={todos} toggleTodo={toggleTodo} />
    </div>
  );
};

export default Home;
