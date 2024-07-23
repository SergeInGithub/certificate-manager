import React from 'react';
import { Button } from './Button';
import { SvgComponent } from './Svg';
import { LookupHeader } from './LookupHeader';
import { Input } from './Input';
import { Label } from './Label';
import { SupplierLookupTable } from './Tables';
import { suppliers } from '@data';
import '../assets/styles/components/supplierLookupModal.css';

interface SupplierLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupplierLookupModal: React.FC<SupplierLookupModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="supplier-lookup-modal">
      <div className="supplier-lookup-modal-content">
        <section className="lookup-modal-header-section">
          <h6 className="lookup-modal-header">Search for suppliers</h6>
          <Button
            type="button"
            children={
              <SvgComponent
                type="close"
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
                className="supplier-input"
              />
            </div>
          </section>

          <section className="search-criteria-button-section">
            <Button
              type="button"
              children="Search"
              className="lookup-search-button"
            />
            <Button
              type="button"
              children="Reset"
              className="lookup-reset-button"
            />
          </section>
        </section>

        <section className="supplier-list-container">
          <LookupHeader heading="Supplier list" />

          <section className="supplier-list-table-container">
            <SupplierLookupTable suppliers={suppliers} />
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
