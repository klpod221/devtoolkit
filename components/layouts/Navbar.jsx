import React from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import { DarkThemeToggle } from "flowbite-react";
import { FaGithub, FaMoon, FaSun } from "react-icons/fa";
import { SiGithubsponsors, SiBuymeacoffee } from "react-icons/si";
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
    <nav className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-dark dark:border-dark-secondary">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center">
          <div className="flex items-center justify-start sm:w-60 w-auto">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:hover:bg-dark-secondary dark:focus:bg-dark-secondary"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <HiBars3BottomLeft className="w-6 h-6" />
            </button>
            <NextLink href="/" className="items-center hidden sm:flex">
              <NextImage
                src="/logo.webp"
                className="h-8 me-3 rounded-full"
                width={32}
                height={32}
                alt="klpod221"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
              <span className="self-center text-lg font-semibold sm:text-xl whitespace-nowrap ">
                DevToolkit
              </span>
            </NextLink>
          </div>

          <h2 className="sm:block sm:ml-5 md:text-2xl text-xl ml-1">
            {title}
          </h2>

          <div className="flex items-center justify-end flex-1 space-x-1 sm:space-x-2">
            <a
              href="https://github.com/sponsors/klpod221"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-pink-600 bg-pink-50 hover:bg-pink-100 rounded-full border border-pink-200 dark:bg-pink-950/40 dark:text-pink-400 dark:border-pink-900 transition-colors"
              title="Sponsor on GitHub"
            >
              <SiGithubsponsors className="w-3.5 h-3.5 text-pink-500" />
              <span>Sponsor</span>
            </a>

            <a
              href="https://www.buymeacoffee.com/klpod221"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-dark-secondary text-amber-500 hover:text-amber-600 transition-colors"
              title="Buy Me a Coffee"
            >
              <SiBuymeacoffee className="w-5 h-5" />
            </a>

            <NextLink
              href="https://github.com/klpod221/devtoolkit"
              className="px-3 py-2 text-sm font-medium text-gray-900 rounded-md sm:block hover:bg-gray-100 dark:hover:bg-dark-secondary dark:text-dark-text"
              target="_blank"
              title="GitHub Repository"
            >
              <FaGithub className="w-5 h-5" />
            </NextLink>

            <DarkThemeToggle
              onClick={handleThemeChange}
              className="px-3 py-2 text-sm font-medium text-gray-900 rounded-md sm:block  hover:bg-gray-100 dark:hover:bg-dark-secondary dark:text-dark-text"
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
