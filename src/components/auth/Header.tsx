interface HeaderProps {
  header: string;
  label: string;
}

export const Header = ({ header, label }: HeaderProps) => {
  return (
    <div className="space-y-1">
      <h1 className="text-white font-semibold text-lg sm:text-xl md:text-3xl">
        {header}
      </h1>
      <p className="text-lightGrey font-light text-sm sm:text-base md:text-lg">
        {label}
      </p>
    </div>
  );
};
