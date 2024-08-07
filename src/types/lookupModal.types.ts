import { TSupplier, TUserApplicant } from './table.types';

export enum LookupModalType {
  USER_LOOKUP = 'UserLookup',
  SUPPLIER_LOOKUP = 'SupplierLookup',
}

export type LookupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  criteria: Array<{
    id: string;
    value: string;
    setValue: (value: string) => void;
  }>;
  users?: TUserApplicant[] | TSupplier[];
  modalType: LookupModalType;
  selectedItems?: TUserApplicant[] | TSupplier[];
  setSelectedItems?: React.Dispatch<React.SetStateAction<TUserApplicant[]>>;
  cancelSelections?: () => void;
  handleSelectButtonClick: () => void;
  handleApplicantSelection?: (item: TUserApplicant) => void;
  handleSupplierSelection?: (item: TSupplier) => void;
};
