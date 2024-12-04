import Link from "next/link";
import NavLinks from "./nav-links";
//import NavLinks from "@/app/ui/dashboard/nav-links";
// import { signOut } from "@/auth";

export default function SideNav() {
  return (
    <div className="flex flex-row px-3 py-4 md:px-2">
      <Link className="" href="/">
        Logo placeholder
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:space-x-0 md:space-y-2">
        <NavLinks />
        {/* <div className="hidden w-auto grow rounded-md bg-gray-50 md:block"></div> */}

        {/* <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-primary-100 hover:text-black-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <ArrowLeftEndOnRectangleIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form> */}
      </div>
    </div>
  );
}
