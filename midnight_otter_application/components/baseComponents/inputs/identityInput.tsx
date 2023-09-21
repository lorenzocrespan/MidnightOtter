import { useFormContext } from "react-hook-form";
import { InputAuthenticationDataType } from "@/types/inputForm";

export function IdentityInput(identityInputProps: InputAuthenticationDataType) {
  const { register } = useFormContext();

  const switchPatternApply = (type: string) => {
    switch (type) {
      case "email":
        return /^[^@]+@[^@]+\.[^@]+$/;
      case "name":
        return /^[a-zA-Z]+$/;
      case "surname":
        return /^[a-zA-Z]+$/;
      default:
        return /^[a-zA-Z]+$/;
    }
  };

  const firstLetterUppercase = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <input
      {...register(identityInputProps.id, {
        required: firstLetterUppercase(identityInputProps.id) + " is required",
        pattern: {
          value: switchPatternApply(identityInputProps.id),
          message: "Invalid input",
        },
      })}
      type={identityInputProps.type}
      id={identityInputProps.id}
      className={identityInputProps.className}
      placeholder={identityInputProps.placeholder}
      autoCapitalize={identityInputProps.autoCapitalize}
      autoComplete={identityInputProps.autoComplete}
      autoCorrect={identityInputProps.autoCorrect}
      disabled={identityInputProps.disabled}
    />
  );
}
