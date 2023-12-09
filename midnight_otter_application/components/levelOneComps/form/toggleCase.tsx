import { InputFormDataType } from "@/types/inputForm";

export function ToggleCase(caseInputProps: InputFormDataType) {

  

  // return caseInputProps.options !== undefined ? (
  //   <div className="flex flex-col gap-2">
  //     <label htmlFor={caseInputProps.id} className="text-sm text-slate-900">
  //       {caseInputProps.id}
  //     </label>
  //     <select
  //       id={caseInputProps.id}
  //       className="w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400"
  //       placeholder={caseInputProps.placeholder}
  //       autoCapitalize={caseInputProps.autoCapitalize}
  //       disabled={caseInputProps.disabled}
  //     >
  //       {caseInputProps.options.map((option) => (
  //         <option value={option}>{option}</option>
  //       ))}
  //     </select>
  //   </div>
  // ) : (
  //   <div className="flex flex-col gap-2">
  //     <label htmlFor={caseInputProps.id} className="text-sm text-slate-900">
  //       {caseInputProps.id}
  //     </label>
  //     <input
  //       type="text"
  //       id={caseInputProps.id}
  //       className="w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400"
  //       placeholder={caseInputProps.placeholder}
  //       autoCapitalize={caseInputProps.autoCapitalize}
  //       disabled={caseInputProps.disabled}
  //     />
  //   </div>
  // );
}
