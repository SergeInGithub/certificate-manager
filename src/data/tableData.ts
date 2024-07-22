import { CertificateType, TCertificate, TableHeaderItem } from '@types';
import { parseCertificate } from '@utils';

export const tableHeaderItems: TableHeaderItem[] = [
  { id: 'editAndDelete', label: '' },
  { id: 'supplier', label: 'Supplier' },
  { id: 'type', label: 'Certificate type' },
  { id: 'dateFrom', label: 'Valid from' },
  { id: 'dateTo', label: 'Valid to' },
];

export const certificates: TCertificate[] = [
  parseCertificate({
    id: 1,
    supplier: 'DAIMLER AG, 1, Berlin',
    certificateType: CertificateType.PERMISSION_OF_PRINTING,
    dateFrom: '2017-08-21',
    dateTo: '2017-08-26',
  }),
  parseCertificate({
    id: 2,
    supplier: 'ANDEMIS GmbH, 1, Stuttgart',
    certificateType: CertificateType.OHSAS_18001,
    dateFrom: '2017-08-18',
    dateTo: '2017-08-24',
  }),
  parseCertificate({
    id: 2,
    supplier: 'ANDEMIS GmbH, 1, Stuttgart',
    certificateType: CertificateType.PERMISSION_OF_PRINTING,
    dateFrom: '2017-10-04',
    dateTo: '2017-10-10',
  }),
];
