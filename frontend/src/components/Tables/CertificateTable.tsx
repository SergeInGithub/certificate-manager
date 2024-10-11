import React from 'react';
import { CertificateDto } from '@types';
import TableHeader from './TableHeader';
import { TableBody } from './TableBody';
import '../../assets/styles/components/table.css';
import { useLanguage } from '@hooks';

export type CertificateTableProps = {
  certificates: CertificateDto[] | undefined;
  onDelete: (id: number) => void;
};

export const CertificateTable: React.FC<CertificateTableProps> = ({
  certificates,
  onDelete,
}) => {
  const { translations } = useLanguage();

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
          <h1>{translations.noCertificates}</h1>
        </div>
      )}
    </section>
  );
};
