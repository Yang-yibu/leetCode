/**
 * 用于渲染的树字段
 * @param {string[]} ancestors
 * @param {string} nodeName
 * @param {[]} [children]
 * @param { boolean} [isLeaf]
 * @returns
 */
export function buildAntdTreeNodeModel(ancestors = [], nodeName, children, isLeaf) {
  const TREE_HIERARCHY_SEPERATOR = String.fromCharCode(0);
  const fullNames = ancestors.concat(nodeName);

  let type = '';
  const value = fullNames;
  if (Array.isArray(value)) {
    switch (value.length) {
      case 1:
        type = 'database';
        break;
      case 2:
        type = 'table';
        break;
      case 3:
        type = 'field';
        break;
    }
  }

  const key = fullNames.join(TREE_HIERARCHY_SEPERATOR);
  return {
    parentId: fullNames.slice(0, -1).join(TREE_HIERARCHY_SEPERATOR),
    id: key,
    name: nodeName,
    type: type,

    key: key,
    title: nodeName,
    value: fullNames,
    children,
    isLeaf,
  };
}

/**
 * @param {string[]} ancestors
 * @param {*} table
 * @returns
 */
export const buildTableColumnNode = (ancestors = [], table) => {
  const children =
    table?.columns?.map((column) => {
      return Object.assign(
        buildAntdTreeNodeModel(ancestors.concat(table.tableName), column?.name[0], [], true),
        // { type: column?.type }
        { typechild: column?.type }
      );
    }) || [];
  return buildAntdTreeNodeModel(ancestors, table.tableName, children, false);
};

/**
 * @param {Datart.DatabaseSchema} database
 */
export const buildTableNode = (database) => {
  const children =
    database?.tables?.map((table) => {
      return buildTableColumnNode([database.dbName], table);
    }) || [];

  return buildAntdTreeNodeModel([], database.dbName, children, false);
};
