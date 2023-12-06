// Import NextJS components
// NOTE: next/dynamic is a composite of React.lazy() and Suspense. It allows for dynamic loading of components.
import dynamic from "next/dynamic";
// Dynamic import of components rendered on the client side.
const UserAccount_CSR = dynamic(
  () => import("@/components/levelOneComps/userAccountOverview"),
  {
    ssr: false,
  }
);

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <UserAccount_CSR />
    </div>
  );
}
