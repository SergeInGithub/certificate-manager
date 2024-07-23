import React from 'react';
import { SupplierLookupRow } from './SupplierLookupRow';
import { SupplierLookupTableProps } from './SupplierLookupTable';

export const SupplierLookupTableBody: React.FC<SupplierLookupTableProps> = ({
  suppliers,
}) => (
  <tbody>
    {suppliers?.map((supplier) => <SupplierLookupRow supplier={supplier} />)}
  </tbody>
);
