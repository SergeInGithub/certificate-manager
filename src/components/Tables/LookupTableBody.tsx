import React from 'react';
import { LookupTableRow } from './LookupTableRow';
import { ILookupTableBody, TSupplier, TUserApplicant } from '@types';

export const LookupTableBody: React.FC<ILookupTableBody> = ({
  items,
  columns,
}: ILookupTableBody) => {
  return (
    <tbody>
      {items.map((item: TSupplier | TUserApplicant, index: number) => (
        <LookupTableRow
          key={index}
          item={item}
          index={index}
          columns={columns}
        />
      ))}
    </tbody>
  );
};
