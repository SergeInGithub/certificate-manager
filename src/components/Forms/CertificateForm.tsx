import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import '../../assets/styles/components/certificateForm.css';
import { Input } from '@components/Input';
import { Label } from '@components/Label';
import { Select } from '@components/Select';
import { Button } from '@components/Button';
import { SvgComponentType, SvgComponent } from '@components/Svg';
import { CertificateFormValues, CertificateType, TCertificate } from '@types';
import { addCertificate, editCertificate } from '@utils';

const defaultFormData: TCertificate = {
  dateFrom: null,
  dateTo: null,
  certificateType: undefined,
  supplier: '',
  pdfDataUrl: null,
};

interface CertificateFormProps {
  pdfDataUrl: string | null;
  onReset?: () => void;
  isEdit?: boolean;
  certificateId?: number;
}

export const CertificateForm = forwardRef(
  (
    { pdfDataUrl, onReset, isEdit, certificateId }: CertificateFormProps,
    ref,
  ) => {
    const [formData, setFormData] = useState<TCertificate>(defaultFormData);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setFormData(defaultFormData);
        if (onReset) {
          onReset();
        }
      },
      setValues: (values: CertificateFormValues) => {
        setFormData({
          dateFrom: values.dateFrom ? new Date(values.dateFrom) : null,
          dateTo: values.dateTo ? new Date(values.dateTo) : null,
          certificateType: values.certificateType as CertificateType,
          supplier: values.supplier,
          pdfDataUrl: pdfDataUrl || null,
        });
      },
    }));

    const handleFocusFrom = useCallback(() => {
      if (dateFromRef.current) {
        dateFromRef.current.type = 'date';
      }
    }, []);

    const handleBlurFrom = useCallback(() => {
      if (dateFromRef.current && !formData.dateFrom) {
        dateFromRef.current.type = 'text';
      }
    }, [formData.dateFrom]);

    const handleChangeFrom = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          dateFrom: e.target.value ? new Date(e.target.value) : null,
        }));
      },
      [],
    );

    const handleFocusTo = useCallback(() => {
      if (dateToRef.current) {
        dateToRef.current.type = 'date';
      }
    }, []);

    const handleBlurTo = useCallback(() => {
      if (dateToRef.current && !formData.dateTo) {
        dateToRef.current.type = 'text';
      }
    }, [formData.dateTo]);

    const handleChangeTo = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          dateTo: e.target.value ? new Date(e.target.value) : null,
        }));
      },
      [],
    );

    const handleChangeCertificateType = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as CertificateType;
        setFormData((prev) => ({
          ...prev,
          certificateType: selectedValue,
        }));
      },
      [],
    );

    const handleChangeSupplier = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          supplier: e.target.value,
        }));
      },
      [],
    );

    const handleSubmit = useCallback(
      async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        formData.pdfDataUrl = pdfDataUrl;

        try {
          if (isEdit && certificateId) {
            await editCertificate('CertificatesDB', 1, certificateId, formData);
          } else {
            await addCertificate('CertificatesDB', 1, formData);
          }
          if (formRef.current) {
            formRef.current.reset();
          }
          setFormData(defaultFormData);
          if (onReset) {
            onReset();
          }
        } catch (error) {
          console.error('Error adding/editing certificate:', error);
        }
      },
      [formData, pdfDataUrl, isEdit, certificateId, onReset],
    );

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
      <React.Fragment>
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
              value={formData.supplier}
              onChange={handleChangeSupplier}
            />

            <div className="input-buttons">
              <Button
                type="button"
                className="search-button"
                onClick={openModal}
              >
                <SvgComponent
                  type={SvgComponentType.SEARCH}
                  className="search-icon"
                />
              </Button>
              <Button
                type="button"
                className="close-button"
              >
                <SvgComponent
                  type={SvgComponentType.CLOSE}
                  className="close-icon"
                />
              </Button>
            </div>
          </div>

          <div className="label-input-container">
            <Label
              children="Certificate type"
              className="certificate-type-label"
            />

            <div className="custom-select-container">
              <Select
                options={Object.values(CertificateType)}
                className="certificate-type-select"
                placeholder="Select your option"
                value={formData.certificateType}
                onChange={handleChangeCertificateType}
              />
              <div className="custom-select-icon">
                <SvgComponent
                  type={SvgComponentType.SELECTED_DOWN_ARROW}
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
              value={
                formData.dateFrom
                  ? formData.dateFrom.toISOString().split('T')[0]
                  : ''
              }
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
              value={
                formData.dateTo
                  ? formData.dateTo.toISOString().split('T')[0]
                  : ''
              }
              onChange={handleChangeTo}
              placeholder="Click to select date"
              onFocus={handleFocusTo}
              onBlur={handleBlurTo}
              className="valid-to-input"
            />
          </div>
        </form>
        <SupplierLookupModal
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </React.Fragment>
    );
  },
);
