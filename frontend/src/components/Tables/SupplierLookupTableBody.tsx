import React from 'react';
import { TableHeaderItem, TSupplier } from '@types';
import { SupplierLookupTableRow } from './SupplierLookupTableRow';

interface TSupplierLookupTableBody {
  items?: TSupplier[];
  columns: TableHeaderItem[];
  handleSelection: (item: TSupplier) => void;
  selectedSupplier: TSupplier | null;
}

export const SupplierLookupTableBody: React.FC<TSupplierLookupTableBody> = ({
  items = [],
  columns,
  handleSelection,
  selectedSupplier,
}) => {
  return (
    <tbody>
      {items.map((item: TSupplier, index: number) => (
        <SupplierLookupTableRow
          key={index}
          item={item}
          index={index}
          columns={columns}
          handleSelection={handleSelection}
          isSelected={selectedSupplier?.supplierIndex === item.supplierIndex}
        />
      ))}
    </tbody>
  );
};
