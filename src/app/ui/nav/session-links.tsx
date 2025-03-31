"use client";

import { getSession } from "@auth0/nextjs-auth0";
import {
  ArrowLeftCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
const linkMap = {
  logout: {
    name: "Logout",
    href: "/api/auth/logout",
    icon: ArrowLeftCircleIcon,
  },
};

export default async function SessionLinks() {
  const pathname = usePathname();
  const session = await getSession();
  const UserIcon = UserCircleIcon;

  return (
    <>
      {/** if user is signed in show profile name otherwise logout link*/}
      {session && (
        <div className="flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium bg-primary-50 text-primary-900  s md:flex-none md:justify-start md:p-2 md:px-3">
          <UserIcon className="w-6" />
          <span className="text-sm font-medium text-primary-900">
            {session.user.name}
          </span>
        </div>
      )}
      {session &&
        Object.entries(linkMap).map(([key, link]) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={key}
              href={link.href}
              className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium bg-primary-200 text-primary-900 hover:bg-primary-100 hover:text-primary-900 md:flex-none md:justify-start md:p-2 md:px-3
          
            ${pathname === link.href ? "bg-primary-200 text-primary-950" : ""}
            `}
            >
              <LinkIcon className="w-6" />
              <span className="hidden md:block">{link.name}</span>
            </Link>
          );
        })}
    </>
  );
}
