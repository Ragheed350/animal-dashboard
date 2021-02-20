import { FormListFieldData, FormListOperation } from 'antd/lib/form/FormList';
import { ColumnType } from 'antd/lib/table/interface';

export type FieldType =
  // Relational
  | 'primary-key'
  | 'foreign-key'
  | 'foreign-key-obj'
  | 'multi-foreign-key'
  | 'multi-foreign-key-obj'
  // Normal types
  | 'text'
  | 'number'
  | 'text-area'
  | 'image'
  | 'multi-images'
  | 'check-box'
  | 'select'
  | 'html-editor'
  | 'file'
  | 'date'
  // For adding a new array of objects
  | 'dynamic-list';

export interface ItemType {
  // Required for each item
  columnType: ColumnType<any>;
  type: FieldType;

  // This array will be used in foregin key field type
  foreignKeyArr?: { value: number | string; title: React.ReactNode }[];

  // if setted to true will map an [:ar | :en] after dataindex porp
  trans?: boolean;

  // ignore this item in add form or edit form
  ignore?: true | { update?: true; insert?: true };

  // hide this item in the table
  hidden?: true;

  // make the field is not required in add & edit form
  required?: boolean;

  // Custom form item used in add form or edit form
  customFormItem?:
    | React.ReactElement
    | { insert: React.ReactElement; update: React.ReactElement };

  // Initial value section
  initialValueDataIndex?: string;
  getInitialValue?: (val: any) => any;

  // for dynamic list field type
  dynamicListGenerator?: (
    fields: FormListFieldData[],
    operation: FormListOperation,
    meta: { errors: React.ReactNode[] }
  ) => React.ReactNode;
}
