import { ReactNode, useEffect, useState } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let email = localStorage.getItem("email");

    if (!email) {
      email = prompt("Enter your email: ");
      if (!email) {
        alert("Please enter your email!");
        return;
      }
      localStorage.setItem("email", email);
    }
    setEmail(email);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-violet-400">
      <div className="w-[1000px] rounded-3xl grid grid-cols-4 h-full">
        <div className="col-span-1 bg-white rounded-tl-3xl rounded-bl-3xl p-2">
          <div className="flex items-center">
            <img
              src="https://th.bing.com/th/id/OIP.zIdGzR-zqpUyE1ktXdW-dQHaHa?w=626&h=626&rs=1&pid=ImgDetMain"
              alt="default-avt"
              className="w-14 h-14 rounded-full object-cover"
            />
            <span className="font-medium text-base text-slate-500">
              {email?.split("@")[0]}
            </span>
          </div>
        </div>

        <div className="col-span-3 p-1 bg-white rounded-tr-3xl rounded-br-3xl flex flex-col h-full">
          {children}
        </div>
      </div>
    </div>
  );
};
