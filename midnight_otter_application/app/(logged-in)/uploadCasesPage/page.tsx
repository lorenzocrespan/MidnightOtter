// Next imports
import { Metadata } from "next";
// React components imports
import { AddCasesForm } from "@/components/modalComponents/formsModal/addCasesModal/addCasesForm";

// Update the metadata for the page.
export const metadata: Metadata = {
  title: "Pagina di caricamento dei casi",
  description: "Aggiungi un caso all'interno del sistema.",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      <AddCasesForm />
    </div>
  );
}
