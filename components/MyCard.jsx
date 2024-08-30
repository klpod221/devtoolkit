import { Card } from "flowbite-react";

const Header = ({ children, title, helper }) => {
  return (
    <div className="flex justify-between items-center gap-3">
      {title || helper ? (
        <div className="text-xl font-semibold text-gray-800 dark:text-dark-text">
          {title}
          <p className="text-xs text-gray-400 dark:text-gray-400">
            {helper}
          </p>
        </div>
      ) : null}

      {children}
    </div>
  );
}

const MyCard = ({ children, ...props }) => {
  const theme = {
    root: {
      base: "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-dark-secondary dark:bg-dark",
      children: "flex h-full flex-col gap-3 p-6",
      horizontal: {
        off: "flex-col",
        on: "flex-col md:max-w-xl md:flex-row",
      },
      href: "hover:bg-gray-100 dark:hover:bg-gray-700",
    },
    img: {
      base: "",
      horizontal: {
        off: "rounded-t-lg",
        on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg",
      },
    },
  };

  return (
    <Card theme={theme} {...props}>
      {children}
    </Card>
  );
};

MyCard.Header = Header;
export default MyCard;
