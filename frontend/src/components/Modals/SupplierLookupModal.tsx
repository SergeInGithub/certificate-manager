import React, { useEffect, useState } from 'react';
import { LookupModal } from './LookupModal';
import { LookupModalType, SupplierDto } from '@types';
import { useLanguage } from '@hooks';

interface SupplierLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSupplier: (supplier: SupplierDto) => void;
  selectedSupplier: SupplierDto | null;
  setSelectedSupplier: React.Dispatch<React.SetStateAction<SupplierDto | null>>;
}

export const SupplierLookupModal: React.FC<SupplierLookupModalProps> = ({
  isOpen,
  onClose,
  onSelectSupplier,
  selectedSupplier,
  setSelectedSupplier,
}) => {
  const [name, setName] = useState('');
  const [index, setIndex] = useState('');
  const [city, setCity] = useState('');
  const { translations } = useLanguage();

  const criteria = [
    {
      id: 'name',
      value: name,
      setValue: setName,
    },
    {
      id: 'supplierIndex',
      value: index,
      setValue: setIndex,
    },
    {
      id: 'city',
      value: city,
      setValue: setCity,
    },
  ];

  const handleSelectButtonClick = () => {
    if (selectedSupplier) {
      onSelectSupplier(selectedSupplier);
      onClose();
    }
  };

  const handleSelection = (supplier: SupplierDto) => {
    setSelectedSupplier(supplier);
  };

  return (
    <LookupModal
      isOpen={isOpen}
      onClose={onClose}
      title={translations.searchForSuppliers}
      criteria={criteria}
      modalType={LookupModalType.SUPPLIER_LOOKUP}
      handleSelectButtonClick={handleSelectButtonClick}
      handleSupplierSelection={handleSelection}
      selectedItems={selectedSupplier ? [selectedSupplier] : []}
      cancelSelections={() => setSelectedSupplier(null)}
    />
  );
};
