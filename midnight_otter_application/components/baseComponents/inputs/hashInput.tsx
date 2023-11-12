import { useFormContext } from "react-hook-form";
import { InputFormDataType } from "@/types/inputForm";

export function IdentityInput(hashInputProps: InputFormDataType) {
  const { register } = useFormContext();

  const switchPatternApply = (type: string) => {
    switch (type) {
      case "email":
        return /^[^@]+@[^@]+\.[^@]+$/;
      case "name":
        return /^[a-zA-Z]+$/;
      case "surname":
        return /^[a-zA-Z]+$/;
      case "hash":
        return /^[a-zA-Z0-9]+$/;
      default:
        return /^[a-zA-Z]+$/;
    }
  };

  const firstLetterUppercase = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <input
      {...register(hashInputProps.id, {
        required: firstLetterUppercase(hashInputProps.id) + " is required",
        pattern: {
          value: switchPatternApply(hashInputProps.id),
          message: "Invalid input",
        },
      })}
      type={hashInputProps.type}
      id={hashInputProps.id}
      className="w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400"
      placeholder={hashInputProps.placeholder}
      autoCapitalize={hashInputProps.autoCapitalize}
      autoComplete={hashInputProps.autoComplete}
      autoCorrect={hashInputProps.autoCorrect}
      disabled={hashInputProps.disabled}
    />
  );
}
