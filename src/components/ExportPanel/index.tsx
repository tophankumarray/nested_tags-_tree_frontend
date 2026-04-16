import React, { useState } from 'react';
import { TreeNode } from '../../types';
import { sanitizeForExport } from '../../utils/treeUtils';

interface Props {
  root: TreeNode;
  onImport: (node: TreeNode) => void;
}

const ExportPanel: React.FC<Props> = ({ root }) => {
  const [exported, setExported] = useState<string>('');

  const handleExport = () => {
    const data = sanitizeForExport(root);
    const json = JSON.stringify(data);
    setExported(json);
  };

  return (
    <div className="export-panel">
      <div className="export-buttons">
        <button className="export-btn" onClick={handleExport}>
          Export
        </button>
      </div>
      {exported && (
        <div className="export-output">
          <code>{exported}</code>
        </div>
      )}
    </div>
  );
};

export default ExportPanel;
