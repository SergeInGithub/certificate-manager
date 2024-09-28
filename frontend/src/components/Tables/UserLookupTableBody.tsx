import React from 'react';
import { TableHeaderItem, UserDto } from '@types';
import { UserLookupTableRow } from './UserLookupTableRow';

interface TUserLookupTableBody {
  items?: UserDto[];
  columns: TableHeaderItem[];
  handleSelection: (item: UserDto) => void;
  selectedItems?: UserDto[];
}

export const UserLookupTableBody: React.FC<TUserLookupTableBody> = ({
  items = [],
  columns,
  handleSelection,
  selectedItems = [],
}) => {
  return (
    <tbody>
      {items?.map((item: UserDto, index: number) => (
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
