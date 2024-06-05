import React from 'react';

interface ICardProps {
  task: { id: string; description: string; completed: boolean };
  toggleTodo: (id: string) => void;
}

const Card: React.FC<ICardProps> = ({ task, toggleTodo }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTodo(task.id)}
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.description}
      </span>
    </li>
  );
};

export default Card;
