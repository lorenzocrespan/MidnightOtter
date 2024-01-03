// Import from types folder the InputFormDataType type.
import { InputFormDataType } from "@/types/inputForm";

/**
 *  Export a constant of type InputFormDataType with
 *  the information about the input fields.
 *  This constant is used to define the input fields
 *  for the search form.
 *
 *  @field partyAddress, Address of the party.
 *
 */
export const partyFormConfig: { [key: string]: InputFormDataType } = {
  partyAddress: {
    type: "address",
    id: "partyAddress",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "Party address",
    autoCapitalize: "off",
  },
};
