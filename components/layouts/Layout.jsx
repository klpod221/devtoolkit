import React from "react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "@/providers/ThemeProvider";

import MyNavbar from "./Navbar";
import MySidebar from "./Sidebar";

const Layout = ({ children, title }) => {
  const { theme } = React.useContext(ThemeContext);
  const [isOpen, setIsOpen] = React.useState(false);

  // when change window size, close the sidebar
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <MyNavbar isOpen={isOpen} setIsOpen={setIsOpen} title={title} />
      <MySidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="main p-4 mt-14 sm:ml-64 overflow-y-auto">
        {children}

        <SpeedInsights />
      </main>

      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </>
  );
};

export default Layout;
