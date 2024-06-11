import Link from "next/link";
import Image from "next/image";
import { Button } from "flowbite-react";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
        <Head>
            <title>404 | Page Not Found</title>
        </Head>

      <div class="w-full flex flex-col justify-center items-center">
        <h1 class="text-9xl font-extrabold tracking-widest dark:text-white">
          404
        </h1>
        <div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button class="mt-5">
          <a class="relative inline-block text-sm font-medium group active:text-orange-500 focus:outline-none focus:ring">
            <span class="absolute inset-0 transition-transform translate-x-1 translate-y-1 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0 rounded-lg"></span>

            <span class="relative block px-8 py-3 bg-gray-200 border border-current dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg">
              <router-link to="/">Go Home</router-link>
            </span>
          </a>
        </button>
      </div>
    </>
  );
}
