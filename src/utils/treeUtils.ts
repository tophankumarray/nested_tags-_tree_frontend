import { TreeNode } from '../types';

export const generateId = (): string =>
  Math.random().toString(36).substr(2, 9);

export const createNode = (name = 'New Child'): TreeNode => ({
  id: generateId(),
  name,
  data: 'Data',
  children: [],
  collapsed: false,
});

export const addChildToNode = (
  node: TreeNode,
  parentId: string
): TreeNode => {
  if (node.id === parentId) {
    return { ...node, children: [...node.children, createNode()] };
  }
  return {
    ...node,
    children: node.children.map((child) => addChildToNode(child, parentId)),
  };
};

export const updateNodeName = (
  node: TreeNode,
  id: string,
  name: string
): TreeNode => {
  if (node.id === id) return { ...node, name };
  return {
    ...node,
    children: node.children.map((child) => updateNodeName(child, id, name)),
  };
};

export const updateNodeData = (
  node: TreeNode,
  id: string,
  data: string
): TreeNode => {
  if (node.id === id) return { ...node, data };
  return {
    ...node,
    children: node.children.map((child) => updateNodeData(child, id, data)),
  };
};

export const toggleCollapse = (
  node: TreeNode,
  id: string
): TreeNode => {
  if (node.id === id) return { ...node, collapsed: !node.collapsed };
  return {
    ...node,
    children: node.children.map((child) => toggleCollapse(child, id)),
  };
};

export const deleteNode = (
  node: TreeNode,
  id: string
): TreeNode => {
  return {
    ...node,
    children: node.children
      .filter((child) => child.id !== id)
      .map((child) => deleteNode(child, id)),
  };
};

export const sanitizeForExport = (node: TreeNode): object => {
  const result: any = { name: node.name };
  if (node.data !== undefined && node.data !== '') result.data = node.data;
  if (node.children.length > 0)
    result.children = node.children.map(sanitizeForExport);
  return result;
};
