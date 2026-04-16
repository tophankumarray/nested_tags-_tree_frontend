import React from 'react';

interface Props {
  nodeId: string;
  data: string;
  onUpdate: (id: string, data: string) => void;
}

const TreeNodeData: React.FC<Props> = ({ nodeId, data, onUpdate }) => {
  return (
    <div className="tree-node-data">
      <span className="data-label">Data</span>
      <input
        className="data-input"
        value={data}
        onChange={(e) => onUpdate(nodeId, e.target.value)}
        placeholder="Enter data..."
      />
    </div>
  );
};

export default TreeNodeData;
