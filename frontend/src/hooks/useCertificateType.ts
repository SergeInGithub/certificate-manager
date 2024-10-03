import React from 'react';
import { useLanguage } from './useLanguage';
import { CertificateType } from '@types';

export const useCertificateType = () => {
  const { translations } = useLanguage();

  return {
    [CertificateType.PERMISSION_OF_PRINTING]: translations.permissionOfPrinting,
    [CertificateType.OHSAS_18001]: translations.ohsas18001,
    [CertificateType.CCC_CERTIFICATE]: translations.cccCertificate,
  };
};
