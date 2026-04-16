import { useReducer, useCallback } from 'react';
import { TreeNode, TreeState, TreeAction } from '../types';
import {
  addChildToNode,
  updateNodeName,
  updateNodeData,
  toggleCollapse,
  deleteNode,
  generateId,
} from '../utils/treeUtils';

const initialRoot: TreeNode = {
  id: generateId(),
  name: 'root',
  children: [],
  collapsed: false,
};

const treeReducer = (state: TreeState, action: TreeAction): TreeState => {
  switch (action.type) {
    case 'ADD_CHILD':
      return { root: addChildToNode(state.root, action.parentId) };
    case 'UPDATE_NAME':
      return { root: updateNodeName(state.root, action.id, action.name) };
    case 'UPDATE_DATA':
      return { root: updateNodeData(state.root, action.id, action.data) };
    case 'TOGGLE_COLLAPSE':
      return { root: toggleCollapse(state.root, action.id) };
    case 'DELETE_NODE':
      return { root: deleteNode(state.root, action.id) };
    case 'IMPORT':
      return { root: action.node };
    default:
      return state;
  }
};

export const useTree = () => {
  const [state, dispatch] = useReducer(treeReducer, { root: initialRoot });

  const addChild = useCallback(
    (parentId: string) => dispatch({ type: 'ADD_CHILD', parentId }),
    []
  );
  const updateName = useCallback(
    (id: string, name: string) => dispatch({ type: 'UPDATE_NAME', id, name }),
    []
  );
  const updateData = useCallback(
    (id: string, data: string) => dispatch({ type: 'UPDATE_DATA', id, data }),
    []
  );
  const toggle = useCallback(
    (id: string) => dispatch({ type: 'TOGGLE_COLLAPSE', id }),
    []
  );
  const deleteNodeById = useCallback(
    (id: string) => dispatch({ type: 'DELETE_NODE', id }),
    []
  );
  const importTree = useCallback(
    (node: TreeNode) => dispatch({ type: 'IMPORT', node }),
    []
  );

  return { root: state.root, addChild, updateName, updateData, toggle, deleteNodeById, importTree };
};
