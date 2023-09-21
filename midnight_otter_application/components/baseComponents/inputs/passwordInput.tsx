import { useFormContext } from "react-hook-form";
import { InputAuthenticationDataType } from "@/types/inputForm";

export function PasswordInput(passwordInputProps: InputAuthenticationDataType) {
  const { register, watch } = useFormContext(); // retrieve all hook methods

  return (
    <>
      <input
        {...register(passwordInputProps.id + "_1", {
          required: "Password is required",
        })}
        type={passwordInputProps.type}
        id={passwordInputProps.id + "_1"}
        className={passwordInputProps.className}
        placeholder={passwordInputProps.placeholder}
        autoCapitalize={passwordInputProps.autoCapitalize}
        autoComplete={passwordInputProps.autoComplete}
        autoCorrect={passwordInputProps.autoCorrect}
        disabled={passwordInputProps.disabled}
      />
      {passwordInputProps.verify ? (
        <input
          {...register(passwordInputProps.id + "_2", {
            required:
              "Password verification is required. Please, re-enter your password.",
            validate: {
              matchesPreviousPassword: (value) => {
                const { password_1 } = watch();
                return password_1 === value || "Passwords should match!";
              },
            },
          })}
          type={passwordInputProps.type}
          id={passwordInputProps.id + "_2"}
          className={passwordInputProps.className}
          placeholder={passwordInputProps.placeholder}
          autoCapitalize={passwordInputProps.autoCapitalize}
          autoComplete={passwordInputProps.autoComplete}
          autoCorrect={passwordInputProps.autoCorrect}
          disabled={passwordInputProps.disabled}
          defaultValue=""
        />
      ) : null}
    </>
  );
}
