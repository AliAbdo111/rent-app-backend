export interface IConditionBookletProject {
  projectId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    countryCode: string;
    maritalStatus: string;
    idNumber: string;
    nationality: string;
    familyMembers: number;
  };
  bankAccountStatementFile: string;
  hrLetter: string;
  birthCertificate: string;

  MarriageCertificate: string;
}
