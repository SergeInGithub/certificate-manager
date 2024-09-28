/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-09-27 16:50:30.

export interface UserDto {
    email: string;
    userIndex: string;
    firstName: string;
    lastName: string;
    plant: string;
    departmentId: number;
    userId: number;
    id: number;
}

export interface SupplierDto {
    id: number;
    name: string;
    supplierIndex: string;
    city: string;
}

export interface CommentDto {
    id: number;
    comment: string;
    userId: number;
    certificateId: number;
}

export interface DepartmentDto {
    id: number;
    name: string;
    description: string;
}

export interface CertificateDto {
    id: number;
    type: CertificateType;
    validFrom: Date;
    validTo: Date;
    supplier: SupplierDto;
    fileUrl: string;
    assignedUserIds: number[];
    comments: CommentDto[];
}

export type CertificateType = "PERMISSION_OF_PRINTING" | "OHSAS_18001";
