import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useEffect,
} from 'react';
import '../../assets/styles/components/certificateForm.css';
import { Label } from '@components/Label';
import { Select } from '@components/Select';
import { SvgComponentType, SvgComponent } from '@components/Svg';
import {
  CertificateFormProps,
  CertificateType,
  defaultErrorState,
  defaultFormData,
  TErrors,
  UserDto,
  CertificateDto,
  CommentDto,
  SupplierDto,
  defaultBooleanState,
} from '@types';
import { apiClient, isSupplierValid } from '@utils';
import { useLanguage, useUser } from '@hooks';
import { SupplierLookupModal, UserLookupModal } from '@components/Modals';
import {
  Comment,
  DateSection,
  ParticipantSection,
  SupplierSection,
} from '@components';

export const CertificateForm = forwardRef(
  (
    { pdfDataUrl, onReset, isEdit, certificateId }: CertificateFormProps,
    ref,
  ) => {
    const { translations } = useLanguage();
    const { users, activeUser } = useUser();
    const [formData, setFormData] = useState<CertificateDto>(defaultFormData);
    const [booleanState, setBooleanState] = useState(defaultBooleanState);
    const [selectedApplicants, setSelectedApplicants] = useState<UserDto[]>([]);
    const [selectedSuppliers, setSelectedSuppliers] =
      useState<SupplierDto | null>(null);
    const [comment, setComment] = useState('');
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
          type: '',
          validFrom: '',
          validTo: '',
        });
        if (onReset) {
          onReset();
        }
      },
      setValues: (values: CertificateDto) => {
        const selectedApplicants = users.filter((user) =>
          values.assignedUserIds.includes(user.userId),
        );

        setFormData({
          id: values.id,
          validFrom: new Date(values.validFrom),
          validTo: new Date(values.validTo),
          type: values.type as CertificateType,
          supplier: values.supplier,
          fileUrl: pdfDataUrl || '',
          assignedUserIds: values.assignedUserIds,
          comments: values.comments || [],
        });

        setSelectedApplicants(selectedApplicants);
      },
    }));

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const dateValue = name.includes('valid') ? new Date(value) : value;
        setFormData((prev) => ({ ...prev, [name]: dateValue }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
      },
      [],
    );
    const handleChangeCertificateType = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as CertificateType;
        setFormData((prev) => ({
          ...prev,
          type: selectedValue,
        }));
        setErrors((prev) => ({ ...prev, type: '' }));
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
      setBooleanState((prev) => ({ ...prev, isModalOpen: false }));
    }, []);

    const validateForm = () => {
      const newErrors = {
        supplier: isSupplierValid(formData.supplier)
          ? ''
          : 'Supplier is required and must have valid details',
        validFrom: formData.validFrom ? '' : 'Valid From date is required',
        validTo: formData.validTo ? '' : 'Valid To date is required',
        type: formData.type ? '' : 'Certificate Type is required',
      };
      return newErrors;
    };

    const handleSubmit = useCallback(
      async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.values(newErrors).some((error) => error)) {
          setErrors(newErrors);
          return;
        }

        formData.fileUrl = pdfDataUrl;
        try {
          if (isEdit && certificateId) {
            await apiClient.updateCertificate(certificateId, formData);
          } else {
            await apiClient.createCertificate(formData);
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
      setBooleanState((prev) => ({ ...prev, isModalOpen: true }));
    };

    const openUserModal = useCallback(() => {
      setBooleanState((prev) => ({ ...prev, isUserModalOpen: true }));
    }, []);

    const closeModal = useCallback(() => {
      setBooleanState((prev) => ({ ...prev, isModalOpen: false }));
      setSelectedSuppliers(null);
    }, []);

    const closeUserModal = useCallback(
      () => setBooleanState((prev) => ({ ...prev, isUserModalOpen: false })),
      [],
    );

    const cancelSelections = useCallback(() => {
      setSelectedApplicants([]);
    }, []);

    const handleSupplierReset = () => {
      setFormData((prev) => ({
        ...prev,
        supplier: defaultFormData.supplier,
      }));
    };

    const toggleComment = useCallback(() => {
      setBooleanState((prev) => ({ ...prev, isComment: !prev.isComment }));
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
        assignedUserIds: selectedApplicants.map(
          (applicant) => applicant.userId,
        ),
      }));
    }, [selectedApplicants]);

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
          comments: [
            ...(prev.comments || []),
            { userId: activeUser.userId, comment } as CommentDto,
          ],
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
          <SupplierSection
            formData={formData}
            errors={errors}
            openModal={openModal}
            handleSupplierReset={handleSupplierReset}
          />

          <div className="label-input-container">
            <Label className="certificate-type-label">
              {translations.certificateType}
            </Label>

            <div className="custom-select-container">
              <Select
                options={Object.values(CertificateType)}
                className="certificate-type-select"
                placeholder="Select your option"
                value={formData.type}
                onChange={handleChangeCertificateType}
              />
              {errors.type && <div className="error">{errors.type}</div>}
              <div className="custom-select-icon">
                <SvgComponent
                  type={SvgComponentType.SELECTED_DOWN_ARROW}
                  className="custom-select-arrow-icon"
                />
              </div>
            </div>
          </div>

          <DateSection
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />

          <ParticipantSection
            selectedApplicants={selectedApplicants}
            openUserModal={openUserModal}
            handleApplicantSelection={handleApplicantSelection}
          />

          <section className="comments-section">
            <Comment
              comment={comment}
              isComment={booleanState.isComment}
              handleChangeComment={handleChangeComment}
              toggleComment={toggleComment}
              activeUser={activeUser as UserDto}
              comments={formData.comments as CommentDto[]}
              handleCommentSubmit={handleCommentSubmit}
            />
          </section>
        </form>

        <SupplierLookupModal
          isOpen={booleanState.isModalOpen}
          onClose={closeModal}
          onSelectSupplier={handleSupplierSelect}
        />
        <UserLookupModal
          isOpen={booleanState.isUserModalOpen}
          onClose={closeUserModal}
          selectedItems={selectedApplicants}
          setSelectedItems={setSelectedApplicants}
          cancelSelections={cancelSelections}
        />
      </React.Fragment>
    );
  },
);
