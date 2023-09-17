import { useFormContext } from "react-hook-form";
import { InputAuthenticationDataType } from "@/types/inputForm";

export function IdentityInput(identityInputProps: InputAuthenticationDataType) {
  const { register } = useFormContext(); // retrieve all hook methods

  return (
    <input
      {...register(identityInputProps.id, { required: true })}
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
