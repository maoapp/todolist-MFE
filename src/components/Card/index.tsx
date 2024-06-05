import React from 'react';

interface ICardProps {
  todo: { id: number; description: string; completed: boolean };
  toggleTodo: (id: number) => void;
}

const Card: React.FC<ICardProps> = ({ todo, toggleTodo }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.description}
      </span>
    </li>
  );
};

export default Card;
