import React, { useState } from 'react';
import { TreeNode } from '../../types';

interface Props {
  node: TreeNode;
  isRoot?: boolean;
  onToggle: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onUpdateName: (id: string, name: string) => void;
  onDelete?: (id: string) => void;
}

const TreeNodeHeader: React.FC<Props> = ({
  node,
  isRoot = false,
  onToggle,
  onAddChild,
  onUpdateName,
  onDelete,
}) => {
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(node.name);

  const hasChildren = node.children.length > 0;

  const handleNameBlur = () => {
    setEditing(false);
    if (tempName.trim()) onUpdateName(node.id, tempName.trim());
    else setTempName(node.name);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleNameBlur();
    if (e.key === 'Escape') {
      setTempName(node.name);
      setEditing(false);
    }
  };

  return (
    <div className="tree-node-header">
      <button
        className={`collapse-btn ${!hasChildren ? 'invisible' : ''}`}
        onClick={() => onToggle(node.id)}
        title={node.collapsed ? 'Expand' : 'Collapse'}
      >
        {node.collapsed ? '>' : 'v'}
      </button>

      {editing && !isRoot ? (
        <input
          className="name-input"
          value={tempName}
          autoFocus
          onChange={(e) => setTempName(e.target.value)}
          onBlur={handleNameBlur}
          onKeyDown={handleNameKeyDown}
        />
      ) : (
        <span
          className={`node-name ${!isRoot ? 'editable' : ''}`}
          onDoubleClick={() => !isRoot && setEditing(true)}
          title={!isRoot ? 'Double-click to edit' : ''}
        >
          {node.name}
        </span>
      )}

      <div className="header-actions">
        {!isRoot && onDelete && (
          <button
            className="delete-btn"
            onClick={() => onDelete(node.id)}
            title="Delete node"
          >
            ✕
          </button>
        )}
        <button
          className="add-child-btn"
          onClick={() => onAddChild(node.id)}
        >
          Add Child
        </button>
      </div>
    </div>
  );
};

export default TreeNodeHeader;
