import React from 'react';
import Card from '../Card';

interface IListProps {
  todos: { id: number; description: string; completed: boolean }[];
  toggleTodo: (id: number) => void;
}

const List: React.FC<IListProps> = ({ todos, toggleTodo }) => {
  return (
    <ul>
      {todos.map(todo => (
        <Card key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
};

export default List;
