// Import from types folder the InputAuthenticationDataType type.
import { InputAuthenticationDataType } from "@/types/inputForm";

// Export a constant of type InputAuthenticationDataType with the information about the input fields.
// signinFormConfig is a dictionary of InputAuthenticationDataType.
export const signFormConfig: { [key: string]: InputAuthenticationDataType } = {
  name: {
    type: "text",
    id: "name",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "Name",
    autoCapitalize: "none",
    autoComplete: "name",
    autoCorrect: "off",
  },
  surname: {
    type: "text",
    id: "surname",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "Surname",
    autoCapitalize: "none",
    autoComplete: "surname",
    autoCorrect: "off",
  },
  role: {
    type: "select",
    value: ["Role", "PUBLIC_ADMINISTRATOR_ROLE", "EXPERT_ROLE", "LAWYER_ROLE"],
    id: "role",
    className:
      "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
    placeholder: "Role",
    autoCapitalize: "none",
    autoComplete: "role",
    autoCorrect: "off",
  },
};

export const verifyPasswordConfig: InputAuthenticationDataType = {
  type: "password",
  id: "password",
  className:
    "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
  placeholder: "••••••••",
  autoCapitalize: "none",
  autoComplete: "password",
  autoCorrect: "off",
  verify: true,
};

export const passwordConfig: InputAuthenticationDataType = {
  type: "password",
  id: "password",
  className:
    "w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400",
  placeholder: "••••••••",
  autoCapitalize: "none",
  autoComplete: "password",
  autoCorrect: "off",
  verify: false,
};
