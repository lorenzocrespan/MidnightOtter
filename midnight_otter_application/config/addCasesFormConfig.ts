// Import from types folder the InputFormDataType type.
import { InputFormDataType } from "@/types/inputForm";

/**
 *  Export a constant of type InputFormDataType with
 *  the information about the input fields.
 *  This constant is used to define the input fields
 *  for the search form.
 *
 *  @field caseNumber, Number of the case.
 *  @field caseName, Name of the case.
 *  @field caseState, State of the case.
 *
 *  @field submitterOfficer, Name of the officer who submitted the case.
 *  @field submitterId, Id of the officer who submitted the case.
 * 
 *  @field objectId, Id of the object of the case.
 *  @field objectQuantity, Quantity of the object of the case.
 *  @field objectDescription, Description of the object of the case.
 *
 *  @field seizedLocation, Location of the object of the case.
 *  @field seizedEpochTime, Epoch time of the object of the case.
 *
 *  @field expertReports, List of URI for the expert reports.
 *
 *  @field objectStatus, Status of the object (Seized, Released, Destroyed).
 *
 *  @field chainCustody, List of events for the chain of custody.
 *
 */
export const addCasesFormConfig: { [key: string]: InputFormDataType } = {
  caseNumber: {
    type: "number",
    id: "caseNumber",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "2023000001",
    autoCapitalize: "off",
  },
  caseName: {
    type: "text",
    id: "caseName",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "Name",
    autoCapitalize: "off",
  },
  caseState: {
    type: "select",
    id: "caseState",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    options: ["Open", "Closed"],
    placeholder: "State",
    autoCapitalize: "off",
  },
  submitterOfficer: {
    type: "text",
    id: "submitterOfficer",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "Name",
    autoCapitalize: "off",
  },
  submitterId: {
    type: "text",
    id: "submitterId",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "Id",
    autoCapitalize: "off",
  },
  objectId: {
    type: "number",
    id: "objectId",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "Id",
    autoCapitalize: "off",
  },
  objectQuantity: {
    type: "number",
    id: "objectQuantity",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "Quantity",
    autoCapitalize: "off",
  },
  objectDescription: {
    type: "textarea",
    id: "objectDescription",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "Description",
    autoCapitalize: "off",
  },
  seizedLocation: {
    type: "text",
    id: "seizedLocation",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "Location",
    autoCapitalize: "off",
  },
  seizedEpochTime: {
    type: "date",
    id: "seizedEpochTime",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "Date",
    autoCapitalize: "off",
  },
  expertReports: {
    type: "text",
    id: "expertReports",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "/ipfs/QmQmQmQmQmQmQmQmQmQmQmQmQmQmQm",
    autoCapitalize: "off",
  },
  objectStatus: {
    type: "select",
    id: "objectStatus",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    options: ["Seized", "Released", "Destroyed"],
    placeholder: "Status",
    autoCapitalize: "off",
  },
  chainCustody: {
    type: "text",
    id: "chainCustody",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "",
    autoCapitalize: "off",
  },
};
