import Link from "next/link";

export function CreateCard({ name, url }: { name: string; url: string }) {
  return (
    <div className="rounded-xl bg-primary-100 p-2 shadow-sm w-1/6">
      <Link href={url}>
        <div>+</div>
        <div className="flex p-4">
          <h3 className="ml-2 text-sm font-medium">{name}</h3>
          <p>{url}</p>
        </div>
      </Link>
    </div>
  );
}
