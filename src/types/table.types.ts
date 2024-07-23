export type TableHeaderItem = {
  id: string;
  label: string;
};

export enum CERTIFICATE_TYPE {
  PERMISSION_OF_PRINTING = 'Permission of Printing',
  OHSAS_18001 = 'OHSAS 18001',
}

export type TCertificate = {
  id: number;
  supplier: string;
  certificateType: CERTIFICATE_TYPE;
  dateFrom: Date;
  dateTo: Date;
};
