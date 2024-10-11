export as namespace Datart;

/** 数据库 Schemas 信息（表字段信息） */
export type DatabaseSchema = {
  dbName: string;
  tables: Array<{
    primaryKeys: string[];
    tableName: string;
    columns: Array<{
      fmt: string;
      foreignKeys: Array<{ column: string; database: string; table: string }>;
      name: string;
      type: string;
    }>;
  }>;
};

export interface ViewBase {
  id: string;
  name: string;
  parentId: string | null;
  index: number | null;
}

export interface ViewSimple extends ViewBase {
  description?: string;
  isFolder: boolean;
  sourceId: string;
}

/** 数据视图 */
export interface ViewSimpleViewModel extends ViewSimple {
  deleteLoading: boolean;
}
