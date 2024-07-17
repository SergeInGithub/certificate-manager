import React from 'react';
import { CertificateRow } from './CertificateRow';
import { CertificateTableProps } from './Table';

export const TableBody: React.FC<CertificateTableProps> = ({
  certificates,
}: CertificateTableProps) => (
  <tbody>
    {certificates?.map((certificate) => (
      <CertificateRow
        key={certificate.id}
        certificate={certificate}
      />
    ))}
  </tbody>
);
