import Link from "next/link";
import NavLinks from "./nav-links";
import logo from "../../../../public/logo.svg";
import Image from "next/image";
import SessionLinks from "./session-links";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 border">
      <Link className="" href="/">
        <div className="mb-2 flex md:flex-col h-24 items-end justify-start rounded-md bg-white p-4 md:h-44">
          <div className="w-24 h-auto md:m-auto text-primary-950 md:w-40">
            {"LOGO PLACEHOLDER"}
          </div>
          <div className="w-full m-auto text-primary-950 md:w-40 md:text-center">
            <p className=" text-lg">Recipe Wizard</p>
          </div>
          <div className="w-full m-auto text-primary-950 md:w-40 md:text-center">
            <p className=" text-sm">v0.0.1</p>
          </div>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-white md:block"></div>
        <SessionLinks />
      </div>
    </div>
  );
}
