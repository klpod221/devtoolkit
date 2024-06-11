import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ToggleSwitch, DarkThemeToggle } from "flowbite-react";
import { FaGithub, FaMoon, FaSun } from "react-icons/fa";
import { HiBars3BottomLeft } from "react-icons/hi2";

const MyNavbar = ({ isOpen, setIsOpen }) => {
  

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center">
          <div className="flex items-center justify-start sm:w-60 w-auto">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <HiBars3BottomLeft className="w-6 h-6" />
            </button>
            <Link href="/" className="items-center hidden sm:flex">
              <Image
                src="https://github.com/klpod221.png"
                className="h-8 me-3 rounded-full"
                width={32}
                height={32}
                alt="klpod221"
              />
              <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap dark:text-white">
                DevToolkit
              </span>
            </Link>
          </div>

          <h2 className="sm:block dark:text-white sm:ml-5 text-2xl ml-1">
            
          </h2>

          <div className="flex items-center justify-end flex-1">
            <Link
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md sm:block dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaGithub className="w-5 h-5" />
            </Link>

            <DarkThemeToggle
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md sm:block dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
