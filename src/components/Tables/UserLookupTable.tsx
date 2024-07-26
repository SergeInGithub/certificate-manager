import React from 'react';
import { TUserApplicant } from '@types';
import { UserLookupTableHeader } from './UserLookupTableHeader';
import { UserLookupTableBody } from './UserLookupTableBody';

export type UserLookupTableProps = {
  users: TUserApplicant[] | undefined;
};

export const UserLookupTable = ({ users }: UserLookupTableProps) => {
  return (
    <section className="tableContainer">
      <table className="supplier-lookup-table">
        <UserLookupTableHeader />
        <UserLookupTableBody users={users} />
      </table>
      {!users?.length && (
        <div>
          <h1>No suppliers 😢</h1>
        </div>
      )}
    </section>
  );
};
