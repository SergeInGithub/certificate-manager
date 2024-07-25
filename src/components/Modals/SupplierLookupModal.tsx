import React, { useEffect, useState } from 'react';
import { LookupModal } from './LookupModal';
import { addSuppliers, fetchSuppliers } from '@utils';
import { hardcodedSuppliers } from '@data';
import { LookupModalType, TSupplier } from '@types';
import { useLanguage } from '@hooks';

interface SupplierLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSupplierName: string;
  selectedItems: any;
  setSelectedItems: any;
  cancelSelections: () => void;
}

export const SupplierLookupModal: React.FC<SupplierLookupModalProps> = ({
  isOpen,
  onClose,
  initialSupplierName,
  selectedItems,
  setSelectedItems,
  cancelSelections,
}) => {
  const [name, setName] = useState(initialSupplierName);
  const [index, setIndex] = useState('');
  const [city, setCity] = useState('');
  const [suppliers, setSuppliers] = useState<TSupplier[]>([]);

  const { translations } = useLanguage();

  useEffect(() => {
    const initializeSuppliers = async () => {
      try {
        const existingSuppliers = await fetchSuppliers('myDatabase', 1);

        const existingIndexes = new Set(
          existingSuppliers.map((supplier) => supplier.supplierIndex),
        );

        const suppliersToAdd = hardcodedSuppliers.filter(
          (supplier) => !existingIndexes.has(supplier.supplierIndex),
        );

        if (suppliersToAdd.length > 0) {
          await addSuppliers('myDatabase', 1, suppliersToAdd);
        }

        const suppliersFromDB = await fetchSuppliers('myDatabase', 1);
        setSuppliers(suppliersFromDB);
      } catch (error) {
        console.error('Error in initializeSuppliers:', error);
      }
    };

    if (isOpen) {
      initializeSuppliers();
      setName(initialSupplierName);
    }
  }, [isOpen]);

  const criteria = [
    {
      id: 'supplierName',
      label: 'Supplier Name',
      value: name,
      setValue: setName,
    },
    {
      id: 'supplierIndex',
      label: 'Supplier Index',
      value: index,
      setValue: setIndex,
    },
    { id: 'city', label: 'City', value: city, setValue: setCity },
  ];

  return (
    <LookupModal
      isOpen={isOpen}
      onClose={onClose}
      title={translations.searchForSuppliers}
      criteria={criteria}
      suppliers={suppliers}
      modalType={LookupModalType.SUPPLIER_LOOKUP}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      cancelSelections={cancelSelections}
    />
  );
};
