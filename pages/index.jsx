import React, { useState, useMemo } from "react";
import NextLink from "next/link";
import { FavoriteToolContext } from "@/providers/FavoriteToolProvider";
import TOOL_LIST from "@constants/tool_list";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import { FaHeart, FaRegHeart, FaGithub } from "react-icons/fa";
import { SiGithubsponsors, SiBuymeacoffee } from "react-icons/si";
import { AiOutlineSearch, AiOutlineClear } from "react-icons/ai";

const Home = () => {
  const { favoriteTools, toggleFavorite } = React.useContext(FavoriteToolContext);
  const [search, setSearch] = useState("");

  // Total tool count across all categories
  const totalTools = useMemo(() => {
    return TOOL_LIST.reduce((acc, section) => acc + section.tools.length, 0);
  }, []);

  // Filter toolkit by search keyword
  const filteredSections = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return TOOL_LIST;

    return TOOL_LIST.map((section) => {
      const matchingTools = section.tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q),
      );
      return {
        ...section,
        tools: matchingTools,
      };
    }).filter((section) => section.tools.length > 0);
  }, [search]);

  const isFavorite = (fullPath) => {
    return favoriteTools.some((item) => item.path === fullPath);
  };

  return (
    <div className="space-y-4">
      {/* Welcome & Sponsor Header */}
      <MyCard className="[&>div]:!p-4 sm:[&>div]:!p-5 [&>div]:!space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
              Developer Toolkit 👋
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium">
                {totalTools} tools
              </span>
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-4xl">
              An open-source collection of developer utilities for code, security, conversion, networking, measurement, and AI.
            </p>
          </div>

          {/* Sponsors & Repo Links */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://github.com/sponsors/klpod221"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#ea4aaa] hover:bg-[#d83597] rounded-lg transition-colors shadow-sm"
              title="Sponsor klpod221 on GitHub"
            >
              <SiGithubsponsors className="w-3.5 h-3.5" />
              <span>Sponsor</span>
            </a>

            <a
              href="https://www.buymeacoffee.com/klpod221"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-900 bg-[#ffdd00] hover:bg-[#f0d000] rounded-lg transition-colors shadow-sm"
              title="Buy Me a Coffee"
            >
              <SiBuymeacoffee className="w-3.5 h-3.5" />
              <span>Buy Coffee</span>
            </a>

            <NextLink
              href="https://github.com/klpod221/devtoolkit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-100 hover:bg-gray-200 dark:bg-dark-secondary dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaGithub className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </NextLink>
          </div>
        </div>

        {/* Search Bar for Fast Lookup */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="relative">
            <MyInput
              placeholder={`Quick search across all ${totalTools} tools (e.g. JSON, Regex, Ping, Base64, Speed)...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full !py-2.5 !pl-10 !pr-10 text-sm"
            />
            <AiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
                title="Clear search"
              >
                <AiOutlineClear className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </MyCard>

      {/* Favorite Tools (Only shown when not searching and user has favorites) */}
      {!search && favoriteTools && favoriteTools.length > 0 && (
        <MyCard className="[&>div]:!p-4 [&>div]:!space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FaHeart className="w-3.5 h-3.5 text-red-500" />
              <span>Favorite Tools</span>
              <span className="text-[11px] px-2 py-0.2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold">
                {favoriteTools.length}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
            {favoriteTools.map((tool) => (
              <NextLink
                key={tool.path}
                href={tool.path}
                className="group block"
              >
                <div className="relative flex items-center p-2 rounded-lg border border-red-200/60 dark:border-red-900/30 bg-red-50/20 dark:bg-red-950/10 hover:border-red-400 dark:hover:border-red-500 hover:shadow-sm transition-all duration-150 h-full">
                  <div className="flex-shrink-0 p-1.5 mr-2 rounded-md bg-red-100/70 dark:bg-red-900/30 text-red-600 dark:text-red-400 group-hover:scale-105 transition-transform">
                    <tool.icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-red-600 dark:group-hover:text-red-400">
                      {tool.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {tool.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-red-500 hover:scale-110 transition-transform"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(tool.path);
                    }}
                    title="Remove from favorites"
                  >
                    <FaHeart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </NextLink>
            ))}
          </div>
        </MyCard>
      )}

      {/* Categorized Tools List (Compact High-Density Grid) */}
      <div className="space-y-3">
        {filteredSections.map((section) => (
          <MyCard key={section.path} className="[&>div]:!p-4 [&>div]:!space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>{section.title}</span>
                <span className="text-[11px] px-2 py-0.2 rounded-full bg-gray-100 dark:bg-dark-secondary text-gray-600 dark:text-gray-300 font-semibold">
                  {section.tools.length}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
              {section.tools.map((tool) => {
                const fullPath = section.path + tool.path;
                const isFav = isFavorite(fullPath);

                return (
                  <NextLink
                    key={tool.path}
                    href={fullPath}
                    className="group block"
                  >
                    <div className="relative flex items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-dark-secondary/30 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all duration-150 h-full">
                      <div className="flex-shrink-0 p-1.5 mr-2 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                        <tool.icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0 pr-6">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {tool.name}
                        </h3>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                          {tool.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(fullPath);
                        }}
                        title={isFav ? "Remove from favorites" : "Add to favorites"}
                      >
                        {isFav ? (
                          <FaHeart className="w-3.5 h-3.5 text-red-500" />
                        ) : (
                          <FaRegHeart className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </NextLink>
                );
              })}
            </div>
          </MyCard>
        ))}

        {filteredSections.length === 0 && (
          <MyCard className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No tools matching &ldquo;{search}&rdquo;. Try another keyword.
            </p>
          </MyCard>
        )}
      </div>
    </div>
  );
};

Home.title = "Welcome";
export default Home;
