import { TCertificate } from '@types';

export const parseCertificate = (
  certificate: Omit<TCertificate, 'validFrom' | 'validTo'> & {
    validFrom: string;
    validTo: string;
  },
): TCertificate => ({
  ...certificate,
  validFrom: new Date(certificate.validFrom),
  validTo: new Date(certificate.validTo),
});
