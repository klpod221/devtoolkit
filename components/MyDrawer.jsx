import React from "react";
import { Drawer } from "flowbite-react";

const MyDrawer = ({ title, titleIcon, children, isOpen, onClose, position = "right" }) => {
  const theme = {
    root: {
      base: "fixed z-30 overflow-y-auto bg-white p-4 transition-transform dark:bg-dark",
      backdrop: "fixed inset-0 z-20  bg-black bg-opacity-50 dark:bg-gray",
      edge: "bottom-16",
      position: {
        top: {
          on: "left-0 right-0 top-0 w-full transform-none",
          off: "left-0 right-0 top-0 w-full -translate-y-full",
        },
        right: {
          on: "right-0 top-[61px] h-without-nav w-96 transform-none",
          off: "right-0 top-[61px] h-without-nav w-96 translate-x-full",
        },
        bottom: {
          on: "bottom-0 left-0 right-0 w-full transform-none",
          off: "bottom-0 left-0 right-0 w-full translate-y-full",
        },
        left: {
          on: "left-0 top-[61px] h-without-nav w-96 transform-none",
          off: "left-0 top-[61px] h-without-nav w-96 -translate-x-full",
        },
      },
    },
    header: {
      inner: {
        closeButton:
          "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-dark-text",
        closeIcon: "h-4 w-4",
        titleIcon: "me-2.5 h-5 w-5",
        titleText:
          "mb-4 inline-flex items-center text-base font-semibold dark:text-dark-text",
      },
      collapsed: {
        on: "hidden",
        off: "block",
      },
    },
    items: {
      base: "",
    },
  };

  return (
    <Drawer theme={theme} open={isOpen} onClose={onClose} position={position}>
      {title && <Drawer.Header title={title} titleIcon={titleIcon} />}

      <Drawer.Items>{children}</Drawer.Items>
    </Drawer>
  );
};

export default MyDrawer;
