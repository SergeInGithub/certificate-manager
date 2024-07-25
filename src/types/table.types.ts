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
  supplier: TSupplier | null;
  certificateType: CertificateType | undefined;
  dateFrom: Date | null;
  dateTo: Date | null;
  pdfDataUrl: string | null;
};

export type CertificateFormValues = {
  dateFrom: string;
  dateTo: string;
  certificateType: string;
  supplier: TSupplier;
  pdfDataUrl: string;
};

export enum CERTIFICATE_TYPE {
  PERMISSION_OF_PRINTING = 'Permission of Printing',
  OHSAS_18001 = 'OHSAS 18001',
}

export type TSupplier = {
  supplierName: string;
  supplierIndex: number;
  city: string;
};

export enum CERTIFICATE_TYPE {
  PERMISSION_OF_PRINTING = 'Permission of Printing',
  OHSAS_18001 = 'OHSAS 18001',
}

export type TSupplier = {
  supplierName: string;
  supplierIndex: number;
  city: string;
};

export enum LanguageOptions {
  ENGLISH = 'English',
  GERMAN = 'German',
}
