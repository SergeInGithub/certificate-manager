import React, { useEffect, useState } from 'react';
import { LookupModal } from './LookupModal';
import { initializeSuppliers } from '@utils';
import { hardcodedSuppliers } from '@data';
import { LookupModalType, TSupplier } from '@types';
import { useLanguage } from '@hooks';

interface SupplierLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSupplier: (supplier: TSupplier) => void;
}

export const SupplierLookupModal: React.FC<SupplierLookupModalProps> = ({
  isOpen,
  onClose,
  onSelectSupplier,
}) => {
  const [name, setName] = useState('');
  const [index, setIndex] = useState('');
  const [city, setCity] = useState('');
  const [selectedItem, setSelectedItem] = useState<TSupplier | null>(null);

  const { translations } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      initializeSuppliers('CertificateDb', 1, hardcodedSuppliers);
    }
  }, [isOpen]);

  const criteria = [
    {
      id: 'supplierName',
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

  const handleSelection = (supplier: TSupplier) => {
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
