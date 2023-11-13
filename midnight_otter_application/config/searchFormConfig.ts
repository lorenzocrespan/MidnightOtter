// Import from types folder the InputFormDataType type.
import { InputFormDataType } from "@/types/inputForm";

/**
 *  Export a constant of type InputFormDataType with
 *  the information about the input fields.
 *  This constant is used to define the input fields
 *  for the search form.
 *
 */
export const searchFormConfig: { [key: string]: InputFormDataType } = {
  hash: {
    type: "text",
    id: "hash",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "QmfKjWn4vX4nWAvNqTDxUCEUi1WqdmAQ4NAisdxyPAnSKY",
    autoCapitalize: "off",
  },
};
