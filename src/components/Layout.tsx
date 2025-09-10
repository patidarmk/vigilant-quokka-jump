import { Outlet } from "@tanstack/react-router";
import Header from "@/components/Header";
import { MadeWithApplaa } from "@/components/made-with-applaa";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <MadeWithApplaa />
    </div>
  );
};

export default Layout;