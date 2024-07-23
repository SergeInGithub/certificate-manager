import React from 'react';
import { useFormatDate } from '@hooks';
import { TCertificate } from '@types';

interface ICertificateRowProps {
  certificate: TCertificate;
}

export const CertificateRow: React.FC<ICertificateRowProps> = ({
  certificate,
}) => {
  const formatDate = useFormatDate();

  return (
    <tr>
      <td>{certificate.supplier}</td>
      <td>{certificate.certificateType}</td>
      <td>{formatDate(certificate.dateFrom)}</td>
      <td>{formatDate(certificate.dateTo)}</td>
    </tr>
  );
};
