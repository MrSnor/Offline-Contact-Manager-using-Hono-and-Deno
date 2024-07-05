type ContactType = {
  "id_": string;
  "title": string;
  "contactPerson": string;
  "jobTitle": string;
  "companyName": string;
  "location": string;
  "industryType": string;
  "officialEmailId": string;
  "mobileNumber1": string;
  "mobileNumber2": string;
};

type dbDataType = {
  contactList: ContactType[];
  idCount: number;
};

export type { ContactType, dbDataType };