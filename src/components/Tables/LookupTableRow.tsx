import React from 'react';
import { ILookupTableRow, TableHeaderItem } from '@types';
import { Input } from '@components/Input';

export const LookupTableRow = ({ item, index, columns }: ILookupTableRow) => {
  return (
    <tr key={index}>
      <td className="lookup-table-row-point-container">
        <Input
          type="radio"
          key={index}
        />
      </td>
      {columns.map((column: TableHeaderItem, colIndex: number) => (
        <td key={colIndex}>{item[column.id as keyof typeof item]}</td>
      ))}
    </tr>
  );
};
