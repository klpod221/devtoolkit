import React from "react";
import { Card, Button } from "flowbite-react";
import Link from "next/link";

import { FaGithub } from "react-icons/fa";

const Home = () => {
  return (
    <div>
      <Card className="">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Hello Developer! 👋
        </h5>
        <p className="text-xl text-gray-700 dark:text-gray-400">
          Welcome to DevToolkit, a collection of tools for developers. It
          contain tools for Image Compression, JSON to JS Object, Base64
          Encoder/Decoder, JWT, Bcrypt, and more.
        </p>

        {/* Github */}
        <p className="text-xl text-gray-700 dark:text-gray-400">
          If you like this project, please give it a star on{" "}
          <Link
            href="https://github.com/klpod221/devtoolkit"
            className="text-blue-500"
          >
            Github
          </Link>{" "}
          . And if you have any suggestions or feedback, feel free to open an
          issue on the repository. Thanks for your support! 🙏
        </p>

        {/* Credit */}
        <p className="text-gray-700 dark:text-gray-400">
          Made with ❤️ by{" "}
          <Link
            href="https://klpod221.github.io"
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            klpod221
          </Link>
        </p>

        {/* toggle dark mode by change data-theme attribute */}
        <Button
          className="btn btn-primary"
          onClick={() => {
            const html = document.querySelector("html");
            if (html.getAttribute("data-theme") === "dark") {
              html.setAttribute("data-theme", "light");
            } else {
              html.setAttribute("data-theme", "dark");
            }
          }}
        >
          Toggle Dark Mode
        </Button>
      </Card>
    </div>
  );
};

export default Home;
