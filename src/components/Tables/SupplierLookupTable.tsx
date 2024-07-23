import React from 'react';
import { SupplierLookupTableHeader } from './SupplierLookupTableHeader';
import { SupplierLookupTableBody } from './SupplierLookupTableBody';
import { TSupplier } from '@types';

export type SupplierLookupTableProps = {
  suppliers: TSupplier[] | undefined;
};

export const SupplierLookupTable: React.FC<SupplierLookupTableProps> = ({
  suppliers,
}) => {
  return (
    <section className="tableContainer">
      <table className="supplier-lookup-table">
        <SupplierLookupTableHeader />
        <SupplierLookupTableBody suppliers={suppliers} />
      </table>
      {!suppliers?.length && (
        <div>
          <h1>No suppliers 😢</h1>
        </div>
      )}
    </section>
  );
};
