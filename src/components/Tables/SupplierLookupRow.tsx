import React from 'react';
import { Input } from '@components/Input';
import { TSupplier } from '@types';

interface ISupplierLookupRowProps {
  supplier: TSupplier;
  handleSelection: (item: TSupplier) => void;
  isSelected?: boolean;
}

export const SupplierLookupRow: React.FC<ISupplierLookupRowProps> = ({
  supplier,
  handleSelection,
  isSelected,
}) => {
  return (
    <tr>
      <td className="supplier-lookup-table-row-point-container">
        <Input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleSelection(supplier)}
        />
      </td>
      <td>{supplier.supplierName}</td>
      <td>{supplier.supplierIndex}</td>
      <td>{supplier.city}</td>
    </tr>
  );
};
