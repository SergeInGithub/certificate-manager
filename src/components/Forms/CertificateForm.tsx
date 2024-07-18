import React, { useRef, useState } from 'react';
import '../../assets/styles/components/certificateForm.css';
import { Input } from '@components/Input';
import { Label } from '@components/Label';
import { Button } from '@components/Button';
import { SvgComponent } from '@components/Svg';
import { Select } from '@components/Select';

export const CertificateForm: React.FC = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [certificateType, setCertificateType] = useState('');
  const dateFromRef = useRef<HTMLInputElement | null>(null);
  const dateToRef = useRef<HTMLInputElement | null>(null);

  const handleFocusFrom = () => {
    if (dateFromRef.current) {
      dateFromRef.current.type = 'date';
    }
  };

  const handleBlurFrom = () => {
    if (dateFromRef.current && !dateFrom) {
      dateFromRef.current.type = 'text';
    }
  };

  const handleChangeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(e.target.value);
  };

  const handleFocusTo = () => {
    if (dateToRef.current) {
      dateToRef.current.type = 'date';
    }
  };

  const handleBlurTo = () => {
    if (dateToRef.current && !dateTo) {
      dateToRef.current.type = 'text';
    }
  };

  const handleChangeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(e.target.value);
  };

  const handleChangeCertificateType = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCertificateType(e.target.value);
  };

  const certificateOptions = [
    { value: '', label: 'Select your option', isPlaceholder: true },
    { value: 'cert1', label: 'Certificate 1' },
    { value: 'cert2', label: 'Certificate 2' },
    { value: 'cert3', label: 'Certificate 3' },
  ];

  return (
    <form className="certificate-form">
      <div className="label-input-container">
        <Label
          children="Supplier"
          className="supplier-label"
        />
        <Input
          type="text"
          className="supplier-input"
        />

        <div className="input-buttons">
          <Button
            type="button"
            children={
              <SvgComponent
                type="search"
                className="search-icon"
              />
            }
            className="search-button"
          />
          <Button
            type="button"
            children={
              <SvgComponent
                type="close"
                className="close-icon"
              />
            }
            className="close-button"
          />
        </div>
      </div>

      <div className="label-input-container">
        <Label
          children="Certificate type"
          className="certificate-type-label"
        />

        <div className="custom-select-container">
          <Select
            options={certificateOptions}
            className="certificate-type-select"
            placeholder="Select your option"
            value={certificateType}
            onChange={handleChangeCertificateType}
          />
          <div className="custom-select-icon">
            <SvgComponent
              type="selectDownArrow"
              className="custom-select-arrow-icon"
            />
          </div>
        </div>
      </div>

      <div className="label-input-container">
        <Label
          children="Valid from"
          className="valid-from-label"
        />
        <Input
          ref={dateFromRef}
          type="text"
          value={dateFrom}
          onChange={handleChangeFrom}
          placeholder="Click to select date"
          onFocus={handleFocusFrom}
          onBlur={handleBlurFrom}
          className="valid-from-input"
        />
      </div>

      <div className="label-input-container">
        <Label
          children="Valid to"
          className="valid-to-label"
        />
        <Input
          ref={dateToRef}
          type="text"
          value={dateTo}
          onChange={handleChangeTo}
          placeholder="Click to select date"
          onFocus={handleFocusTo}
          onBlur={handleBlurTo}
          className="valid-to-input"
        />
      </div>
    </form>
  );
};
