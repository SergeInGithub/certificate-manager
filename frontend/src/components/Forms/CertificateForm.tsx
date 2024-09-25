import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useEffect,
} from 'react';
import '../../assets/styles/components/certificateForm.css';
import { Input } from '@components/Input';
import { Label } from '@components/Label';
import { Select } from '@components/Select';
import { Button } from '@components/Button';
import { SvgComponentType, SvgComponent } from '@components/Svg';
import {
  CertificateFormValues,
  CertificateType,
  TCertificate,
  TSupplier,
  TUserApplicant,
} from '@types';
import { addCertificate, editCertificate } from '@utils';
import { SupplierLookupModal, UserLookupModal } from '@components/Modals';
import { useLanguage } from '@hooks';
import { UserLookupTable } from '@components/Tables';

const defaultFormData: TCertificate = {
  dateFrom: null,
  dateTo: null,
  certificateType: undefined,
  supplier: null,
  pdfDataUrl: null,
  assignedUsers: null,
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
    const { translations } = useLanguage();

    const [formData, setFormData] = useState<TCertificate>(defaultFormData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    const [selectedApplicants, setSelectedApplicants] = useState<
      TUserApplicant[]
    >([]);
    const [selectedSuppliers, setSelectedSuppliers] =
      useState<TSupplier | null>(null);

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
          assignedUsers: values.assignedUsers,
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

    const handleSupplierSelect = useCallback((supplier: TSupplier) => {
      setFormData((prev) => ({
        ...prev,
        supplier: supplier,
      }));
      setSelectedSuppliers(supplier);
      setIsModalOpen(false);
    }, []);

    const handleSubmit = useCallback(
      async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        formData.pdfDataUrl = pdfDataUrl;

        try {
          if (isEdit && certificateId) {
            await editCertificate('CertificateDb', 1, certificateId, formData);
          } else {
            await addCertificate('CertificateDb', 1, formData);
          }
          if (formRef.current) {
            formRef.current.reset();
          }
          setFormData(defaultFormData);
          setSelectedApplicants([]);
          setSelectedSuppliers(null);
          if (onReset) {
            onReset();
          }
        } catch (error) {
          console.error('Error adding/editing certificate:', error);
        }
      },
      [formData, pdfDataUrl, isEdit, certificateId, onReset],
    );

    const openModal = () => {
      setIsModalOpen(true);
    };

    const openUserModal = useCallback(() => {
      setIsUserModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
      setIsModalOpen(false);
      setSelectedSuppliers(null);
    }, []);

    const closeUserModal = useCallback(() => setIsUserModalOpen(false), []);

    const cancelSelections = useCallback(() => {
      setSelectedApplicants([]);
    }, []);

    const handleSupplierReset = () => {
      setFormData((prev) => ({
        ...prev,
        supplier: null,
      }));
    };

    const handleApplicantSelection = (applicant: TUserApplicant) => {
      setSelectedApplicants((prevSelected) => {
        const isSelected = prevSelected.some(
          (selected) => selected.id === applicant.id,
        );
        return isSelected
          ? prevSelected.filter((selected) => selected.id !== applicant.id)
          : [...prevSelected, applicant];
      });
    };

    useEffect(() => {
      setFormData((prev) => ({
        ...prev,
        assignedUsers: selectedApplicants,
      }));
    }, [selectedApplicants]);

    useEffect(() => {
      if (isEdit && formData.assignedUsers) {
        setSelectedApplicants(formData.assignedUsers);
      }
    }, [isEdit, formData.assignedUsers]);

    return (
      <React.Fragment>
        <form
          className="certificate-form"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="label-input-container">
            <Label className="supplier-label">{translations.supplier}</Label>
            <Input
              type="text"
              className="supplier-input"
              value={formData.supplier?.supplierName || ''}
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
                onClick={handleSupplierReset}
              >
                <SvgComponent
                  type={SvgComponentType.CLOSE}
                  className="close-icon"
                />
              </Button>
            </div>
          </div>

          <div className="label-input-container">
            <Label className="certificate-type-label">
              {translations.certificateType}
            </Label>

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
            <Label className="valid-from-label">{translations.validFrom}</Label>
            <Input
              ref={dateFromRef}
              type="text"
              value={
                formData.dateFrom
                  ? formData.dateFrom.toISOString().split('T')[0]
                  : ''
              }
              onChange={handleChangeFrom}
              placeholder={translations.selectDatePlaceholder}
              onFocus={handleFocusFrom}
              onBlur={handleBlurFrom}
              className="valid-from-input"
            />
          </div>

          <div className="label-input-container">
            <Label className="valid-to-label">{translations.validTo}</Label>
            <Input
              ref={dateToRef}
              type="text"
              value={
                formData.dateTo
                  ? formData.dateTo.toISOString().split('T')[0]
                  : ''
              }
              onChange={handleChangeTo}
              placeholder={translations.selectDatePlaceholder}
              onFocus={handleFocusTo}
              onBlur={handleBlurTo}
              className="valid-to-input"
            />
          </div>

          <section className="participants-section">
            <div>
              <Label className="valid-to-label">
                {translations.assignedUsers}
              </Label>
              <Button
                type="button"
                className="search-participant-button"
                onClick={openUserModal}
              >
                <SvgComponent
                  type={SvgComponentType.SEARCH}
                  className="search-icon"
                />
                <h5 className="add-participant">
                  {translations.addParticipant}
                </h5>
              </Button>
            </div>

            <UserLookupTable
              selectedApplicants={selectedApplicants}
              handleApplicantSelection={handleApplicantSelection}
              selectedItems={selectedApplicants}
            />
          </section>
        </form>
        <SupplierLookupModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSelectSupplier={handleSupplierSelect}
        />
        <UserLookupModal
          isOpen={isUserModalOpen}
          onClose={closeUserModal}
          selectedItems={selectedApplicants}
          setSelectedItems={setSelectedApplicants}
          cancelSelections={cancelSelections}
        />
      </React.Fragment>
    );
  },
);
