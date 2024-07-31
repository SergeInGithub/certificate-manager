import React from 'react';
import { SupplierLookupRow } from './SupplierLookupRow';
import { SupplierLookupTableProps } from './SupplierLookupTable';

export const SupplierLookupTableBody: React.FC<SupplierLookupTableProps> = ({
  suppliers,
  handleSelection,
  selectedItem,
}) => (
  <tbody>
    {suppliers?.map((supplier) => (
      <SupplierLookupRow
        key={supplier.supplierIndex}
        supplier={supplier}
        handleSelection={handleSelection}
        isSelected={selectedItem?.supplierIndex === supplier.supplierIndex}
      />
    ))}
  </tbody>
);
