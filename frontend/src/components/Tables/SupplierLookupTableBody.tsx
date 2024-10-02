import React from 'react';
import { SupplierDto, TableHeaderItem } from '@types';
import { SupplierLookupTableRow } from './SupplierLookupTableRow';

interface TSupplierLookupTableBody {
  items?: SupplierDto[];
  columns: TableHeaderItem[];
  handleSelection: (item: SupplierDto) => void;
  selectedSupplier: SupplierDto | null;
}

export const SupplierLookupTableBody: React.FC<TSupplierLookupTableBody> = ({
  items = [],
  columns,
  handleSelection,
  selectedSupplier,
}) => {
  return (
    <tbody>
      {items.map((item: SupplierDto, index: number) => (
        <SupplierLookupTableRow
          key={index}
          item={item}
          index={index}
          columns={columns}
          handleSelection={handleSelection}
          isSelected={selectedSupplier?.id === item.id}
        />
      ))}
    </tbody>
  );
};
