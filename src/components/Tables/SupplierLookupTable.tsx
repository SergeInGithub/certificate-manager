import React from 'react';
import { SupplierLookupTableHeader } from './SupplierLookupTableHeader';
import { SupplierLookupTableBody } from './SupplierLookupTableBody';
import { TSupplier } from '@types';

export type SupplierLookupTableProps = {
  suppliers: TSupplier[] | undefined;
  handleSelection: (item: TSupplier) => void;
  selectedItem?: TSupplier | null;
};

export const SupplierLookupTable: React.FC<SupplierLookupTableProps> = ({
  suppliers,
  handleSelection,
  selectedItem,
}) => {
  return (
    <section className="tableContainer">
      <table className="supplier-lookup-table">
        <SupplierLookupTableHeader />
        <SupplierLookupTableBody
          suppliers={suppliers}
          handleSelection={handleSelection}
          selectedItem={selectedItem}
        />
      </table>
      {!suppliers?.length && (
        <div>
          <h5>No suppliers 😢, try searching something else</h5>
        </div>
      )}
    </section>
  );
};
