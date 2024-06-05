import React from 'react';
import Card from '../Card';

interface IListProps {
  data: { id: string; description: string; completed: boolean }[];
  toggleTodo: (id: string) => void;
}

const List: React.FC<IListProps> = ({ data, toggleTodo }) => {
  return (
    <ul>
      {data.map((task, index) => (
        <Card key={task.id} task={task} toggleTodo={toggleTodo} index={index} />
      ))}
    </ul>
  );
};

export default List;
