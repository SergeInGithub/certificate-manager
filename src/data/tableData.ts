import { TCertificate, TableHeaderItem } from '@types';

export const tableHeaderItems: TableHeaderItem[] = [
  { id: 'supplier', label: 'Supplier' },
  { id: 'type', label: 'Certificate type' },
  { id: 'validFrom', label: 'Valid from' },
  { id: 'validTo', label: 'Valid to' },
];

export const certificates: TCertificate[] = [
  {
    id: 1,
    supplier: 'DAIMLER AG, 1, Berlin',
    certificateType: 'Permission of Printing',
    validFrom: '21.08.2017',
    validTo: '26.08.2017',
  },
  {
    id: 2,
    supplier: 'ANDEMIS GmbH, 1, Stuttgart',
    certificateType: 'OHSAS 18001',
    validFrom: '18.08.2017',
    validTo: '24.08.2017',
  },
  {
    id: 2,
    supplier: 'ANDEMIS GmbH, 1, Stuttgart',
    certificateType: 'Permission of Printing',
    validFrom: '04.10.2017',
    validTo: '10.10.2017',
  },
];
