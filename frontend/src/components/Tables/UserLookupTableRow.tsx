import React from 'react';
import { TableHeaderItem, TUserApplicant } from '@types';
import { Input } from '@components/Input';

interface UserLookupTableRowProps {
  item: TUserApplicant;
  index: number;
  columns: TableHeaderItem[];
  handleSelection: (item: TUserApplicant) => void;
  isSelected: boolean;
}

export const UserLookupTableRow: React.FC<UserLookupTableRowProps> = ({
  item,
  index,
  columns,
  handleSelection,
  isSelected,
}) => {
  return (
    <tr key={index}>
      <td className="lookup-table-row-point-container">
        <Input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleSelection(item)}
        />
      </td>
      {columns.map((column: TableHeaderItem, colIndex: number) => (
        <td key={colIndex}>{item[column.id as keyof TUserApplicant]}</td>
      ))}
    </tr>
  );
};
