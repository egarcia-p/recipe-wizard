"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/" },
  {
    name: "Profile",
    href: "/profile",
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        // const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-primary-100 hover:text-black-600 md:flex-none md:justify-start md:p-2 md:px-3
          
            ${pathname === link.href ? "bg-primary-100 text-black-600" : ""}
            `}
          >
            {/* <LinkIcon className="w-6" /> */}
            <span className="hidden md:block">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}
