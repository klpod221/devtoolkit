import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { DarkThemeToggle } from "flowbite-react";
import { FaGithub, FaMoon, FaSun } from "react-icons/fa";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { ThemeContext } from "@/providers/ThemeProvider";

const MyNavbar = ({ isOpen, setIsOpen, title = "DevToolkit" }) => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="fixed top-0 left-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-dark dark:border-dark-secondary">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center">
          <div className="flex items-center justify-start sm:w-60 w-auto">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-dark-text dark:hover:bg-dark-secondary dark:focus:bg-dark-secondary"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <HiBars3BottomLeft className="w-6 h-6" />
            </button>
            <Link href="/" className="items-center hidden sm:flex">
              <Image
                src="/logo.webp"
                className="h-8 me-3 rounded-full"
                width={32}
                height={32}
                alt="klpod221"
              />
              <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap dark:text-dark-text">
                DevToolkit
              </span>
            </Link>
          </div>

          <h2 className="sm:block dark:text-dark-text sm:ml-5 text-2xl ml-1">
            {title}
          </h2>

          <div className="flex items-center justify-end flex-1">
            <Link
              href="https://github.com/klpod221/devtoolkit"
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md sm:block dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-secondary"
            >
              <FaGithub className="w-5 h-5" />
            </Link>

            <DarkThemeToggle
              onClick={handleThemeChange}
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md sm:block dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-secondary"
              iconDark={FaSun}
              iconLight={FaMoon}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
