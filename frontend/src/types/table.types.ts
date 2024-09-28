import { CertificateDto, UserDto } from './certificate.types';
import { LookupModalType } from './lookupModal.types';

export type TableHeaderItem = {
  id: string;
  label: string;
};

export type TComment = {
  name: string;
  comment: string;
};

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

export const defaultFormData: CertificateDto = {
  id: 0,
  type: OldCertificateType.OHSAS_18001,
  validFrom: new Date(),
  validTo: new Date(),
  supplier: {
    id: 0,
    name: '',
    supplierIndex: '',
    city: '',
  },
  fileUrl: '',
  assignedUserIds: [],
  comments: [],
};
export interface CertificateFormProps {
  pdfDataUrl: string | '';
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
  selectedApplicants?: UserDto[];
  modalType?: LookupModalType;
  handleApplicantSelection: (item: UserDto) => void;
  selectedItems?: UserDto[];
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
