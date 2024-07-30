import React from 'react';
import { CertificateRow } from './CertificateRow';
import { CertificateTableProps } from './CertificateTable';

export const TableBody: React.FC<CertificateTableProps> = ({
  certificates,
  onDelete,
}) => (
  <tbody>
    {certificates?.map((certificate, index) => (
      <CertificateRow
        key={certificate.id}
        certificate={certificate}
        isLastRow={index === certificates.length - 1}
        onDelete={onDelete}
      />
    ))}
  </tbody>
);
