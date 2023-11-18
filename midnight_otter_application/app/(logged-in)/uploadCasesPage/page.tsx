// Next imports
import { Metadata } from "next";
// React components imports
import { Icons } from "@/components/baseComponents/icons";
import { AddCasesForm } from "@/components/modalComponents/formsModal/addCasesModal/addCasesForm";

// Update the metadata for the page.
export const metadata: Metadata = {
  title: "Pagina di caricamento dei casi",
  description: "Aggiungi un caso all'interno del sistema.",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-10 w-10" />
        <h1 className="text-2xl font-semibold">Titolo</h1>
        <p className="text-sm text-slate-400">Sottotitolo</p>
      </div>
      <AddCasesForm />
    </div>
  );
}
