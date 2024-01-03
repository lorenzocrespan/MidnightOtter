import { useFormContext } from "react-hook-form";
import { InputFormDataType } from "@/types/inputForm";

export function InputCase(inputCaseProps: InputFormDataType) {
  const { register } = useFormContext();

  const switchPatternApply = (type: string) => {
    switch (type) {
      case "address":
        // Any caracter start with 0x and 40 characters long
        return /^0x[a-fA-F0-9]{40}$/;
      case "email":
        return /^[^@]+@[^@]+\.[^@]+$/;
      case "name":
        return /^[a-zA-Z]+$/;
      case "surname":
        return /^[a-zA-Z]+$/;
      case "hash":
        return /^[a-zA-Z0-9]+$/;
      case "number":
        return /^[0-9]+$/;
      default:
        return /^[a-zA-Z]+$/;
    }
  };

  const firstLetterUppercase = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return inputCaseProps.type !== "textarea" ? (
    <input
      {...register(inputCaseProps.id, {
        required: firstLetterUppercase(inputCaseProps.id) + " is required",
        pattern: {
          value: switchPatternApply(inputCaseProps.type),
          message: "Invalid input",
        },
      })}
      type={inputCaseProps.type}
      id={inputCaseProps.id}
      className="w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400"
      placeholder={inputCaseProps.placeholder}
      autoCapitalize={inputCaseProps.autoCapitalize}
      disabled={inputCaseProps.disabled}
    />
  ) : (
    <textarea
      {...register(inputCaseProps.id, {
        required: firstLetterUppercase(inputCaseProps.id) + " is required",
        pattern: {
          value: switchPatternApply(inputCaseProps.type),
          message: "Invalid input",
        },
      })}
      id={inputCaseProps.id}
      className="w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400"
      placeholder={inputCaseProps.placeholder}
      autoCapitalize={inputCaseProps.autoCapitalize}
      disabled={inputCaseProps.disabled}
    />
  );
}
