import { TCertificate } from '@types';
import React from 'react';

interface ICertificateRowProps {
  certificate: TCertificate;
}

export const CertificateRow: React.FC<ICertificateRowProps> = ({
  certificate,
}) => (
  <tr>
    <td>{certificate.supplier}</td>
    <td>{certificate.certificateType}</td>
    <td>{certificate.validFrom}</td>
    <td>{certificate.validTo}</td>
  </tr>
);
