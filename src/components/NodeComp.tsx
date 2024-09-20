import { Handle, NodeProps, Position } from "@xyflow/react";


export default function NodeComp({ data: { name },
}: NodeProps<{ name: string }>) {
    return (
        <div className="bg-slate-200 px-3 p-1 border-[1px] border-black rounded-sm">
            <p>{name}</p>
            <Handle type="source" position={Position.Right} />
        </div>
    )
}