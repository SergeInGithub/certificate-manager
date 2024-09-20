import React from 'react';
import { TCertificate } from '@types';
import TableHeader from './TableHeader';
import { TableBody } from './TableBody';
import '../../assets/styles/components/table.css';

export type CertificateTableProps = {
  certificates: TCertificate[] | undefined;
  onDelete: (id: number) => void;
};

export const CertificateTable: React.FC<CertificateTableProps> = ({
  certificates,
  onDelete,
}) => {
  return (
    <section className="tableContainer">
      <table>
        <TableHeader />
        <TableBody
          certificates={certificates}
          onDelete={onDelete}
        />
      </table>
      {!certificates?.length && (
        <div>
          <h1>No certificates 😢</h1>
        </div>
      )}
    </section>
  );
};
