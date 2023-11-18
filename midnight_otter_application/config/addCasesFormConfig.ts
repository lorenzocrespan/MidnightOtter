// Import from types folder the InputFormDataType type.
import { InputFormDataType } from "@/types/inputForm";

/**
 *  @dev Structure of the property of the case.
 *
 *  @param numberCase Number of the case.
 *  @param nameCase Name of the case.
 *
 *  @param expertReports List of URI for the expert reports.
 */
// struct Property {
//     // Properties of the case
//     uint256 numberCase;
//     string nameCase;
//     // string nameCreator;
//     // List of URI for the expert reports
//     string[] expertReports;
//     // URI for the chain of custody
//     // string chainCustody;
// }

/**
 *  Export a constant of type InputFormDataType with
 *  the information about the input fields.
 *  This constant is used to define the input fields
 *  for the search form.
 * 
 *  @field numberCase, Number of the case.
 *  @field nameCase, Name of the case.
 * 
 *  @field nameObject, Name of the object of the case.
 *  @field descriptionObject, Description of the object of the case.
 *
 */
export const addCasesFormConfig: { [key: string]: InputFormDataType } = {
  numberCase: {
    type: "number",
    id: "numberCase",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "2023000001",
    autoCapitalize: "off",
  },
  nameCase: {
    type: "text",
    id: "nameCase",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "Name",
    autoCapitalize: "off",
  },
  nameObject: {
    type: "text",
    id: "nameObject",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "Name",
    autoCapitalize: "off",
  },
  descriptionObject: {
    type: "textarea",
    id: "descriptionObject",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "Description",
    autoCapitalize: "off",
  },
};
