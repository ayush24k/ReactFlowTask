import { addEdge, Background, Connection, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { useCallback, useState } from "react";
import { initialEdges, initialNodes } from "./workflow.constants";
import '@xyflow/react/dist/style.css';
import NodeComp from "./NodeComp";
import BigNodeComp from "./BigNodeComp";

export default function Workflow() {
    const [nodeName, setNodeName] = useState("");

    const [nodes, setNodes, onNodeChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgeChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((connection: Connection) => {
        const edge = { ...connection, animated: true, id: `${edges.length} + 1`,};
        //@ts-ignore
        setEdges((prevEdges) => addEdge(edge, prevEdges));
    }, [setEdges])

    const nodeTypes = {
        'nodeComp': NodeComp,
        'bigNodeComp': BigNodeComp
    }

    return (
        <div className="flex justify-center pt-[120px] gap-8">
            <div className="bg-slate-700 p-5 rounded-sm flex flex-col gap-[30px] items-center">
                <div className="flex flex-col pt-2 gap-2">
                    <div className="flex flex-col gap-2 border-[1px] rounded-sm p-3">
                        <input type="text" className="rounded-sm p-1 text-slate-900" placeholder="enter node name" onChange={(e) => setNodeName(e.target.value)} />

                        <button className="bg-blue-600 rounded-sm p-1" onClick={() => {
                            const cordinates = Math.random() * 200;
                            setNodes((prevNodes) => [...prevNodes, {
                                id: `${prevNodes.length + 1}`,
                                data: {name: nodeName},
                                type: "nodeComp",
                                position: {x: cordinates, y:cordinates},
                                hidden: false
                            }])
                        }}>Add Node</button>
                    </div>

                    <button className="bg-blue-700 rounded-sm p-1 mt-3" onClick={() => {
                        setNodes((prevNodes) => [...prevNodes, {
                            id: `bignode`,
                            data: {},
                            type: "bigNodeComp",
                            position: {x: 0, y: 100},
                            hidden: false
                        }])
                    }}>Add Biiig Node</button>
                </div>
            </div>
            <div className="h-[720px] w-[1280px] bg-slate-100 text-black">
                <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodeChange} onEdgesChange={onEdgeChange} onConnect={onConnect} nodeTypes={nodeTypes} fitView>
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
        </div>
    )
}