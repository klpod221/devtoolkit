import React from "react";
import NextLink from "next/link";

import { FavoriteToolContext } from "@/providers/FavoriteToolProvider";

import TOOL_LIST from "@constants/tool_list";

import MyCard from "@components/MyCard";

import { FaHeart, FaRegHeart } from "react-icons/fa";

const Home = () => {
  const { favoriteTools, toggleFavorite } =
    React.useContext(FavoriteToolContext);

  return (
    <MyCard className="!max-h-[90vh]">
      <h5 className="text-2xl font-bold tracking-tight">Hello Developer! 👋</h5>
      <p className="text-xl text-gray-700 dark:text-gray-400">
        Welcome to DevTools, a collection of tools for developers. It contain
        tools for code, security, web development, and more. You can use these tools to
        improve your productivity and make your life easier. DevTools is a
        free and open-source project, and it is constantly being updated with
        new features and tools.
      </p>

      <p className="text-xl text-gray-700 dark:text-gray-400">
        If you like this project, please give it a star on{" "}
        <NextLink
          href="https://github.com/klpod221/devtoolkit"
          className="text-blue-500"
        >
          Github
        </NextLink>
        . And if you have any suggestions or feedback, feel free to open an
        issue on the repository. Thanks for your support! 🙏
      </p>

      {/* Credit */}
      <p className="text-gray-700 dark:text-gray-400">
        Made with ❤️ by{" "}
        <NextLink
          href="https://klpod221.github.io"
          className="text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          klpod221
        </NextLink>
      </p>

      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      {favoriteTools && favoriteTools.length > 0 && (
        <>
          <h3 className="text-xl tracking-tight">Favorite Tools</h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteTools.map((tool, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 w-full h-full"
              >
                <div className="flex items-center justify-between">
                  <tool.icon className="w-10 h-10 text-blue-500" />

                  <div
                    className="ml-auto text-gray-400 dark:text-dark-text-secondary cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(tool.path);
                    }}
                  >
                    <FaHeart className="text-red-500 dark:text-red-400" />
                  </div>
                </div>

                <div className="mt-2">
                  <h5 className="text-lg font-semibold">{tool.name}</h5>
                  <p className="text-gray-700 dark:text-gray-400 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {TOOL_LIST.map((section) => (
        <div key={section.path}>
          <h3 className="text-xl tracking-tight">{section.title}</h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {section.tools.map((tool) => (
              <NextLink
                key={tool.path}
                href={`${section.path + tool.path}`}
                passHref
              >
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 w-full h-full">
                  <div className="flex items-center justify-between">
                    <tool.icon className="w-10 h-10 text-blue-500" />

                    <div
                      className="ml-auto text-red-500 dark:text-red-400"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(section.path + tool.path);
                      }}
                    >
                      {favoriteTools.some(
                        (item) => item.path === section.path + tool.path,
                      ) ? (
                        <FaHeart />
                      ) : (
                        <FaRegHeart />
                      )}
                    </div>
                  </div>

                  <div className="mt-2">
                    <h5 className="text-lg font-semibold">{tool.name}</h5>
                    <p className="text-gray-700 dark:text-gray-400 line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </NextLink>
            ))}
          </div>
        </div>
      ))}
    </MyCard>
  );
};

Home.title = "Welcome";
export default Home;
