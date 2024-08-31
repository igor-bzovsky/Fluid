import React, { useCallback } from 'react';
import { 
	ReactFlow,
	MiniMap,
  	Controls,
	Background,
	BackgroundVariant,
	useNodesState,
  	useEdgesState,
  	addEdge,
} from '@xyflow/react';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import { pageLayoutTypesPagesMenu } from '../../menu';

import '@xyflow/react/dist/style.css';

const initialNodes = [
	{ id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
	{ id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const FlowsheetPage = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	  const onConnect = useCallback(
		(params: any) => setEdges((eds) => addEdge(params, eds)),
		[setEdges],
	  );
	
	return (
		<PageWrapper title={pageLayoutTypesPagesMenu.pageLayout.subMenu.onlyHeader.text}>
			<Page container='fluid'>
				<div id='flowsheet' className='row d-flex align-items-center h-100'>
					<div
						className='col-12 d-flex justify-content-center align-items-center'
						style={{ fontSize: 'calc(1rem + 1vw)', width: '100%', height: '100%', padding: '0'}}>
							<ReactFlow
      						  	nodes={nodes}
      						  	edges={edges}
      						  	onNodesChange={onNodesChange}
      						  	onEdgesChange={onEdgesChange}
      						  	onConnect={onConnect}>
								<Controls />
								<MiniMap />
								<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
							</ReactFlow>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default FlowsheetPage;