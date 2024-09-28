import { LookupModalType } from './lookupModal.types';

export type TableHeaderItem = {
  id: string;
  label: string;
};

export type TComment = {
  name: string;
  comment: string;
};

export enum OldCertificateType {
  PERMISSION_OF_PRINTING = 'Permission of Printing',
  OHSAS_18001 = 'OHSAS 18001',
}

export type TCertificate = {
  id?: number;
  supplier: TSupplier | null;
  certificateType: OldCertificateType | undefined;
  dateFrom: Date | null;
  dateTo: Date | null;
  pdfDataUrl: string | null;
  assignedUsers: TUserApplicant[] | null;
  comments?: TComment[];
};

export const defaultFormData: TCertificate = {
  dateFrom: null,
  dateTo: null,
  certificateType: undefined,
  supplier: null,
  pdfDataUrl: null,
  assignedUsers: null,
  comments: [],
};

export interface CertificateFormProps {
  pdfDataUrl: string | null;
  onReset?: () => void;
  isEdit?: boolean;
  certificateId?: number;
}

export type CertificateFormValues = {
  dateFrom: string;
  dateTo: string;
  certificateType: string;
  supplier: TSupplier;
  pdfDataUrl: string;
  assignedUsers: TUserApplicant[];
  comments?: TComment[];
};

export enum CERTIFICATE_TYPE {
  PERMISSION_OF_PRINTING = 'Permission of Printing',
  OHSAS_18001 = 'OHSAS 18001',
}

export type TSupplier = {
  supplierName: string;
  supplierIndex: number;
  city: string;
};

export type TUserApplicant = {
  id?: number;
  userLookupName: string;
  userLookupFirstName: string;
  userLookupId: string;
  userLookupDepartment: string;
  userLookupPlant: string;
  userLookupEmail?: string;
};

export type TLookupTableHeader = {
  tableHeaderItems: TableHeaderItem[];
};

export type TUserLookupTableProps = {
  selectedApplicants?: TUserApplicant[];
  modalType?: LookupModalType;
  handleApplicantSelection: (item: TUserApplicant) => void;
  selectedItems?: TUserApplicant[];
};

export type TSupplierLookupTableProps = {
  selectedSuppliers?: TSupplier[];
  handleSupplierSelection: (item: TSupplier) => void;
  selectedItems?: TSupplier[];
  selectedSupplier: TSupplier;
};

export type TErrors = {
  supplier: string;
  certificateType: string;
  dateFrom: string;
  dateTo: string;
};

export const defaultErrorState: TErrors = {
  supplier: '',
  certificateType: '',
  dateFrom: '',
  dateTo: '',
};
