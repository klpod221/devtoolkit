import { Button } from "flowbite-react";
import Link from "next/link";
import { AiFillHome, AiFillPhone } from "react-icons/ai";


const Custom404 = () => {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-9xl font-extrabold tracking-widest dark:text-white">
          404
        </h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>

        <p className="text-gray-600 dark:text-gray-400 mt-4 text-center">
          The page you are looking for does not exist or still under development
        </p>

        <div className="flex justify-center items-center space-x-2 mt-4">
          <Button>
            <Link href="/" className="flex items-center space-x-2">
              <AiFillHome />
              <span>Go back home</span>
            </Link>
          </Button>

          <Button>
            <Link
              href="https://github.com/klpod221/devtoolkit/issues"
              className="flex items-center space-x-2"
            >
              <AiFillPhone />
              <span>Contact Support</span>
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

Custom404.title = "404 - Page Not Found";
export default Custom404;
