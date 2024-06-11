import React from "react";

import MyNavbar from "./Navbar";
import MySidebar from "./Sidebar";

const Layout = ({ children }) => {
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
      <MyNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <MySidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="p-4 mt-14 sm:ml-64">
          {children}
      </main>
    </>
  );
};

export default Layout;
