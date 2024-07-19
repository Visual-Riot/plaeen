interface HeaderProps {
  header: string;
  label: string;
}

export const Header = ({header, label}: HeaderProps) => {
  return (
    <div className="space-y-3 ">
      <h1 className="text-white font-semibold text-3xl">
        {header}
      </h1>
      <p className="text-lightGrey font-light text-lg">
        {label}
      </p>
    </div>
    
  )
}