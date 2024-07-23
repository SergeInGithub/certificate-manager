import { CERTIFICATE_TYPE, TCertificate, TableHeaderItem } from '@types';
import { parseCertificate } from '@utils';

export const tableHeaderItems: TableHeaderItem[] = [
  { id: 'supplier', label: 'Supplier' },
  { id: 'type', label: 'Certificate type' },
  { id: 'validFrom', label: 'Valid from' },
  { id: 'validTo', label: 'Valid to' },
];

export const certificates: TCertificate[] = [
  parseCertificate({
    id: 1,
    supplier: 'DAIMLER AG, 1, Berlin',
    certificateType: CERTIFICATE_TYPE.PERMISSION_OF_PRINTING,
    validFrom: '2017-08-21',
    validTo: '2017-08-26',
  }),
  parseCertificate({
    id: 2,
    supplier: 'ANDEMIS GmbH, 1, Stuttgart',
    certificateType: CERTIFICATE_TYPE.OHSAS_18001,
    validFrom: '2017-08-18',
    validTo: '2017-08-24',
  }),
  parseCertificate({
    id: 2,
    supplier: 'ANDEMIS GmbH, 1, Stuttgart',
    certificateType: CERTIFICATE_TYPE.PERMISSION_OF_PRINTING,
    validFrom: '2017-10-04',
    validTo: '2017-10-10',
  }),
];
