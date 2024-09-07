import React from 'react';
import { useDragAndDrop } from '../contexts/dragAndDropContext';

export default () => {
  const [_, setType] = useDragAndDrop();

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    if(setType) {
      setType(nodeType);
      event.dataTransfer.effectAllowed = 'move';
    }
  };

  return (
    <aside>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
    </aside>
  );
};
