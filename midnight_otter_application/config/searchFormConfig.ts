// Import from types folder the InputAuthenticationDataType type.
import { InputAuthenticationDataType } from "@/types/inputForm";

// Export a constant of type InputAuthenticationDataType with the information about the input fields.
// signinFormConfig is a dictionary of InputAuthenticationDataType.
export const searchFormConfig: { [key: string]: InputAuthenticationDataType } =
  {
    hash: {
      type: "text",
      id: "hash",
      className:
        "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
      placeholder: "Hash",
      autoCapitalize: "none",
      autoComplete: "email",
      autoCorrect: "off",
    },
  };
