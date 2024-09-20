import { TCertificate } from '@types';

export const parseCertificate = (
  certificate: Omit<TCertificate, 'dateFrom' | 'dateTo'> & {
    dateFrom: string;
    dateTo: string;
  },
): TCertificate => ({
  ...certificate,
  dateFrom: new Date(certificate.dateFrom),
  dateTo: new Date(certificate.dateTo),
});
