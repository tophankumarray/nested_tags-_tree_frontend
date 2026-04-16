import React from 'react';

interface Props {
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onReset: () => void;
}

const Controls: React.FC<Props> = ({ onExpandAll, onCollapseAll, onReset }) => {
  return (
    <div className="controls">
      <button className="ctrl-btn" onClick={onExpandAll}>Expand All</button>
      <button className="ctrl-btn" onClick={onCollapseAll}>Collapse All</button>
      <button className="ctrl-btn danger" onClick={onReset}>Reset Tree</button>
    </div>
  );
};

export default Controls;
