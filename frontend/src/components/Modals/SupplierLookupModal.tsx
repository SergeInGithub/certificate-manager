import React, { useEffect, useState } from 'react';
import { LookupModal } from './LookupModal';
import { initializeSuppliers } from '@utils';
import { hardcodedSuppliers } from '@data';
import { LookupModalType, SupplierDto } from '@types';
import { useLanguage } from '@hooks';

interface SupplierLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSupplier: (supplier: SupplierDto) => void;
}

export const SupplierLookupModal: React.FC<SupplierLookupModalProps> = ({
  isOpen,
  onClose,
  onSelectSupplier,
}) => {
  const [name, setName] = useState('');
  const [index, setIndex] = useState('');
  const [city, setCity] = useState('');
  const [selectedItem, setSelectedItem] = useState<SupplierDto | null>(null);

  const { translations } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      initializeSuppliers('CertificateDb', 1, hardcodedSuppliers);
    }
  }, [isOpen]);

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
    if (selectedItem) {
      onSelectSupplier(selectedItem);
      onClose();
    }
  };

  const handleSelection = (supplier: SupplierDto) => {
    setSelectedItem(supplier);
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
      selectedItems={selectedItem ? [selectedItem] : []}
      cancelSelections={() => setSelectedItem(null)}
    />
  );
};
