import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { SvgComponent, SvgComponentType } from './Svg';
import { LookupHeader } from './LookupHeader';
import { Input } from './Input';
import { Label } from './Label';
import { SupplierLookupTable } from './Tables';
import '../assets/styles/components/supplierLookupModal.css';
import { initializeSuppliers, searchSuppliers } from '@utils';
import { TSupplier } from '@types';
import { hardcodedSuppliers } from '@data';
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
  const { translations } = useLanguage();

  const [name, setName] = useState('');
  const [index, setIndex] = useState('');
  const [city, setCity] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState<TSupplier[]>([]);
  const [selectedItem, setSelectedItem] = useState<TSupplier | null>(null);

  useEffect(() => {
    if (isOpen) {
      initializeSuppliers('CertificateDb', 1, hardcodedSuppliers);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = async () => {
    const filtered = await searchSuppliers(
      'CertificateDb',
      1,
      name,
      index,
      city,
    );
    setFilteredSuppliers(filtered);
  };

  const handleReset = () => {
    setName('');
    setIndex('');
    setCity('');
    setSelectedItem(null);
  };

  const handleSelection = (supplier: TSupplier) => {
    setSelectedItem(supplier);
  };

  const handleSelectButtonClick = () => {
    if (selectedItem) {
      onSelectSupplier(selectedItem);
      onClose();
    }
  };

  return (
    <div className="supplier-lookup-modal">
      <div className="supplier-lookup-modal-content">
        <section className="lookup-modal-header-section">
          <h6 className="lookup-modal-header">
            {translations.searchForSuppliers}
          </h6>
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
          <LookupHeader heading={translations.searchCriteria} />

          <section className="supplier-inputs-container">
            <div className="lookup-label-input-container">
              <Label
                children={translations.supplierName}
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
                children={translations.supplierIndex}
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
                children={translations.city}
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
              children={translations.searchButton}
              className="lookup-search-button"
            />
            <Button
              type="button"
              onClick={handleReset}
              children={translations.resetButton}
              className="lookup-reset-button"
            />
          </section>
        </section>

        <section className="supplier-list-container">
          <LookupHeader heading={translations.supplierList} />

          <section className="supplier-list-table-container">
            <SupplierLookupTable
              suppliers={filteredSuppliers}
              handleSelection={handleSelection}
              selectedItem={selectedItem}
            />
          </section>

          <section className="search-criteria-button-section">
            <Button
              type="button"
              onClick={handleSelectButtonClick}
              children="Select"
              className="lookup-save-button"
            />
            <Button
              type="button"
              onClick={onClose}
              children={translations.cancelButton}
              className="lookup-cancel-button"
            />
          </section>
        </section>
      </div>
    </div>
  );
};
