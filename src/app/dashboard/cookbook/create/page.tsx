import { fetchCookbooks } from "@/app/lib/data";
import { Cookbook } from "../../../types/types";
import { getAccessToken } from "@auth0/nextjs-auth0";
import Form from "@/app/ui/cookbook/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main>
      <h1 className="text-lg">Create Cookbook</h1>
      <Form />
    </main>
  );
}
