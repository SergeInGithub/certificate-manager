import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import '../../assets/styles/components/certificateForm.css';
import { Input } from '@components/Input';
import { Label } from '@components/Label';
import { Select } from '@components/Select';
import { Button } from '@components/Button';
import { SvgComponent } from '@components/Svg';
import { CERTIFICATE_TYPE } from '@types';

interface CertificateFormProps {
  pdfDataUrl: string | null;
  onReset?: () => void;
}

export const CertificateForm = forwardRef(
  ({ pdfDataUrl, onReset }: CertificateFormProps, ref) => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [certificateType, setCertificateType] = useState('');
    const [supplier, setSupplier] = useState('');

    const dateFromRef = useRef<HTMLInputElement | null>(null);
    const dateToRef = useRef<HTMLInputElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);

    useImperativeHandle(ref, () => ({
      submit: () => {
        if (formRef.current) {
          formRef.current.dispatchEvent(
            new Event('submit', { cancelable: true, bubbles: true }),
          );
        }
      },
      reset: () => {
        setDateFrom('');
        setDateTo('');
        setCertificateType('');
        setSupplier('');
        if (onReset) {
          onReset();
        }
      },
    }));

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

    const handleChangeSupplier = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSupplier(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = {
        supplier,
        certificateType,
        dateFrom,
        dateTo,
        // pdfDataUrl,
      };
      const storedData = JSON.parse(localStorage.getItem('formData') || '[]');
      storedData.push(formData);
      localStorage.setItem('formData', JSON.stringify(storedData));
      console.log(formData);
      if (formRef.current) {
        formRef.current.reset();
      }
      setDateFrom('');
      setDateTo('');
      setCertificateType('');
      setSupplier('');
      if (onReset) {
        onReset();
      }
    };

    return (
      <form
        className="certificate-form"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="label-input-container">
          <Label
            children="Supplier"
            className="supplier-label"
          />
          <Input
            type="text"
            className="supplier-input"
            value={supplier}
            onChange={handleChangeSupplier}
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
              options={CERTIFICATE_TYPE}
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
  },
);
