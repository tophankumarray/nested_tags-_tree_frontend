import React from 'react';
import { TreeNode } from '../../types';
import TreeNodeHeader from './TreeNodeHeader';
import TreeNodeData from './TreeNodeData';

interface Props {
  node: TreeNode;
  isRoot?: boolean;
  depth?: number;
  onToggle: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onUpdateName: (id: string, name: string) => void;
  onUpdateData: (id: string, data: string) => void;
  onDelete?: (id: string) => void;
}

const TreeNodeItem: React.FC<Props> = ({
  node,
  isRoot = false,
  depth = 0,
  onToggle,
  onAddChild,
  onUpdateName,
  onUpdateData,
  onDelete,
}) => {
  const hasChildren = node.children.length > 0;
  const isLeaf = !hasChildren;

  return (
    <div className={`tree-node depth-${depth} ${isRoot ? 'root-node' : ''}`}>
      <TreeNodeHeader
        node={node}
        isRoot={isRoot}
        onToggle={onToggle}
        onAddChild={onAddChild}
        onUpdateName={onUpdateName}
        onDelete={onDelete}
      />

      {!node.collapsed && (
        <div className="tree-node-body">
          {/* Show data field only for leaf nodes */}
          {isLeaf && (
            <TreeNodeData
              nodeId={node.id}
              data={node.data || ''}
              onUpdate={onUpdateData}
            />
          )}

          {/* Render children */}
          {hasChildren && (
            <div className="tree-node-children">
              {node.children.map((child) => (
                <TreeNodeItem
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  onToggle={onToggle}
                  onAddChild={onAddChild}
                  onUpdateName={onUpdateName}
                  onUpdateData={onUpdateData}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TreeNodeItem;
