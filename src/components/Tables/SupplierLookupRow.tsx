import { TSupplier } from '@types';
import React from 'react';

interface ISupplierLookupRowProps {
  supplier: TSupplier;
}

export const SupplierLookupRow = ({ supplier }: ISupplierLookupRowProps) => {
  return (
    <React.Fragment>
      <tr>
        <td className="supplier-lookup-table-row-point-container">
          <div className="supplier-lookup-table-row-point" />
        </td>
        <td>{supplier.supplierName}</td>
        <td>{supplier.supplierIndex}</td>
        <td>{supplier.city}</td>
      </tr>
    </React.Fragment>
  );
};
