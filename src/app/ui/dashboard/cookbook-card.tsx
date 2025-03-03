import Link from "next/link";

export function CookbookCard({ name, id }: { name: string; id: number }) {
  return (
    <Link className="w-1/6" href={`cookbook/${id}?name=${name}`}>
      <div className="rounded-xl bg-primary-100 p-2 shadow-sm  h-full">
        <div className="flex justify-center">
          <img
            className="rounded-xl"
            src="https://placehold.co/100x100"
            alt="Placeholder"
          />
        </div>
        <div className="flex p-4 justify-start">
          <h3 className="ml-2 text-xl font-medium">{name}</h3>
        </div>
      </div>
    </Link>
  );
}
