export function Card({ title }: { title: string }) {
  return (
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
  );
}
