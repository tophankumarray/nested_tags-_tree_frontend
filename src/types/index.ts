export interface TreeNode {
  id: string;
  name: string;
  data?: string;
  children: TreeNode[];
  collapsed?: boolean;
}

export interface TreeState {
  root: TreeNode;
}

export type TreeAction =
  | { type: 'ADD_CHILD'; parentId: string }
  | { type: 'UPDATE_NAME'; id: string; name: string }
  | { type: 'UPDATE_DATA'; id: string; data: string }
  | { type: 'TOGGLE_COLLAPSE'; id: string }
  | { type: 'DELETE_NODE'; id: string }
  | { type: 'IMPORT'; node: TreeNode };
