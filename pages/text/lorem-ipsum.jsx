import React from "react";
import NextLink from "next/link";

import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";

import { AiFillHome, AiFillGithub } from "react-icons/ai";

const LoremIpsum = () => {
  return (
    <MyCard className="w-full max-w-5xl">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">
        This tool is under development 🚧
      </h5>

      <p className="text-xl text-gray-700 dark:text-gray-400">
        We are currently working on this tool. Please check back later or create
        a request on our Github repository if you want to see this tool sooner.
      </p>

      <div className="flex items-center space-x-2 mt-4">
        <MyButton>
          <NextLink href="/" className="flex items-center space-x-2">
            <AiFillHome className="w-5 h-5" />
            <span>Go back home</span>
          </NextLink>
        </MyButton>

        <MyButton color="warning">
          <NextLink
            href="https://github.com/klpod221/devtoolkit/issues"
            target="_blank"
            className="flex items-center space-x-2"
          >
            <AiFillGithub className="w-5 h-5" />
            <span>Create a request</span>
          </NextLink>
        </MyButton>
      </div>
    </MyCard>
  );
};

LoremIpsum.title = "Lorem Ipsum";
export default LoremIpsum;
