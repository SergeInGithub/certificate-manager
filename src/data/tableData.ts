import {
  CertificateType,
  TCertificate,
  TSupplier,
  TUserApplicant,
  TableHeaderItem,
} from '@types';
import { parseCertificate } from '@utils';

export const tableHeaderItems: TableHeaderItem[] = [
  { id: 'editAndDelete', label: '' },
  { id: 'supplier', label: 'Supplier' },
  { id: 'certificateType', label: 'Certificate type' },
  { id: 'validFrom', label: 'Valid from' },
  { id: 'validTo', label: 'Valid to' },
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

export const SupplierLookupTableHeaderItems: TableHeaderItem[] = [
  { id: 'editAndDelete', label: '' },
  { id: 'supplierName', label: 'Supplier name' },
  { id: 'supplierIndex', label: 'Supplier index' },
  { id: 'city', label: 'City' },
];

export const hardcodedSuppliers: TSupplier[] = [
  {
    supplierName: 'ANDEMIS GmbH',
    supplierIndex: 1,
    city: 'Stuttgart',
  },
  {
    supplierName: 'DAIMLER AG',
    supplierIndex: 2,
    city: 'Berlin',
  },
  {
    supplierName: 'ANDEMIS GmbH',
    supplierIndex: 3,
    city: 'Stuttgart',
  },
  {
    supplierName: 'ANDEMIS GmbH',
    supplierIndex: 4,
    city: 'Stuttgart',
  },
];

export const userLookupTableHeaderItems: TableHeaderItem[] = [
  { id: 'editAndDelete', label: '' },
  { id: 'userLookupName', label: 'Name' },
  { id: 'userLookupFirstName', label: 'First name' },
  { id: 'userLookupId', label: 'User ID' },
  { id: 'userLookupDepartment', label: 'Department' },
  { id: 'userLookupPlant', label: 'Plant' },
];

export const hardcodedUserApplicants: TUserApplicant[] = [
  {
    userLookupName: 'Simon',
    userLookupFirstName: 'Zwolfer',
    userLookupId: 'ZWOELF',
    userLookupDepartment: 'ITM/FP',
    userLookupPlant: '096',
  },
  {
    userLookupName: 'Wolfgang',
    userLookupFirstName: 'Tony',
    userLookupId: 'WOLFST',
    userLookupDepartment: 'ITM/FP',
    userLookupPlant: '094',
  },
  {
    userLookupName: 'Peter',
    userLookupFirstName: 'Stark',
    userLookupId: 'WOLFST',
    userLookupDepartment: 'ITM/FP',
    userLookupPlant: '095',
  },

  {
    userLookupName: 'John',
    userLookupFirstName: 'Stark',
    userLookupId: 'WOLFST',
    userLookupDepartment: 'ITM/FP',
    userLookupPlant: '093',
  },
];
