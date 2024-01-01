// Next imports
import { Metadata } from "next";
// React components imports
import { AddCaseForm } from "@/components/levelTwoComps/formModal/caseForm";

// Update the metadata for the page.
export const metadata: Metadata = {
  title: "Creazione di un nuovo caso",
  description: "Pagina per la creazione di un nuovo caso",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      <AddCaseForm />
    </div>
  );
}
