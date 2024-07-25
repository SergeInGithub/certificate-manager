import React from 'react';
import { LookupTableRow } from './LookupTableRow';
import { TLookupTableBody, TSupplier, TUserApplicant } from '@types';

export const LookupTableBody: React.FC<TLookupTableBody> = ({
  items,
  columns,
  handleSelection,
  selectedItems,
}: TLookupTableBody) => {
  return (
    <tbody>
      {items?.map((item: TSupplier | TUserApplicant, index: number) => (
        <LookupTableRow
          key={index}
          item={item}
          index={index}
          columns={columns}
          handleSelection={handleSelection}
          isSelected={selectedItems?.some(
            (selectedItem) => selectedItem.id === item.id,
          )}
        />
      ))}
    </tbody>
  );
};
