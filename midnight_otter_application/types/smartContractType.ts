import { z } from "zod";

const caseInfoSchema = z.object({
  caseNumber: z.bigint(),
  caseName: z.string(),
  assignedJudge: z.string(),
  caseStatus: z.number(),
});

export const caseSchema = z.object({
  caseInformation: caseInfoSchema,
  assignedParties: z.array(z.string()),
});

export function isCase(obj: any): obj is Case {
  return caseSchema.safeParse(obj).success;
}

export type groupedExihibitsCasesType = {
  [key: string]: { name: string; number: string }[];
};

type CaseInfo = {
  caseNumber: number;
  caseName: string;
  assignedJudge: string;
  caseStatus: number;
};

export type Case = {
  caseInformation: CaseInfo;
  assignedParties: string[];
};

const exhibitInfoSchema = z.object({
  caseNumber: z.bigint(),
  submitterId: z.string(),
  objectId: z.bigint(),
  objectDescription: z.string(),
  seizedLocation: z.string(),
  seizedEpochTime: z.bigint(),
  isExihibit: z.boolean(),
});

const chainCustodySchema = z.object({
  timestamp: z.bigint(),
  releasedBy: z.string(),
  receivedBy: z.string(),
  action: z.string(),
});

export const exhibitSchema = z.object({
  exhibitInformation: exhibitInfoSchema,
  requestedTransferReceiver: z.string(),
  expertReports: z.array(z.string()),
  chainCustody: z.array(chainCustodySchema),
});

export function isExihibit(obj: any): obj is Exihibit {
  return exhibitSchema.safeParse(obj).success;
}

export type ExihibitInfo = {
  caseNumber: number;
  exhibitNumber: string;
  submitterId: string;
  objectId: number;
  objectDescription: string;
  seizedLocation: string;
  seizedEpochTime: number;
  isExihibit: boolean;
};

export type ChainCustody = {
  timestamp: number;
  releasedBy: string;
  receivedBy: string;
  action: string;
};

export type Exihibit = {
    exhibitInformation: ExihibitInfo;
    requestedTransferReceiver: string;
    expertReports: string[];
    chainCustody: ChainCustody[];
};


export function isNumberArray(obj: any): obj is number[] {
  return z.array(z.number()).safeParse(obj).success;
}

export function isBigIntArray(obj: any): obj is bigint[] {
  return z.array(z.bigint()).safeParse(obj).success;
}

export function isArray(obj: any): obj is any[] {
  return z.array(z.any()).safeParse(obj).success;
}