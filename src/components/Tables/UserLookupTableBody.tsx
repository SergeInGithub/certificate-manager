import React from 'react';
import { TableHeaderItem, TUserApplicant } from '@types';
import { UserLookupTableRow } from './UserLookupTableRow';

interface TUserLookupTableBody {
  items?: TUserApplicant[];
  columns: TableHeaderItem[];
  handleSelection: (item: TUserApplicant) => void;
  selectedItems?: TUserApplicant[];
}

export const UserLookupTableBody: React.FC<TUserLookupTableBody> = ({
  items = [],
  columns,
  handleSelection,
  selectedItems = [],
}) => {
  return (
    <tbody>
      {items?.map((item: TUserApplicant, index: number) => (
        <UserLookupTableRow
          key={index}
          item={item}
          index={index}
          columns={columns}
          handleSelection={handleSelection}
          isSelected={selectedItems.some(
            (selectedItem) => selectedItem.id === item.id,
          )}
        />
      ))}
    </tbody>
  );
};
