import React from 'react';
import { SupplierDto, TableHeaderItem } from '@types';
import { Input } from '@components/Input';

interface SupplierLookupTableRowProps {
  item: SupplierDto;
  index: number;
  columns: TableHeaderItem[];
  handleSelection: (item: SupplierDto) => void;
  isSelected: boolean;
}

export const SupplierLookupTableRow: React.FC<SupplierLookupTableRowProps> = ({
  item,
  index,
  columns,
  handleSelection,
  isSelected,
}) => {
  return (
    <tr
      key={index}
      className={isSelected ? 'selected-row' : ''}
    >
      <td className="lookup-table-row-point-container">
        <Input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleSelection(item)}
        />
      </td>
      {columns.map((column: TableHeaderItem, colIndex: number) => (
        <td key={colIndex}>{item[column.id as keyof SupplierDto]}</td>
      ))}
    </tr>
  );
};
