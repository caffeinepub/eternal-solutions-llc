import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export interface IntakeSubmission {
    id: bigint;
    status: string;
    damageDescription: string;
    propertyType: string;
    insuranceCompany: string;
    fullName: string;
    submittedAt: bigint;
    propertyAddress: string;
    email: string;
    preferredContact: string;
    causeOfLoss: string;
    phone: string;
    dateOfLoss: string;
    policyNumber: string;
    fileIds: Array<string>;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteSubmission(id: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getSubmission(id: bigint): Promise<IntakeSubmission>;
    getSubmissions(): Promise<Array<IntakeSubmission>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitIntakeForm(fullName: string, phone: string, email: string, propertyAddress: string, preferredContact: string, insuranceCompany: string, policyNumber: string, propertyType: string, dateOfLoss: string, causeOfLoss: string, damageDescription: string, fileIds: Array<string>): Promise<bigint>;
    updateSubmissionStatus(id: bigint, status: string): Promise<void>;
}
