import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { SvgComponent, SvgComponentType } from '../Svg';
import { LookupHeader } from '../LookupHeader';
import { Input } from '../Input';
import { Label } from '../Label';
import '../../assets/styles/components/lookupModal.css';
import { useLanguage } from '@hooks';
import { LookupTable } from '@components/Tables';
import {
  LookupModalProps,
  LookupModalType,
  TSupplier,
  TUserApplicant,
} from '@types';

export const LookupModal: React.FC<LookupModalProps> = ({
  isOpen,
  onClose,
  title,
  criteria,
  suppliers,
  users,
  modalType,
  selectedItems,
  setSelectedItems,
  cancelSelections,
}) => {
  const { translations } = useLanguage();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState<
    TUserApplicant[] | TSupplier[]
  >([]);

  useEffect(() => {
    const initializeItems = () => {
      if (suppliers || users) {
        const initialItems = suppliers || users;
        setItems(initialItems);
        setFilteredItems(initialItems);
      }
    };

    if (isOpen) {
      initializeItems();
    }
  }, [isOpen, suppliers, users]);

  if (!isOpen) return null;

  const handleSearch = () => {
    const filtered = items.filter((item) => {
      return criteria.every((criterion, index) => {
        const itemValue =
          Object.values(item)[index]?.toString().toLowerCase() || '';
        return itemValue.includes(criterion.value.toLowerCase());
      });
    });

    setFilteredItems(filtered);
  };

  const handleReset = () => {
    criteria.forEach((criterion) => criterion.setValue(''));
    setFilteredItems(items);
    setSelectedItems([]);
  };

  const handleSelection = (item: any) => {
    setSelectedItems((prevSelectedItems: any[]) => {
      const isSelected = prevSelectedItems.some(
        (selectedItem: { id: any }) => selectedItem.id === item.id,
      );
      if (isSelected) {
        return prevSelectedItems.filter(
          (selectedItem: { id: any }) => selectedItem.id !== item.id,
        );
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const handleSelectButtonClick = () => {
    console.log('Selected Items: 🟡', selectedItems);
    setSelectedItems(selectedItems);
    onClose();
  };

  return (
    <div className="lookup-modal">
      <div className="lookup-modal-content">
        <section className="lookup-modal-header-section">
          <h6 className="lookup-modal-header">{title}</h6>
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

        <section
          className={`${modalType === LookupModalType.SUPPLIER_LOOKUP ? 'search-criteria-container' : 'user-search-criteria-container'}`}
        >
          <LookupHeader heading={translations.searchCriteria} />
          <section
            className={`${modalType === LookupModalType.SUPPLIER_LOOKUP ? 'inputs-container' : 'user-inputs-container'}`}
          >
            {criteria.map((criterion, index) => (
              <div
                className="lookup-label-input-container"
                key={index}
              >
                <Label
                  children={translations[criterion.id]}
                  className="supplier-label"
                />
                <Input
                  type="text"
                  value={criterion.value}
                  onChange={(e) => criterion.setValue(e.target.value)}
                  className="supplier-input"
                />
              </div>
            ))}
          </section>
          <section
            className={`${modalType === LookupModalType.SUPPLIER_LOOKUP ? 'search-criteria-button-section' : 'user-search-criteria-button-section'}`}
          >
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

        <section className="list-container">
          <LookupHeader
            heading={
              modalType === LookupModalType.SUPPLIER_LOOKUP
                ? translations.supplierList
                : translations.personList
            }
          />
          <section className="list-table-container">
            <LookupTable
              items={filteredItems}
              modalType={modalType}
              handleSelection={handleSelection}
              selectedItems={selectedItems}
            />
          </section>
          <section
            className={`${modalType === LookupModalType.SUPPLIER_LOOKUP ? 'search-criteria-button-section' : 'user-search-criteria-button-section'}`}
          >
            <Button
              type="button"
              onClick={handleSelectButtonClick}
              children={translations.selectButton}
              className="lookup-save-button"
            />
            <Button
              type="button"
              children={translations.cancelButton}
              className="lookup-cancel-button"
              onClick={cancelSelections}
            />
          </section>
        </section>
      </div>
    </div>
  );
};