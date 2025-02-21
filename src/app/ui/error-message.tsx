interface ErrorMessageProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}
export function ErrorMessage({ children, ...rest }: ErrorMessageProps) {
  return (
    <div className="flex w-full rounded-md border border-primary-950 relative h-10 bg-primary-300">
      <div className="my-auto">
        <p className=" pl-10 text-sm outline-2 text--primary-950">{children}</p>
      </div>
    </div>
  );
}
