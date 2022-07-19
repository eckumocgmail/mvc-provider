import { ColumnModel } from './column-model';

export class TableModel {

  name: string;
  multicount_name: string;
  singlecount_name: string;
  description: string;
  pk: string;
  referenceTables: [] = [];
  references: string[];
  fk: { [property: string]: string };
  columnNames: string[] = [];

  columns: {
    [property: string]: ColumnModel;
  }

}
