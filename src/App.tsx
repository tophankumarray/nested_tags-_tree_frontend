import React, { useCallback } from 'react';
import { useTree } from './hooks/useTree';
import TreeContainer from './components/TreeContainer';
import ExportPanel from './components/ExportPanel';
import Controls from './components/Controls';
import { TreeNode } from './types';
import "./app.css";

const setAllCollapsed = (node: TreeNode, collapsed: boolean): TreeNode => ({
  ...node,
  collapsed,
  children: node.children.map((c) => setAllCollapsed(c, collapsed)),
});

const App: React.FC = () => {
  const {
    root,
    addChild,
    updateName,
    updateData,
    toggle,
    deleteNodeById,
    importTree,
  } = useTree();

  const handleExpandAll = useCallback(() => {
    importTree(setAllCollapsed(root, false));
  }, [root, importTree]);

  const handleCollapseAll = useCallback(() => {
    importTree(setAllCollapsed(root, true));
  }, [root, importTree]);

  const handleReset = useCallback(() => {
    if (window.confirm('Reset the entire tree?')) {
      importTree({
        id: 'root-' + Date.now(),
        name: 'root',
        children: [],
        collapsed: false,
      });
    }
  }, [importTree]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Nested Tags Tree</h1>
        <p className="subtitle">Visual hierarchical tree editor</p>
      </header>

      <main className="app-main">
        <Controls
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
          onReset={handleReset}
        />

        <TreeContainer
          root={root}
          onToggle={toggle}
          onAddChild={addChild}
          onUpdateName={updateName}
          onUpdateData={updateData}
          onDelete={deleteNodeById}
        />

        <ExportPanel root={root} onImport={importTree} />
      </main>
    </div>
  );
};

export default App;
