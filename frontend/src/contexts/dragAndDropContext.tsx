import { FC, ReactNode, createContext, useContext, useState } from 'react';

const DragAndDropContext = createContext([null, (_: any) => {}]);

interface IDragAndDropProviderProps {
  children: ReactNode;
}

export const DragAndDropProvider: FC<IDragAndDropProviderProps> = ({ children }) => {
  const [type, setType] = useState(null);

  return (
    <DragAndDropContext.Provider value={[type, setType]}>
      {children}
    </DragAndDropContext.Provider>
  );
}

export default DragAndDropContext;

export const useDragAndDrop = () => {
  return useContext(DragAndDropContext);
}