import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black w-full h-[100vh] bg-[url('/img/bg-img_01.webp')] bg-cover bg-center shadow-blend">
      <div className="bg-[black]/85 w-full h-[100vh] flex flex-col items-center">
        <div className="bg-[#6606E3]/5 w-full h-[100vh] flex flex-col items-center">
          <div className="flex justify-center">
            <Image
              src="logo\logo-icon.svg"
              alt="Plaeen logo"
              width={70}
              height={52}
              className="py-11"
            />
          </div>
          <div className="flex justify-center pb-16">
            
          {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
