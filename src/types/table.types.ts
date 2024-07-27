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
};

export type CertificateFormValues = {
  dateFrom: string;
  dateTo: string;
  certificateType: string;
  supplier: TSupplier;
  pdfDataUrl: string;
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
export enum LanguageOptions {
  ENGLISH = 'English',
  GERMAN = 'German',
}

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

export interface TLookupTableBody {
  items?: TUserApplicant[] | TSupplier[];
  columns: TableHeaderItem[];
  handleSelection: (item: any) => void;
  selectedItems?: TUserApplicant[] | TSupplier[];
}

export type TLookupTableRow = {
  item?: TSupplier | TUserApplicant;
  index: number;
  columns: TableHeaderItem[];
  handleSelection: (item: any) => void;
  isSelected?: boolean;
};

export type TLookupTableProps = {
  items?: TSupplier[] | TUserApplicant[];
  modalType?: LookupModalType;
  handleSelection: (item: TUserApplicant | TSupplier) => void;
  selectedItems?: TUserApplicant[] | TSupplier[];
};
