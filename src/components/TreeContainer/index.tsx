import React from 'react';
import { TreeNode } from '../../types';
import { TreeNodeItem } from '../TreeNode';

interface Props {
  root: TreeNode;
  onToggle: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onUpdateName: (id: string, name: string) => void;
  onUpdateData: (id: string, data: string) => void;
  onDelete: (id: string) => void;
}

const TreeContainer: React.FC<Props> = ({
  root,
  onToggle,
  onAddChild,
  onUpdateName,
  onUpdateData,
  onDelete,
}) => {
  return (
    <div className="tree-container">
      <TreeNodeItem
        node={root}
        isRoot={true}
        depth={0}
        onToggle={onToggle}
        onAddChild={onAddChild}
        onUpdateName={onUpdateName}
        onUpdateData={onUpdateData}
        onDelete={onDelete}
      />
    </div>
  );
};

export default TreeContainer;
