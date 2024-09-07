import React, { useRef, useCallback } from 'react';
import {
  	ReactFlow,
  	ReactFlowProvider,
  	addEdge,
  	useNodesState,
  	useEdgesState,
  	Controls,
  	useReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import UnitOperations from '../../components/UnitOperations';
import { DragAndDropProvider, useDragAndDrop } from '../../contexts/dragAndDropContext';


const initialNodes = [
	{ id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
	{ id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowsheetPage = () => {
  	const reactFlowWrapper = useRef(null);
  	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  	const { screenToFlowPosition } = useReactFlow();
  	const [type] = useDragAndDrop();

  	const onConnect = useCallback(
    	(params: any) => setEdges((eds) => addEdge(params, eds)),
    	[setEdges],
  	);

  	const onDragOver = useCallback((event: any) => {
    	event.preventDefault();
    	event.dataTransfer.dropEffect = 'move';
  	}, []);

  	const onDrop = useCallback(
    	(event: any) => {
      		event.preventDefault();

      		// check if the dropped element is valid
      		if (!type) {
        		return;
      		}

      		// project was renamed to screenToFlowPosition
      		// and you don't need to subtract the reactFlowBounds.left/top anymore
      		// details: https://reactflow.dev/whats-new/2023-11-10
      		const position = screenToFlowPosition({
        		x: event.clientX,
        		y: event.clientY,
      		});
      		const newNode = {
        		id: getId(),
        		type,
        		position,
        		data: { label: `${type} node` },
      		};

      		setNodes((nds) => nds.concat(newNode));
    	},
    	[screenToFlowPosition, type],
  	);

  	return (
    	<div className="flowsheet">
      		<div className="reactflow-wrapper" ref={reactFlowWrapper}>
        		<ReactFlow
          			nodes={nodes}
          			edges={edges}
          			onNodesChange={onNodesChange}
          			onEdgesChange={onEdgesChange}
          			onConnect={onConnect}
          			onDrop={onDrop}
          			onDragOver={onDragOver}
          			fitView
        		>
          			<Controls />
        		</ReactFlow>
      		</div>
      		<UnitOperations />
    	</div>
  	);
};

export default () => (
  	<ReactFlowProvider>
    	<DragAndDropProvider>
      		<FlowsheetPage />
    	</DragAndDropProvider>
  	</ReactFlowProvider>
);
