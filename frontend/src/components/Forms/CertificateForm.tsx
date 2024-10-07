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
  NotificationType,
} from '@types';
import { apiClient, isSupplierValid } from '@utils';
import { useCertificateType, useLanguage, useUser } from '@hooks';
import { SupplierLookupModal, UserLookupModal } from '@components/Modals';
import {
  Comment,
  DateSection,
  ParticipantSection,
  SupplierSection,
} from '@components';
import PushNotification from '@components/PushNotification';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

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
    const [selectedSupplier, setSelectedSupplier] =
      useState<SupplierDto | null>(null);
    const [comment, setComment] = useState('');
    const formRef = useRef<HTMLFormElement | null>(null);
    const [errors, setErrors] = useState<TErrors>(defaultErrorState);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState<NotificationType>(
      NotificationType.CREATED,
    );
    const certificateType = useCertificateType();
    const navigate = useNavigate();

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
          fileUrl: '',
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
        setSelectedSupplier(values.supplier);
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
      setSelectedSupplier(supplier);
      setBooleanState((prev) => ({ ...prev, isModalOpen: false }));
    }, []);

    const handleResponse = (
      response: AxiosResponse,
      successType: NotificationType.CREATED | NotificationType.UPDATED,
    ) => {
      if (response.status === 200 || response.status === 201) {
        setShowNotification(true);
        setNotificationType(successType);
      } else {
        setShowNotification(true);
        setNotificationType(NotificationType.ERROR);
      }
    };

    const validateForm = () => {
      const newErrors = {
        supplier: isSupplierValid(formData.supplier)
          ? ''
          : 'Supplier is required',
        validFrom: formData.validFrom ? '' : 'Valid From date is required',
        validTo: formData.validTo ? '' : 'Valid To date is required',
        type: formData.type ? '' : 'Certificate Type is required',
        fileUrl: pdfDataUrl ? '' : 'PDF File is required',
      };

      if (formData.validFrom && formData.validTo) {
        if (new Date(formData.validTo) <= new Date(formData.validFrom)) {
          newErrors.validTo =
            'Valid To date must be greater than Valid From date';
        }
      }

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
        let response;

        formData.fileUrl = pdfDataUrl;
        try {
          if (isEdit && certificateId) {
            response = await apiClient.updateCertificate(
              certificateId,
              formData,
            );
            handleResponse(response, NotificationType.UPDATED);
            setTimeout(() => {
              navigate('/ml/add-certificate');
            }, 4000);
          } else {
            response = await apiClient.createCertificate(formData);
            handleResponse(response, NotificationType.CREATED);
          }
          if (formRef.current) {
            formRef.current.reset();
          }
          setFormData(defaultFormData);
          setSelectedApplicants([]);
          setSelectedSupplier(null);
          if (onReset) {
            onReset();
          }
        } catch (error) {
          console.error('Error adding/editing certificate:', error);
          setShowNotification(true);
          setNotificationType(NotificationType.ERROR);
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

    const handleCloseNotification = useCallback(() => {
      setShowNotification(false);
    }, []);

    const getCertificateTypeOptions = useCallback((): {
      value: CertificateType;
      label: string;
    }[] => {
      return Object.values(CertificateType).map((type) => ({
        value: type,
        label: certificateType[type],
      }));
    }, []);
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
                options={getCertificateTypeOptions()}
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

          {!pdfDataUrl && (
            <div className="error file-url">{errors.fileUrl}</div>
          )}

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
          selectedSupplier={selectedSupplier}
          setSelectedSupplier={setSelectedSupplier}
        />
        <UserLookupModal
          isOpen={booleanState.isUserModalOpen}
          onClose={closeUserModal}
          selectedItems={selectedApplicants}
          setSelectedItems={setSelectedApplicants}
          cancelSelections={cancelSelections}
        />

        {showNotification && (
          <PushNotification
            message={`${
              notificationType === 'created'
                ? '✅ Certificate created successfully!'
                : notificationType === 'updated'
                  ? '✅ Certificate updated successfully!'
                  : notificationType === 'error'
                    ? '❌ Something went wrong'
                    : ''
            }`}
            onClose={handleCloseNotification}
          />
        )}
      </React.Fragment>
    );
  },
);
