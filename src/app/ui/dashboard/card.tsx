import Link from "next/link";

export function Card({ title, id }: { title: string; id: number }) {
  return (
    <Link className="w-1/6" href={`/dashboard/recipe/${id}`}>
      <div className="rounded-xl bg-primary-100 p-2 shadow-sm">
        <div>
          <img
            className="rounded-xl"
            src="https://via.placeholder.com/150"
            alt="Placeholder"
          />
        </div>
        <div className="flex p-4">
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
      </div>
    </Link>
  );
}
