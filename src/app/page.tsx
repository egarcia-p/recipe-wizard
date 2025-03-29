import { Metadata } from "next";
import { Button } from "./ui/button";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Welcome to{" Recipe Wizard App"}
        </h1>
        <div className="flex flex-col w-full gap-4">
          <a href="/api/auth/login">
            <Button className="w-full justify-center">Get Started</Button>
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
