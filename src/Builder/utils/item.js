import { cloneDeep } from 'lodash';
import { v4 as uuid } from 'uuid';

export const assignPath = (tree, node, paths = {}) => {
  node = node || tree;

  paths[node.id] = findPath(node, tree);

  if (node.children) {
    node.children
      .filter(Boolean)
      .forEach((node) => assignPath(tree, node, paths));
  }

  return paths;
};

export const createNewItem = (item) => {
  if (!item) {
    return null;
  }

  return traverseItem(cloneDeep(item), (item) => {
    if (!item.id) {
      item.id = uuid();
    }
  });
};

export const findItem = (item, predicate) => {
  let found = null;

  const traverse = (item) => {
    found = predicate(item);

    if (predicate(item)) {
      found = item;
    }

    if (!found && item.children) {
      item.children.find(traverse);
    }
  };

  traverse(item);

  return found;
};

export const findPath = (node, tree) => {
  let found = null;

  const traverse = (node, tree, path = []) => {
    if (node === tree) {
      return path;
    }

    if (tree?.children) {
      tree.children.forEach((child, index) => {
        const p = traverse(node, child, [...path, 'children', index]);

        if (p) {
          found = p;
        }

        return p;
      });
    }

    return found;
  };

  return traverse(node, tree);
};

export const traverseItem = (item, updater) => {
  const traverse = (item) => {
    updater(item);

    if (item.children) {
      item.children = item.children.filter(Boolean).map(traverse);
    }

    return item;
  };

  return traverse(item);
};
