export type TableHeaderItem = {
  id: string;
  label: string;
};

export enum CertificateType {
  PERMISSION_OF_PRINTING = 'Permission of Printing',
  OHSAS_18001 = 'OHSAS 18001',
}

export type TCertificate = {
  id?: number;
  supplier: string;
  certificateType: CertificateType | undefined;
  dateFrom: Date | null;
  dateTo: Date | null;
};
