interface HeaderProps {
  header: string;
  label: string;
}

export const Header = ({header, label}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h1 className="text-white font-semibold text-3xl mt-0.5">
        {header}
      </h1>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </div>
  )
}