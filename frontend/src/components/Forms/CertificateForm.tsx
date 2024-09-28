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
  CertificateFormProps,
  OldCertificateType,
  defaultErrorState,
  defaultFormData,
  TErrors,
  UserDto,
  CertificateDto,
  CommentDto,
  SupplierDto,
} from '@types';
import { addCertificate, editCertificate } from '@utils';
import { useLanguage, useUser } from '@hooks';
import { SupplierLookupModal, UserLookupModal } from '@components/Modals';
import { UserLookupTable } from '@components/Tables';
import { Comment } from '@components';

export const CertificateForm = forwardRef(
  (
    { pdfDataUrl, onReset, isEdit, certificateId }: CertificateFormProps,
    ref,
  ) => {
    const { translations } = useLanguage();
    const { users, activeUser } = useUser();

    const [formData, setFormData] = useState<CertificateDto>(defaultFormData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    const [selectedApplicants, setSelectedApplicants] = useState<UserDto[]>([]);
    const [selectedSuppliers, setSelectedSuppliers] =
      useState<SupplierDto | null>(null);

    const [isComment, setIsComment] = useState(false);
    const [comment, setComment] = useState('');

    const dateFromRef = useRef<HTMLInputElement | null>(null);
    const dateToRef = useRef<HTMLInputElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);

    const [errors, setErrors] = useState<TErrors>(defaultErrorState);

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
        setErrors({
          supplier: '',
          certificateType: '',
          dateFrom: '',
          dateTo: '',
        });
        if (onReset) {
          onReset();
        }
      },
      setValues: (values: CertificateDto) => {
        setFormData({
          id: values.id,
          validFrom: new Date(values.validFrom),
          validTo: new Date(values.validTo),
          type: values.type as OldCertificateType,
          supplier: values.supplier,
          fileUrl: pdfDataUrl || '',
          assignedUserIds: values.assignedUserIds,
          comments: values.comments,
        });
      },
    }));

    const handleFocusFrom = useCallback(() => {
      if (dateFromRef.current) {
        dateFromRef.current.type = 'date';
      }
    }, []);

    const handleBlurFrom = useCallback(() => {
      if (dateFromRef.current && !formData.validFrom) {
        dateFromRef.current.type = 'text';
      }
    }, [formData.validFrom]);

    const handleChangeFrom = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          dateFrom: e.target.value ? new Date(e.target.value) : null,
        }));
        setErrors((prev) => ({ ...prev, dateFrom: '' }));
      },
      [],
    );

    const handleFocusTo = useCallback(() => {
      if (dateToRef.current) {
        dateToRef.current.type = 'date';
      }
    }, []);

    const handleBlurTo = useCallback(() => {
      if (dateToRef.current && !formData.validTo) {
        dateToRef.current.type = 'text';
      }
    }, [formData.validTo]);

    const handleChangeTo = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          dateTo: e.target.value ? new Date(e.target.value) : null,
        }));
        setErrors((prev) => ({ ...prev, dateTo: '' }));
      },
      [],
    );

    const handleChangeCertificateType = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as OldCertificateType;
        setFormData((prev) => ({
          ...prev,
          certificateType: selectedValue,
        }));
        setErrors((prev) => ({ ...prev, certificateType: '' }));
      },
      [],
    );

    const handleSupplierSelect = useCallback((supplier: SupplierDto) => {
      setFormData((prev) => ({
        ...prev,
        supplier: supplier,
      }));
      setErrors((prev) => ({ ...prev, supplier: '' }));
      setSelectedSuppliers(supplier);
      setIsModalOpen(false);
    }, []);

    const handleSubmit = useCallback(
      async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
          supplier: formData.supplier ? '' : 'Supplier is required',
          certificateType: formData.type ? '' : 'Certificate Type is required',
          dateFrom: formData.validFrom ? '' : 'Valid From date is required',
          dateTo: formData.validTo ? '' : 'Valid To date is required',
        };

        if (Object.values(newErrors).some((error) => error)) {
          setErrors(newErrors);
          return;
        }

        formData.fileUrl = pdfDataUrl;
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

    const toggleComment = useCallback(() => {
      setIsComment((prev) => !prev);
    }, []);

    const handleApplicantSelection = (applicant: UserDto) => {
      setSelectedApplicants((prevSelected) => {
        const isSelected = prevSelected.some(
          (selected) => selected.userId === applicant.userId,
        );
        return isSelected
          ? prevSelected.filter(
              (selected) => selected.userId !== applicant.userId,
            )
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
      if (isEdit && formData.assignedUserIds && users.length > 0) {
        const matchedApplicants = users.filter((user) =>
          formData.assignedUserIds.includes(user.userId),
        );
        setSelectedApplicants(matchedApplicants);
      }
    }, [isEdit, formData.assignedUserIds, users]);

    const handleChangeComment = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
      },
      [],
    );

    const handleCommentSubmit = useCallback(() => {
      if (comment && activeUser) {
        setFormData((prev) => ({
          ...prev,
          comments: [...prev.comments, { name: activeUser.firstName, comment }],
        }));
        setComment('');
      }
    }, [comment, activeUser]);

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
              value={formData.supplier?.name || ''}
            />
            {errors.supplier && <div className="error">{errors.supplier}</div>}

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
                options={Object.values(OldCertificateType)}
                className="certificate-type-select"
                placeholder="Select your option"
                value={formData.type}
                onChange={handleChangeCertificateType}
              />
              {errors.certificateType && (
                <div className="error">{errors.certificateType}</div>
              )}
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
                formData.validFrom
                  ? formData.validTo.toISOString().split('T')[0]
                  : ''
              }
              onChange={handleChangeFrom}
              placeholder={translations.selectDatePlaceholder}
              onFocus={handleFocusFrom}
              onBlur={handleBlurFrom}
              className="valid-from-input"
            />
            {errors.dateFrom && <div className="error">{errors.dateFrom}</div>}
          </div>

          <div className="label-input-container">
            <Label className="valid-to-label">{translations.validTo}</Label>
            <Input
              ref={dateToRef}
              type="text"
              value={
                formData.validTo
                  ? formData.validTo.toISOString().split('T')[0]
                  : ''
              }
              onChange={handleChangeTo}
              placeholder={translations.selectDatePlaceholder}
              onFocus={handleFocusTo}
              onBlur={handleBlurTo}
              className="valid-to-input"
            />
            {errors.dateTo && <div className="error">{errors.dateTo}</div>}
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

          <section className="comments-section">
            <Comment
              comment={comment}
              isComment={isComment}
              handleChangeComment={handleChangeComment}
              toggleComment={toggleComment}
              activeUser={activeUser as UserDto}
              comments={formData.comments as CommentDto[]}
              handleCommentSubmit={handleCommentSubmit}
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
