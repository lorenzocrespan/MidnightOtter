import { Icons } from "@/components/baseComponents/icons";
import { pushFileToIPFS, getFileFromIPFS } from "@/services/infura";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <form>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icons.logo className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
        </div>
      </form>
      <button type="submit" className="mt-3 w-auto rounded-lg border-2 p-2">
        Search
      </button>
    </div>
  );
}
