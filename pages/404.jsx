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
        <button className="mt-5">
          <a className="relative inline-block text-sm font-medium group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-1 translate-y-1 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0 rounded-lg"></span>

            <span className="relative block px-8 py-3 bg-gray-200 border border-current dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg">
              <router-link to="/">Go Home</router-link>
            </span>
          </a>
        </button>
      </div>
    </>
  );
}

Custom404.title = "404 - Page Not Found";
export default Custom404;
