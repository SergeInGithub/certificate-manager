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
    label: string;
    value: string;
    setValue: (value: string) => void;
  }>;
  suppliers?: any;
  users?: any;
  modalType: LookupModalType;
  selectedItems?: any;
  setSelectedItems?: any;
  cancelSelections?: () => void;
};
