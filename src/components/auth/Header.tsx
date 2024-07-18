interface HeaderProps {
  header: string;
  label: string;
}

export const Header = ({header, label}: HeaderProps) => {
  return (
    <div>
      <h1 className="text-white font-semibold text-3xl mt-0.5">
        {header}
      </h1>
      <p className="text-lightGrey font-light text-lg mt-2.5">
        {label}
      </p>
    </div>
  )
}