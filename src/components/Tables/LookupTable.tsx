import React from 'react';
import { LookupModalType, TSupplier, TUserApplicant } from '@types';
import {
  SupplierLookupTableHeaderItems,
  userLookupTableHeaderItems,
} from '@data';
import { LookupTableBody } from './LookupTableBody';
import { LookupTableHeader } from './LookupTableHeader';

interface LookupTableProps {
  items: TSupplier[] | TUserApplicant[];
  modalType: LookupModalType;
}

export const LookupTable: React.FC<LookupTableProps> = ({
  items,
  modalType,
}) => {
  const columns =
    modalType === LookupModalType.SUPPLIER_LOOKUP
      ? SupplierLookupTableHeaderItems
      : userLookupTableHeaderItems;

  return (
    <section className="tableContainer">
      <table className="lookup-table">
        <LookupTableHeader tableHeaderItems={columns} />
        <LookupTableBody
          items={items}
          columns={columns}
        />
      </table>
      {!items.length && (
        <div>
          <h1>No items 😢</h1>
        </div>
      )}
    </section>
  );
};
