import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { SvgComponent, SvgComponentType } from './Svg';
import { LookupHeader } from './LookupHeader';
import { Input } from './Input';
import { Label } from './Label';
import { SupplierLookupTable } from './Tables';
import '../assets/styles/components/supplierLookupModal.css';
import { addSuppliers, fetchSuppliers } from '@utils';
import { hardcodedSuppliers } from '@data';

interface SupplierLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSupplierName: string;
}

export const SupplierLookupModal: React.FC<SupplierLookupModalProps> = ({
  isOpen,
  onClose,
  initialSupplierName,
}) => {
  const [name, setName] = useState('');
  const [index, setIndex] = useState('');
  const [city, setCity] = useState('');
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<any[]>([]);

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
        setFilteredSuppliers(suppliersFromDB);
      } catch (error) {
        console.error('Error in initializeSuppliers:', error);
      }
    };

    if (isOpen) {
      initializeSuppliers();
      setName(initialSupplierName);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = () => {
    const filtered = suppliers.filter((supplier) => {
      return (
        supplier.supplierName.toLowerCase().includes(name.toLowerCase()) &&
        supplier.supplierIndex.toString().includes(index) &&
        supplier.city.toLowerCase().includes(city.toLowerCase())
      );
    });
    setFilteredSuppliers(filtered);
  };

  const handleReset = () => {
    setName('');
    setIndex('');
    setCity('');
    setFilteredSuppliers(suppliers);
  };

  return (
    <div className="supplier-lookup-modal">
      <div className="supplier-lookup-modal-content">
        <section className="lookup-modal-header-section">
          <h6 className="lookup-modal-header">Search for suppliers</h6>
          <Button
            type="button"
            children={
              <SvgComponent
                type={SvgComponentType.CLOSE}
                className="lookup-close-icon"
              />
            }
            className="lookup-close-button"
            onClick={onClose}
          />
        </section>

        <section className="search-criteria-container">
          <LookupHeader heading="Search criteria" />

          <section className="supplier-inputs-container">
            <div className="lookup-label-input-container">
              <Label
                children="Supplier name"
                className="supplier-label"
              />
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="supplier-input"
              />
            </div>

            <div className="lookup-label-input-container">
              <Label
                children="Supplier index"
                className="supplier-label"
              />
              <Input
                type="text"
                value={index}
                onChange={(e) => setIndex(e.target.value)}
                className="supplier-input"
              />
            </div>

            <div className="lookup-label-input-container">
              <Label
                children="City"
                className="supplier-label"
              />
              <Input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="supplier-input"
              />
            </div>
          </section>

          <section className="search-criteria-button-section">
            <Button
              type="button"
              onClick={handleSearch}
              children="Search"
              className="lookup-search-button"
            />
            <Button
              type="button"
              onClick={handleReset}
              children="Reset"
              className="lookup-reset-button"
            />
          </section>
        </section>

        <section className="supplier-list-container">
          <LookupHeader heading="Supplier list" />

          <section className="supplier-list-table-container">
            <SupplierLookupTable suppliers={filteredSuppliers} />
          </section>

          <section className="search-criteria-button-section">
            <Button
              type="button"
              children="Select"
              className="lookup-save-button"
            />
            <Button
              type="button"
              children="Cancel"
              className="lookup-cancel-button"
            />
          </section>
        </section>
      </div>
    </div>
  );
};
