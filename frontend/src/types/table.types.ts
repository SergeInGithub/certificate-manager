import { LookupModalType } from './lookupModal.types';

export type TableHeaderItem = {
  id: string;
  label: string;
};

export enum CertificateType {
  PERMISSION_OF_PRINTING = 'Permission of Printing',
  OHSAS_18001 = 'OHSAS 18001',
}

export type TCertificate = {
  id?: number;
  supplier: TSupplier | null;
  certificateType: CertificateType | undefined;
  dateFrom: Date | null;
  dateTo: Date | null;
  pdfDataUrl: string | null;
  assignedUsers: TUserApplicant[] | null;
};

export type CertificateFormValues = {
  dateFrom: string;
  dateTo: string;
  certificateType: string;
  supplier: TSupplier;
  pdfDataUrl: string;
  assignedUsers: TUserApplicant[];
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

export interface TLookupTableBody<T> {
  items?: T[];
  columns: TableHeaderItem[];
  handleSelection: (item: T) => void;
  selectedItems?: T[];
  modalType: LookupModalType | undefined;
}

export type TLookupTableRow = {
  item?: TSupplier | TUserApplicant;
  index: number;
  columns: TableHeaderItem[];
  handleSelection: (item: any) => void;
  isSelected?: boolean;
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

export interface TLookupTableBody {
  items?: TUserApplicant[] | TSupplier[];
  columns: TableHeaderItem[];
  handleSelection: (item: any) => void;
  selectedItems?: TUserApplicant[] | TSupplier[];
}
