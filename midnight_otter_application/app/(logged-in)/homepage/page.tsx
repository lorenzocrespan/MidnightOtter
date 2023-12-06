import { UserInformation } from "@/components/modalComponents/informationSection/userInformation";
import { getName } from "@/services/serverSideWagmi";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <p>{await getName()}</p>
      <UserInformation />
    </div>
  );
}
