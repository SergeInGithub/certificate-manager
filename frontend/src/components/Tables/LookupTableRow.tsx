import React from 'react';
import { TableHeaderItem, TLookupTableRow } from '@types';
import { Input } from '@components/Input';

export const LookupTableRow: React.FC<TLookupTableRow> = ({
  item,
  index,
  columns,
  handleSelection,
  isSelected,
}: TLookupTableRow) => {
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
        <td key={colIndex}>{item && item[column.id as keyof typeof item]}</td>
      ))}
    </tr>
  );
};
