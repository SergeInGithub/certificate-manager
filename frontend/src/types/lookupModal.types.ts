import { SupplierDto, UserDto } from './certificate.types';
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
  users?: UserDto[] | SupplierDto[];
  modalType: LookupModalType;
  selectedItems?: UserDto[] | SupplierDto[];
  setSelectedItems?: React.Dispatch<React.SetStateAction<UserDto[]>>;
  cancelSelections?: () => void;
  handleSelectButtonClick: () => void;
  handleApplicantSelection?: (item: UserDto) => void;
  handleSupplierSelection?: (item: SupplierDto) => void;
};
