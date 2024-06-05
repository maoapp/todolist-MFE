import React from 'react';

interface ICardProps {
  task: { id: string; description: string; completed: boolean };
  toggleTodo: (id: string) => void;
  index: number
}

const Card: React.FC<ICardProps> = ({ task, toggleTodo, index }) => {
  return (
    <li data-testid={`card-${index}`}>
      <input
        data-testid={`toggle-${index}`}
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
