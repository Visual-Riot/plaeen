export default function Page() {
  return (
    <div className="relative min-h-screen bg-calendar-bg bg-cover bg-center flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-85"></div>
      <div className="relative w-4/5 h-4/5 bg-lightPurple bg-opacity-15 backdrop-filter  backdrop-blur-lg rounded-lg flex p-10">
        <h1 className="text-6xl text-green font-abolition justify-left">
          Calendar
        </h1>
      </div>
    </div>
  );
}
