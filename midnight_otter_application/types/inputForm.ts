/*
 *  NOTE:
 *    The following file defines the types related to the input
 *    form.
 *    This file is used by the Typescript compiler to check the
 *    types of the application.
 */

/**
 *  Define the type for the InputFormDataType.
 *  This type is used to define a generic input field.
 *
 */
export type InputFormDataType = {
  type: string;
  id: string;
  className: string;
  placeholder: string;
  autoCapitalize: string;
  options?: string[];
  disabled?: boolean;
  verify?: boolean;
};

/**
 *  Define the type for the InputAuthenticationDataType.
 *  This type is used to define the input fields for the
 *  authentication form.
 *
 */
export type InputAuthenticationDataType = {
  type: string;
  id: string;
  value?: string[];
  className: string;
  placeholder: string;
  autoCapitalize: string;
  autoComplete: string;
  autoCorrect: string;
  disabled?: boolean;
  verify?: boolean;
};

/**
 *  Define the type for the SubtitleInputTextDataType.
 *  This type is used to define the subtitle, which is
 *  usally placed under the input field.
 *
 */
export type SubtitleInputTextDataType = {
  text?: string;
};
