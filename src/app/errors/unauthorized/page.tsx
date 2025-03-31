import Link from "next/link";
import { Button } from "@/app/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg mb-8 text-center">
        You don't have the required permissions to access this resource.
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center w-full">
          <Link href="/dashboard/cookbooks">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
        <div className="flex flex-col items-center w-full">
          <a className="w-full items-center " href="/api/auth/logout">
            <Button className="w-full">Logout</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
