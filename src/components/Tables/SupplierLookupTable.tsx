import React from 'react';
import { TSupplierLookupTableProps } from '@types';
import { SupplierLookupTableBody } from './SupplierLookupTableBody';
import { LookupTableHeader } from './LookupTableHeader';
import { SupplierLookupTableHeaderItems } from '@data';

export const SupplierLookupTable: React.FC<TSupplierLookupTableProps> = ({
  selectedSuppliers,
  handleSupplierSelection,
  selectedSupplier,
}) => {
  const columns = SupplierLookupTableHeaderItems;

  return (
    <section className="tableContainer">
      <table className="lookup-table">
        <LookupTableHeader tableHeaderItems={columns} />

        <SupplierLookupTableBody
          items={selectedSuppliers}
          columns={columns}
          handleSelection={handleSupplierSelection}
          selectedSupplier={selectedSupplier}
        />
      </table>
      {!selectedSuppliers || selectedSuppliers.length === 0 ? (
        <div>
          <h1>No suppliers found 😢</h1>
        </div>
      ) : null}
    </section>
  );
};
