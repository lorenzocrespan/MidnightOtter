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
