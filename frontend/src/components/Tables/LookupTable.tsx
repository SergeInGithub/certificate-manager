import React from 'react';
import { LookupModalType, TLookupTableProps } from '@types';
import {
  participantTableHeaderItems,
  SupplierLookupTableHeaderItems,
  userLookupTableHeaderItems,
} from '@data';
import { LookupTableBody } from './LookupTableBody';
import { LookupTableHeader } from './LookupTableHeader';

export const LookupTable: React.FC<TLookupTableProps> = ({
  items,
  modalType,
  handleSelection,
  selectedItems,
}) => {
  const columns =
    modalType === LookupModalType.SUPPLIER_LOOKUP
      ? SupplierLookupTableHeaderItems
      : modalType === LookupModalType.USER_LOOKUP
        ? userLookupTableHeaderItems
        : participantTableHeaderItems;

  return (
    <section className="tableContainer">
      <table className="lookup-table">
        <LookupTableHeader tableHeaderItems={columns} />
        <LookupTableBody
          items={items}
          columns={columns}
          handleSelection={handleSelection}
          selectedItems={selectedItems}
        />
      </table>
      {!items?.length && (
        <div>
          <h1>No items 😢</h1>
        </div>
      )}
    </section>
  );
};
