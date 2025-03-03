"use client";

import { createCookbook } from "@/app/lib/action";
import Link from "next/link";
import { useActionState } from "react";
import { Button } from "../button";

export default function Form() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useActionState(createCookbook, initialState);

  return (
    <>
      <div id="message-error">
        {state.message && <p className="mt-2 text-red-500"> {state.message}</p>}
      </div>
      <form action={dispatch}>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Choose name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter a name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/transactions"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Create Cookbook</Button>
        </div>
      </form>
    </>
  );
}
