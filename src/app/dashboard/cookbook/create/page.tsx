import Form from "@/app/ui/cookbook/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create",
};

export default async function Page() {
  return (
    <main>
      <h1 className="text-lg">Create Cookbook</h1>
      <Form />
    </main>
  );
}
